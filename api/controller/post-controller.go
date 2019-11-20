package controller

import (
	"api/include"
	"api/model"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"strconv"
	"strings"
)

var db *gorm.DB
var err error

// Post struct alias
type Company = model.Company

// Tag struct alias
type Tag = model.Tag

// Data is mainle generated for filtering and pagination
type Data struct {
	Total int64
	Data  []Company
}

func GetCompany(c *gin.Context) {
	db = include.GetDB()
	id := c.Params.ByName("id")
	var company Company

	if err := db.Where("id = ? ", id).First(&company).Error; err != nil {

		c.AbortWithStatus(404)
		fmt.Println(err)

	} else {

		db.Model(&company)
		// SELECT * FROM "tags"  WHERE ("post_id" = 1)

		/*company.Tags = tags*/
		c.JSON(200, company)
	}

}

func GetCompanies(c *gin.Context) {

	db = include.GetDB()
	var companies []Company
	var data Data
	var count int64

	//Get name from query
	name := c.DefaultQuery("name", "")

	//Get description from query
	description := c.DefaultQuery("description", "")

	// Order By filtering option add
	Sort := c.DefaultQuery("order", "id|asc")
	SortArray := strings.Split(Sort, "|")
	fmt.Println(SortArray)

	// Define and get offset for pagination
	offset := c.Query("offset")
	offsetInt, err := strconv.Atoi(offset)
	if err != nil {
		offsetInt = 0
	}

	// Define and get limit for pagination
	limit := c.Query("limit")
	limitInt, err := strconv.Atoi(limit)
	if err != nil {
		limitInt = 3
	}

	query := db.Limit(limitInt)
	query = query.Offset(offsetInt)
	query = query.Order(SortArray[0] + " " + SortArray[1])

	// In postgres you shoud use ILIKE to make search case insensitive
	if name != "" {
		query = query.Where("name LIKE ?", "%"+name+"%")
	}

	if description != "" {
		query = query.Where("description LIKE ?", "%"+description+"%")
	}

	if err := query.Find(&companies).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		// We are resetting offset to 0 to return total number.
		// This is a fix for Gorm offset issue
		offsetInt = 0
		query = query.Offset(offsetInt)
		query.Table("companies").Count(&count)

		data.Total = count
		data.Data = companies

		c.JSON(200, data)

	}
}

func CreateCompany(c *gin.Context) {
	db = include.GetDB()
	var company Company

	if err := c.BindJSON(&company); err != nil {
		fmt.Println(err)
	}

	if err := db.Create(&company).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, company)
	}
	return
}

func UpdateCompany(c *gin.Context) {
	db = include.GetDB()
	var company Company
	id := c.Params.ByName("id")

	if err := db.Where("id = ?", id).First(&company).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}

	c.BindJSON(&company)

	db.Save(&company)
	c.JSON(200, company)
}

func DeleteCompany(c *gin.Context) {
	db = include.GetDB()
	id := c.Params.ByName("id")
	var company Company

	if err := db.Where("id = ? ", id).Unscoped().Delete(&company).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, gin.H{"id#" + id: "deleted"})
	}
}
