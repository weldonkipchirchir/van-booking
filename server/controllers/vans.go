package controllers

import (
	"context"
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
	Collection   *mongo.Collection
	errorHandler *handlers.ErrorHandler
}

func NewVanCollection(collection *mongo.Collection, errorHandler *handlers.ErrorHandler) *VanHandler {
	return &VanHandler{
		Collection:   collection,
		errorHandler: errorHandler,
	}
}

func (h *VanHandler) CreateVan(c *gin.Context) {
	var van models.Van

	if err := c.BindJSON(&van); err != nil {
		h.errorHandler.HandleBadRequest(c) // Use errorHandler to handle bad request
		return
	}

	van.ID = primitive.NewObjectID()

	_, err := h.Collection.InsertOne(context.TODO(), van)
	if err != nil {
		h.errorHandler.HandleInternalServerError(c) // Use ErrorHandler to handle internal server error
		return
	}
	c.JSON(201, van)
}

// gets all contacts

func (h *VanHandler) GetVans(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	cursor, err := h.Collection.Find(ctx, bson.M{})

	if err != nil {
		h.errorHandler.HandleInternalServerError(c) // Use ErrorHandler to handle internal server error
		return
	}
	defer cursor.Close(ctx)

	var vans []models.Van

	if err := cursor.All(ctx, &vans); err != nil {
		h.errorHandler.HandleInternalServerError(c) // Use ErrorHandler to handle internal server error
		return
	}
	c.JSON(200, vans)
}

// get contact by id
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

//upadate contact updates a contact by id

func (h *VanHandler) UpdateVan(c *gin.Context) {
	id := c.Params.ByName("id")
	var updateContact models.Van
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		h.errorHandler.HandleInternalServerError(c)
		return
	}
	if err := c.BindJSON(&updateContact); err != nil {
		h.errorHandler.HandleBadRequest(c) // Use ErrorHandler to handle bad request
		return
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	filter := bson.M{"_id": objectId}
	update := bson.M{"$set": updateContact}
	_, err = h.Collection.UpdateOne(ctx, filter, update)
	if err != nil {
		h.errorHandler.HandleInternalServerError(c) // Use ErrorHandler to handle internal server error
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "contact updated"})
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
