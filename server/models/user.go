package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID            primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty" `
	Name          string             `json:"name" validate:"name,required,min=3"`
	Email         string             `json:"email" validate:"email,required"`
	PrivacyPolicy bool               `json:"privacyPolicy" validate:"privacyPolicy,required"`
	NewsLetter    bool               `json:"newsLetter" validate:"newsLetter"`
	Password      string             `json:"password" validate:"email,required"`
}

type UserResponse struct {
	ID    primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty" `
	Name  string             `json:"name" validate:"required,min=3"`
	Email string             `json:"email" validate:"email,required"`
}
