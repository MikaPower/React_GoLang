package model

import "github.com/jinzhu/gorm"

//form para data forms
type Company struct {
	gorm.Model
	Name       string `json:"name" gorm:"type:text"`
	Cellphone  string `json:"cellphone" gorm:"type:text"`
	Address    string `json:"address" gorm:"type:text"`
	PostalCode string `json:"postal_code" gorm:"type:text"`
	Parish     string `json:"parish" gorm:"type:text"`
	Count      int    `json:"count"`
}
