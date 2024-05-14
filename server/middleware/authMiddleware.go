package middleware

import (
	"net/http"
	"time"
	"vanlife/auth"

	"github.com/gin-gonic/gin"
)

func Authentication() gin.HandlerFunc {
	return func(c *gin.Context) {
		accessToken := c.GetHeader("Authorization")
		if accessToken == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Access token not provided"})
			c.Abort()
			return
		}

		// Parse the bearer token
		if len(accessToken) > 7 && accessToken[:7] == "Bearer " {
			accessToken = accessToken[7:]
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid access token format"})
			c.Abort()
			return
		}

		claims, msg := auth.ValidateToken(accessToken)
		if msg != "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": msg})
			c.Abort()
			return
		}

		// If access token is expired, attempt to refresh it
		if claims.ExpiresAt < time.Now().Unix() {
			refreshToken := c.GetHeader("RefreshToken")
			if refreshToken == "" {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "Refresh token not provided"})
				c.Abort()
				return
			}

			newAccessToken, err := auth.UpdateToken(refreshToken)
			if err != nil {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid refresh token"})
				c.Abort()
				return
			}

			// Set the new access token as a cookie
			c.SetCookie("token", newAccessToken, int(time.Hour)*30, "/", "", false, true)
			c.SetCookie("refreshToken", refreshToken, int(time.Hour)*90, "/", "", false, true)

			c.Set("id", claims.Id)
			c.Set("role", claims.Role)
			c.Set("email", claims.Email)
			c.Next()

		} else {
			c.Set("id", claims.Id)
			c.Set("role", claims.Role)
			c.Set("email", claims.Email)
			c.Next()
		}
	}
}
