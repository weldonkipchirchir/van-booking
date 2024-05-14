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

type BookHandler struct {
	Collection      *mongo.Collection
	UsersCollection *mongo.Collection
	errorHandler    *handlers.ErrorHandler
}

func NewBookCollection(collection *mongo.Collection, usersCollection *mongo.Collection, errorHandler *handlers.ErrorHandler) *BookHandler {
	return &BookHandler{
		Collection:      collection,
		UsersCollection: usersCollection,
		errorHandler:    errorHandler,
	}
}
func (h *BookHandler) CreateBooking(c *gin.Context) {
	var booking models.Booking

	// Retrieve user ID from context
	userID, ok := c.MustGet("id").(string)
	if !ok {
		// Handle error if user ID is not a string
		h.errorHandler.HandleInternalServerError(c)
		return
	}

	if err := c.BindJSON(&booking); err != nil {
		h.errorHandler.HandleBadRequest(c) // Use errorHandler to handle bad request
		return
	}

	// Check if a booking with the provided VanID already exists
	existingBooking := h.Collection.FindOne(context.TODO(), bson.M{"vanId": booking.VanID})
	if existingBooking.Err() != mongo.ErrNoDocuments {
		// Booking with the provided VanID already exists
		log.Print("widhiu")
		c.JSON(http.StatusConflict, gin.H{"error": "Booking already exists"})
		return
	}

	booking.ID = primitive.NewObjectID()

	customerID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		// Handle error if user ID is not a valid ObjectID
		h.errorHandler.HandleInternalServerError(c)
		return
	}
	booking.CustomerID = customerID
	booking.Status = "confirmed"

	_, err = h.Collection.InsertOne(context.TODO(), booking)
	if err != nil {
		h.errorHandler.HandleInternalServerError(c) // Use ErrorHandler to handle internal server error
		return
	}
	c.JSON(http.StatusCreated, booking)
}

// gets all booking for owners
func (h *BookHandler) GetBookingsByHost(c *gin.Context) {
	// Retrieve user ID (owner ID) from token claims
	userID, ok := c.MustGet("id").(string)
	log.Print(userID)
	if !ok {
		h.errorHandler.HandleInternalServerError(c)
		log.Print("error in id")
		return
	}

	// Convert van ID to primitive.ObjectID
	ownerID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		h.errorHandler.HandleBadRequest(c)
		log.Print("error in id conversion")
		return
	}

	// Retrieve user role and ID from context
	role, ok := c.MustGet("role").(string)
	if !ok {
		h.errorHandler.HandleInternalServerError(c)
		log.Print("error in role")
		return
	}
	if role != "owner" {
		h.errorHandler.HandleUnauthorized(c)
		log.Print("error in id cnve")
		return
	}

	// Retrieve bookings by owner ID
	var bookings []models.Booking
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := h.Collection.Find(ctx, bson.M{"ownerId": ownerID})
	if err != nil {
		h.errorHandler.HandleInternalServerError(c)
		return
	}
	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &bookings); err != nil {
		h.errorHandler.HandleInternalServerError(c)
		return
	}

	c.JSON(http.StatusOK, bookings)
}

func (h *BookHandler) GetBookingsByUsers(c *gin.Context) {

	userID, ok := c.MustGet("id").(string)
	log.Print(userID)
	if !ok {
		h.errorHandler.HandleInternalServerError(c)
		log.Print("error in id")
		return
	}

	// Convert booking ID to primitive.ObjectID
	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		h.errorHandler.HandleBadRequest(c)
		log.Print("error in id conversion")
		return
	}

	// Retrieve the booking from the database
	var booking []models.Booking
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := h.Collection.Find(ctx, bson.M{"customerId": objectID})

	if err != nil {
		h.errorHandler.HandleInternalServerError(c) // Use ErrorHandler to handle internal server error
		log.Print("error in find")
		return
	}
	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &booking); err != nil {
		h.errorHandler.HandleInternalServerError(c) // Use ErrorHandler to handle internal server error
		return
	}
	c.JSON(200, booking)
}

func (h *BookHandler) UpdateVanBooking(c *gin.Context) {
	// Extract booking ID from URL parameters
	id := c.Params.ByName("id")

	// Convert booking ID to primitive.ObjectID
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		h.errorHandler.HandleBadRequest(c)
		return
	}

	// Retrieve the booking from the database
	var booking models.Booking
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = h.Collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&booking)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			h.errorHandler.HandleNotFound(c)
			return
		}
		h.errorHandler.HandleInternalServerError(c)
		return
	}

	// Bind the JSON data to update the booking
	var updateBooking models.Booking
	if err := c.BindJSON(&updateBooking); err != nil {
		h.errorHandler.HandleBadRequest(c)
		return
	}

	// Update the booking in the database
	update := bson.M{"$set": updateBooking}
	_, err = h.Collection.UpdateOne(ctx, bson.M{"_id": objectID}, update)
	if err != nil {
		h.errorHandler.HandleInternalServerError(c)
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "booking updated"})
}

func (h *BookHandler) GetOwnerTotalIncome(c *gin.Context) {
	// Retrieve user ID (owner ID) from token claims
	userID, ok := c.MustGet("id").(string)
	if !ok {
		h.errorHandler.HandleInternalServerError(c)
		return
	}

	// Convert owner ID to primitive.ObjectID
	ownerID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		h.errorHandler.HandleBadRequest(c)
		return
	}

	// Retrieve bookings by owner ID
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := h.Collection.Find(ctx, bson.M{"ownerId": ownerID})
	if err != nil {
		h.errorHandler.HandleInternalServerError(c)
		return
	}
	defer cursor.Close(ctx)

	totalIncome := 0.0
	for cursor.Next(ctx) {
		var booking models.Booking
		if err := cursor.Decode(&booking); err != nil {
			h.errorHandler.HandleInternalServerError(c)
			return
		}
		totalIncome += booking.TotalAmount
	}

	c.JSON(http.StatusOK, gin.H{"totalIncome": totalIncome})
}

