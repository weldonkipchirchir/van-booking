package utils

import (
	"math/rand"
	"strconv"
	"time"
)

func GenerateVerification() string {
	rand.Seed(time.Now().UnixNano())
	code := rand.Intn(9000) + 10000

	return strconv.Itoa(code)

}
