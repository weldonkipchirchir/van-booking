package utils

import (
	"fmt"
	"os"

	"github.com/go-mail/mail"
)

var gmailCode = os.Getenv("GMAIL")

func SendEmail(code, email, name string) error {
	m := mail.NewMessage()
	senderEmail := "weldonkipchirchir23@gmail.com"

	m.SetHeader("From", senderEmail)
	m.SetHeader("To", email)
	m.SetHeader("Subject", "Vanlife verification code!")

	// Compose the email body with dynamic name and code
	body := fmt.Sprintf("Hello <b>%s</b>, your verification code is: <b>%s</b>!", name, code)
	m.SetBody("text/html", body)

	// Attachments can be added if needed
	// m.Attach("lolcat.jpg")

	d := mail.NewDialer("smtp.gmail.com", 587, senderEmail, "twtovgrefhhvzigy")

	// Send the email
	if err := d.DialAndSend(m); err != nil {
		return err
	}

	return nil
}
