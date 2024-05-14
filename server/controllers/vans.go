package controllers

import (
	"context"
	"log"
	"net/http"
	"time"
	"vanlife/handlers"
	models "vanlife/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type VanHandler struct {
	Collection        *mongo.Collection
	BookingCollection *mongo.Collection // Add BookingCollection field
	errorHandler      *handlers.ErrorHandler
}

func NewVanCollection(collection, bookingCollection *mongo.Collection, errorHandler *handlers.ErrorHandler) *VanHandler {
	return &VanHandler{
		Collection:        collection,
		BookingCollection: bookingCollection,
		errorHandler:      errorHandler,
	}
}

func (h *VanHandler) CreateVan(c *gin.Context) {
	var van models.Van

	role, ok := c.MustGet("role").(string)

	if !ok {
		h.errorHandler.HandleInternalServerError(c)
		log.Printf("error in role")
		return
	}

	if role != "owner" {
		h.errorHandler.HandleUnauthorized(c)
		return
	}

	// Retrieve user ID from context
	userID, ok := c.MustGet("id").(string)
	if !ok {
		// Handle error if user ID is not a string
		h.errorHandler.HandleInternalServerError(c)
		return
	}

	if err := c.BindJSON(&van); err != nil {
		h.errorHandler.HandleBadRequest(c) // Use errorHandler to handle bad request
		return
	}

	van.ID = primitive.NewObjectID()

	ownerID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		// Handle error if user ID is not a valid ObjectID
		h.errorHandler.HandleInternalServerError(c)
		return
	}
	van.OwnerId = ownerID

	_, err = h.Collection.InsertOne(context.TODO(), van)
	if err != nil {
		h.errorHandler.HandleInternalServerError(c) // Use ErrorHandler to handle internal server error
		return
	}
	c.JSON(201, van)
}

func (h *VanHandler) GetVans(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Get IDs of vans with status "confirmed" in the booking collection
	confirmedVanIDs := []primitive.ObjectID{}
	cursor, err := h.BookingCollection.Find(ctx, bson.M{"status": "confirmed"})
	if err != nil {
		h.errorHandler.HandleInternalServerError(c)
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var booking models.Booking
		if err := cursor.Decode(&booking); err != nil {
			h.errorHandler.HandleInternalServerError(c)
			return
		}
		confirmedVanIDs = append(confirmedVanIDs, booking.VanID)
	}

	// Query vans collection for vans with IDs found in confirmedVanIDs
	cursor, err = h.Collection.Find(ctx, bson.M{"_id": bson.M{"$nin": confirmedVanIDs}})
	if err != nil {
		h.errorHandler.HandleInternalServerError(c)
		return
	}
	defer cursor.Close(ctx)

	var vans []models.Van
	if err := cursor.All(ctx, &vans); err != nil {
		h.errorHandler.HandleInternalServerError(c)
		return
	}

	c.JSON(http.StatusOK, vans)
}

// get van by id
func (h *VanHandler) GetVanByID(c *gin.Context) {
	id := c.Param("id")
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		h.errorHandler.HandleInternalServerError(c)
		return
	}
	filter := bson.M{"_id": objectId}

	var van models.Van
	cxt, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = h.Collection.FindOne(cxt, filter).Decode(&van)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			h.errorHandler.HandleNotFound(c) // Use ErrorHandler to handle not found error
			return
		}
		h.errorHandler.HandleInternalServerError(c) // Use ErrorHandler to handle internal server error
		return
	}
	c.JSON(200, van)
}

