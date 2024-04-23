package database

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	Client *mongo.Client
	dbName = "vanlife"
	DB     *mongo.Database
)

var dbUrl = os.Getenv("MONGO_URL")

func DBConnection() error {
	clientOptions := options.Client().ApplyURI(dbUrl)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var err error
	Client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal("Error connecting to the database")
	}

	// check connection
	err = Client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("Error pinging the MOngoDB")
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
