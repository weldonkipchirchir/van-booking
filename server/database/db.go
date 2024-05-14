package database

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	Client *mongo.Client
	dbName = "vanlife"
	DB     *mongo.Database
)

func DBConnection() error {
	clientOptions := options.Client().ApplyURI("mongodb+srv://weldonkipchirchir23:B7olZ9XQ6iGmD5S1@cluster0.b6j7yxf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var err error
	Client, err = mongo.Connect(ctx, clientOptions) // Fix: Remove Client declaration
	if err != nil {
		log.Fatal("Error connecting to the database")
	}

	// check connection
	err = Client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("Error pinging the MongoDB")
	}
	log.Println("Successfully connected to the database")

	DB = Client.Database(dbName)

	return err
}

// mongo client instance
func GetClient() *mongo.Client {
	return Client
}

// get collection instance
func GetCollection(collectionName string) *mongo.Collection {
	return Client.Database(dbName).Collection(collectionName)
}

// diconnect the mongodb connection
func DbDisconnect() {
	if Client != nil {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		err := Client.Disconnect(ctx)
		if err != nil {
			panic(err)
		}
		log.Println("Disconnected from MongoDB!")
	}

}