// UpdateVan updates a van by ID
func (h *VanHandler) UpdateVan(c *gin.Context) {
	// Extract van ID from URL parameters
	id := c.Params.ByName("id")

	// Retrieve user role and ID from context
	role, ok := c.MustGet("role").(string)
	if !ok {
		h.errorHandler.HandleInternalServerError(c)
		return
	}
	if role != "owner" {
		h.errorHandler.HandleUnauthorized(c)
		return
	}

	userID, ok := c.MustGet("id").(string)
	if !ok {
		h.errorHandler.HandleInternalServerError(c)
		return
	}

	// Convert van ID to primitive.ObjectID
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		h.errorHandler.HandleBadRequest(c)
		return
	}

	// Retrieve the van from the database
	var van models.Van
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = h.Collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&van)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			h.errorHandler.HandleNotFound(c)
			return
		}
		h.errorHandler.HandleInternalServerError(c)
		return
	}

	// Check if the authenticated user is the owner of the van
	if van.OwnerId.Hex() != userID {
		h.errorHandler.HandleUnauthorized(c)
		return
	}

	// Bind the JSON data to update the van
	var updateVan models.Van
	if err := c.BindJSON(&updateVan); err != nil {
		h.errorHandler.HandleBadRequest(c)
		return
	}

	// Filter out empty fields from updateVan
	updateFields := bson.M{}
	if updateVan.Name != "" {
		updateFields["name"] = updateVan.Name
	}
	if updateVan.Price != 0 {
		updateFields["price"] = updateVan.Price
	}
	if updateVan.Description != "" {
		updateFields["description"] = updateVan.Description
	}
	if updateVan.ImgageUrl != "" {
		updateFields["imgageurl"] = updateVan.ImgageUrl
	}
	if updateVan.Type != "" {
		updateFields["type"] = updateVan.Type
	}
	if updateVan.HostId != "" {
		updateFields["hostId"] = updateVan.HostId
	}

	// Update the van in the database
	update := bson.M{"$set": updateFields}
	_, err = h.Collection.UpdateOne(ctx, bson.M{"_id": objectID}, update)
	if err != nil {
		h.errorHandler.HandleInternalServerError(c)
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Van updated"})
}

//delete contact deletes a contact by id

func (h *VanHandler) DeleteVan(c *gin.Context) {
	id := c.Param("id")
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		h.errorHandler.HandleInternalServerError(c)
		return
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	filter := bson.M{"_id": objectId}
	_, err = h.Collection.DeleteOne(ctx, filter)
	if err != nil {
		h.errorHandler.HandleInternalServerError(c) // Use ErrorHandler to handle internal server error
		return
	}
	c.JSON(200, gin.H{"message": "contact deleted"})
}

func (h *VanHandler) SearchVans(c *gin.Context) {
	query := c.Query("q")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	regex := primitive.Regex{Pattern: ".*" + query + ".*", Options: "i"} // 'i' option makes the search case-insensitive
	cursor, err := h.Collection.Find(ctx, bson.M{
		"$or": []bson.M{
			{"firstname": bson.M{"$regex": regex}},
			{"lastname": bson.M{"$regex": regex}},
		},
	})
	if err != nil {
		h.errorHandler.HandleInternalServerError(c)
		return
	}
	defer cursor.Close(ctx)

	var vans []models.Van
	if err := cursor.All(ctx, &vans); err != nil {
		h.errorHandler.HandleInternalServerError(c)
		return
	}

	c.JSON(http.StatusOK, vans)
}

func (h *VanHandler) GetVansByHost(c *gin.Context) {
	// Retrieve user role and ID from context
	role, ok := c.MustGet("role").(string)
	if !ok {
		h.errorHandler.HandleInternalServerError(c)
		log.Print("error in role")
		return
	}
	if role != "owner" {
		h.errorHandler.HandleUnauthorized(c)
		log.Print("error in owner")
		return
	}

	userID, ok := c.MustGet("id").(string)
	if !ok {
		h.errorHandler.HandleInternalServerError(c)
		log.Print("error in id")
		return
	}

	// Convert van ID to primitive.ObjectID
	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		h.errorHandler.HandleBadRequest(c)
		log.Print("error in id conversion")
		return
	}

	// Retrieve the van from the database
	var vans []models.Van
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := h.Collection.Find(ctx, bson.M{"ownerId": objectID})

	if err != nil {
		h.errorHandler.HandleInternalServerError(c) // Use ErrorHandler to handle internal server error
		log.Print("error in find")
		return
	}
	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &vans); err != nil {
		h.errorHandler.HandleInternalServerError(c) // Use ErrorHandler to handle internal server error
		return
	}
	c.JSON(200, vans)
}
