package routes

import (
	"vanlife/controllers"
	"vanlife/database"
	"vanlife/handlers"
	"vanlife/middleware"

	"github.com/gin-gonic/gin"
)

func BookingRoutes(router *gin.Engine) {

	errorHandler := handlers.NewErrorHandler()

	bookingHandler := controllers.NewBookCollection(database.GetCollection("booking"), database.GetCollection("users"), errorHandler)

	bookingGroup := router.Group("/api/v1/booking")

	bookingGroup.Use(middleware.Authentication())
	// Routes
	{
		// Get all vans
		bookingGroup.GET("/booking", bookingHandler.GetBookingsByUsers)

		// Get van by ID
		bookingGroup.GET("/booking/host", bookingHandler.GetBookingsByHost)

		// Create a new van
		bookingGroup.POST("/booking", bookingHandler.CreateBooking)

		// Update a van
		bookingGroup.PATCH("/booking/:id", bookingHandler.UpdateVanBooking)

		// Delete a van
		// bookingGroup.DELETE("/vans/:id", bookingHandler.DeleteVan)

		// // Get vans by host ID
		// bookingGroup.GET("/host/vans", bookingHandler.GetVansByHost)

		//get owner's income
		bookingGroup.GET("/income", bookingHandler.GetOwnerTotalIncome)

		//get owner's income statistics
		bookingGroup.GET("/statistics", bookingHandler.GetOwnerIncomeByMonth)

		//get owner's reviews
		bookingGroup.GET("/reviews", bookingHandler.GetReviewsByOwner)

	}
}