// get income per month
func (h *BookHandler) GetOwnerIncomeByMonth(c *gin.Context) {
	userID, ok := c.MustGet("id").(string)
	if !ok {
		h.errorHandler.HandleInternalServerError(c)
		return
	}

	// Convert owner ID to primitive.ObjectID
	ownerID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		h.errorHandler.HandleBadRequest(c)
		return
	}

	// Aggregate total income for owner's bookings by month
	pipeline := mongo.Pipeline{
		{{Key: "$match", Value: bson.M{"ownerId": ownerID}}},
		{{Key: "$group", Value: bson.M{
			"_id":         bson.M{"$dateToString": bson.M{"format": "%Y-%m", "date": "$startDate"}},
			"totalIncome": bson.M{"$sum": "$totalAmount"},
		}}},
		{{Key: "$project", Value: bson.M{
			"month": bson.M{"$let": bson.M{
				"vars": bson.M{
					"monthString": bson.M{"$substr": []interface{}{"$_id", 5, 2}},
				},
				"in": bson.M{"$switch": bson.M{
					"branches": []interface{}{
						bson.M{"case": bson.M{"$eq": []interface{}{"$$monthString", "01"}}, "then": "January"},
						bson.M{"case": bson.M{"$eq": []interface{}{"$$monthString", "02"}}, "then": "February"},
						bson.M{"case": bson.M{"$eq": []interface{}{"$$monthString", "03"}}, "then": "March"},
						bson.M{"case": bson.M{"$eq": []interface{}{"$$monthString", "04"}}, "then": "April"},
						bson.M{"case": bson.M{"$eq": []interface{}{"$$monthString", "05"}}, "then": "May"},
						bson.M{"case": bson.M{"$eq": []interface{}{"$$monthString", "06"}}, "then": "June"},
						bson.M{"case": bson.M{"$eq": []interface{}{"$$monthString", "07"}}, "then": "July"},
						bson.M{"case": bson.M{"$eq": []interface{}{"$$monthString", "08"}}, "then": "August"},
						bson.M{"case": bson.M{"$eq": []interface{}{"$$monthString", "09"}}, "then": "September"},
						bson.M{"case": bson.M{"$eq": []interface{}{"$$monthString", "10"}}, "then": "October"},
						bson.M{"case": bson.M{"$eq": []interface{}{"$$monthString", "11"}}, "then": "November"},
						bson.M{"case": bson.M{"$eq": []interface{}{"$$monthString", "12"}}, "then": "December"},
					},
					"default": "Unknown",
				}},
			}},
			"totalIncome": "$totalIncome",
		}}},
	}

	var result []struct {
		Month       string  `bson:"month"`
		TotalIncome float64 `bson:"totalIncome"`
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := h.Collection.Aggregate(ctx, pipeline)
	if err != nil {
		h.errorHandler.HandleInternalServerError(c)
		return
	}
	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &result); err != nil {
		h.errorHandler.HandleInternalServerError(c)
		return
	}

	c.JSON(http.StatusOK, result)
}

// get all reviews
func (h *BookHandler) GetReviewsByOwner(c *gin.Context) {
	// Retrieve user ID (owner ID) from token claims
	userID, ok := c.MustGet("id").(string)
	if !ok {
		h.errorHandler.HandleInternalServerError(c)
		return
	}

	// Convert owner ID to primitive.ObjectID
	ownerID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		h.errorHandler.HandleBadRequest(c)
		return
	}

	// Retrieve bookings with non-empty reviews by owner
	var reviews []models.Booking
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Find bookings with non-empty reviews by matching ownerID and non-empty review field
	cursor, err := h.Collection.Find(ctx, bson.M{"ownerId": ownerID, "comment": bson.M{"$ne": ""}})
	if err != nil {
		h.errorHandler.HandleInternalServerError(c)
		return
	}
	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &reviews); err != nil {
		h.errorHandler.HandleInternalServerError(c)
		return
	}

	// Retrieve user names for customers who left non-empty reviews
	var reviewsWithUsers []gin.H
	totalRatings := 0
	reviewCount := 0
	for _, review := range reviews {
		// Find user document matching CustomerID
		var user models.User
		err := h.UsersCollection.FindOne(ctx, bson.M{"_id": review.CustomerID}).Decode(&user)
		if err != nil {
			h.errorHandler.HandleInternalServerError(c)
			return
		}

		// Only add non-empty reviews to the response
		if review.Comment != "" {
			// Append review details with user name to reviewsWithUsers slice
			reviewWithUser := gin.H{
				"customerName": user.Name,
				"review":       review.Comment,
				"rating":       review.Rating,
			}
			reviewsWithUsers = append(reviewsWithUsers, reviewWithUser)

			// Only count non-zero ratings
			if review.Rating > 0 {
				totalRatings += review.Rating
				reviewCount++
			}
		}
	}

	// Calculate average rating, consider cases where there are no reviews or zero ratings
	averageRating := 0.0
	if reviewCount > 0 {
		averageRating = float64(totalRatings) / float64(reviewCount)
	}

	// Append average rating to the response
	reviewsWithUsers = append(reviewsWithUsers, gin.H{"averageRating": averageRating})

	c.JSON(http.StatusOK, reviewsWithUsers)
}
