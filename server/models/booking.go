package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Booking struct {
	ID            primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	VanID         primitive.ObjectID `json:"vanId,omitempty" bson:"vanId,omitempty"`
	CustomerID    primitive.ObjectID `json:"customerId,omitempty" bson:"customerId,omitempty"`
	StartDate     time.Time          `json:"startDate" bson:"startDate"`
	EndDate       time.Time          `json:"endDate" bson:"endDate"`
	Status        string             `json:"status" bson:"status"`               // Status of the booking, e.g., "confirmed", "pending", "cancelled"
	TotalAmount   float64            `json:"totalAmount" bson:"totalAmount"`     // Total amount charged for the booking
	Location      string             `json:"location" bson:"location"`           // Payment method used, e.g., "credit card", "cash"
	Comment       string             `json:"comment" bson:"comment"`             // Payment method used, e.g., "credit card", "cash"
	Rating        int                `json:"rating" bson:"rating"`               // Payment method used, e.g., "credit card", "cash"
	PaymentStatus string             `json:"paymentStatus" bson:"paymentStatus"` // Payment status, e.g., "paid", "pending"
	PaymentMethod string             `json:"paymentMethod" bson:"paymentMethod"` // Payment method used, e.g., "credit card", "cash"
	PaymentDate   time.Time          `json:"paymentDate" bson:"paymentDate"`
	OwnerID       primitive.ObjectID `json:"ownerId,omitempty" bson:"ownerId,omitempty"`
	// Add more fields as needed, such as booking date, payment details, etc.
}
