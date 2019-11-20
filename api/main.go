package main

import (
	"api/config"
	"api/controller"
	"api/include"
	"api/model"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

var db *gorm.DB
var err error

func main() {
	config := config.InitConfig()

	db = include.InitDB()
	defer db.Close()
	db.AutoMigrate(&model.Tag{}, &model.Company{})

	router := gin.Default()
	router.Use(include.CORS())

	// Non-protected routes
	companies := router.Group("/companies")
	{
		companies.GET("/", controller.GetCompanies)
		companies.GET("/:id", controller.GetCompany)
		companies.POST("/", controller.CreateCompany)
		companies.PUT("/:id", controller.UpdateCompany)
		companies.DELETE("/:id", controller.DeleteCompany)
	}

	// Protected routes
	// For authorized access, group protected routes using gin.BasicAuth() middleware
	// gin.Accounts is a shortcut for map[string]string
	authorized := router.Group("/admin", gin.BasicAuth(gin.Accounts{
		"username1": "password1",
		"username2": "password2",
		"username3": "password3",
	}))

	// /admin/dashboard endpoint is now protected
	authorized.GET("/dashboard", controller.Dashboard)

	router.Run(":" + config.Server.Port)
}
