package controllers

import (
	"fmt"
	"net/http"
	"vanlife/auth"
	"vanlife/models"
	"vanlife/services"
	"vanlife/utils"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Register(c *gin.Context) {
	var user models.User

	user.ID = primitive.NewObjectID()

	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := services.RegisterUser(&user)
	if err == services.ErrEmailTaken {
		c.JSON(http.StatusConflict, gin.H{"error": "Username already taken"})
		return
	} else if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "User registered successfully"})
}

func Login(c *gin.Context) {
	var loginRequest struct {
		Email    string `json:"email" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&loginRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  http.StatusBadRequest,
			"error":   "Invalid json format",
			"message": err.Error(),
		})
		return
	}

	user, err := services.LoginUser(loginRequest.Email, loginRequest.Password)
	if err == services.ErrUserNotFound || err == services.ErrInvalidCredentials {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	} else if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}
	userIDString := user.ID.Hex()

	token, refreshToken, err := auth.TokenGenerator(userIDString, user.Name, user.Email, user.Role)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}

	verificationCode := utils.GenerateVerification()
	err = utils.SendEmail(verificationCode, user.Email, user.Name)

	if err != nil {
		fmt.Println("Error in gmail")
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}

	// Create a UserResponse without the password
	userResponse := models.UserResponse{
		ID:    user.ID,
		Name:  user.Name,
		Email: user.Email,
		Role:  user.Role,
	}

	res := gin.H{
		"access_token":      token,
		"refresh_token":     refreshToken,
		"user":              userResponse,
		"verification_code": verificationCode,
	}

	// Include the "Login successful" message in the response
	res["message"] = "Login successful"

	// Send the combined JSON response to the client
	c.JSON(http.StatusOK, res)
}

// Logout function
func Logout(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Logged out successfully"})
}
