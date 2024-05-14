package routes

import (
	"vanlife/controllers"
	"vanlife/database"
	"vanlife/handlers"
	"vanlife/middleware"

	"github.com/gin-gonic/gin"
)

func VansRoutes(router *gin.Engine) {

	errorHandler := handlers.NewErrorHandler()

	vanHandler := controllers.NewVanCollection(database.GetCollection("vans"), database.GetCollection("booking"), errorHandler)

	vanGroup := router.Group("/api/v1/vans")

	vanGroup.Use(middleware.Authentication())
	// Routes
	{
		// Get all vans
		vanGroup.GET("/vans", vanHandler.GetVans)

		// Get van by ID
		vanGroup.GET("/vans/:id", vanHandler.GetVanByID)

		// Create a new van
		vanGroup.POST("/vans", vanHandler.CreateVan)

		// Update a van
		vanGroup.PATCH("/vans/:id", vanHandler.UpdateVan)

		// Delete a van
		vanGroup.DELETE("/vans/:id", vanHandler.DeleteVan)

		// // Get vans by host ID
		vanGroup.GET("/host/vans", vanHandler.GetVansByHost)

		// // Get van by host ID and van ID
		// vanGroup.GET("/host/vans/:id", vanHandler.getVanByHostIDAndID)

		// // Get vans list by host ID
		// vanGroup.GET("/vans/vans-list/:id", vanHandler.getVansListByID)
	}
}
