package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Van struct {
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty" `
	Name        string             `json:"name" validate:"name,required,min=3"`
	Price       int64              `json:"price" validate:"price,required"`
	Description string             `json:"description" validate:"description,required"`
	ImgageUrl   string             `json:"imageUrl" validate:"imageUrl,required"`
	Type        string             `json:"type" validate:"type,required"`
	HostId      string             `json:"hostId" validate:"hostId,required"`
	OwnerId     primitive.ObjectID `json:"ownerId,omitempty" bson:"ownerId,omitempty"`
}
