package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
	"vanlife/database"
	"vanlife/middleware"
	"vanlife/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	err := database.DBConnection()
	if err != nil {
		log.Fatalf("Error connecting to the database: %v", err)
	}
	//route limitter
	limiter := middleware.NewRateLimiter(10, 20)
	router.Use(limiter.Middleware())

	//cros origin
	router.Use(cors.New(
		cors.Config{
			AllowOrigins:     []string{"http://localhost:5173"},
			AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"},
			AllowHeaders:     []string{"Origin", "Authorization", "Content-Type"},
			ExposeHeaders:    []string{"Content-Length"},
			AllowCredentials: true,
			MaxAge:           12 * time.Hour,
		}))

	//check if the server is running
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	routes.SetUpUsers(router)
	routes.VansRoutes(router)
	routes.BookingRoutes(router)

	//create a server
	serv := &http.Server{
		Addr:    ":8080",
		Handler: router,
	}

	//gracefully shutdown a server
	go func() {
		log.Println("Server is running on http://localhost:8080")
		if err := serv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen: %s\n", err)
		}
	}()

	//handle signals for graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM, syscall.SIGINT)
	<-quit
	log.Println("Server shutting down")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := serv.Shutdown(ctx); err != nil {
		log.Fatal("Server forced to shutdown:", err)
	}

	database.DbDisconnect()

	log.Println("Server exited")
}
