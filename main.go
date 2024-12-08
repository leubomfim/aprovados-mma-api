package main

import (
	"github.com/gin-gonic/gin"
	"os"
	"net/http"
)

func main() {
	r := gin.Default()
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "hello world2",
		})
	})
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	r.Run(":" + port)

	http.ListenAndServe(":" + port, r)
}
