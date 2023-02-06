![Apple TV 4K Copy 25@0 5x](https://user-images.githubusercontent.com/894026/217014599-1a8551dd-fb01-4939-88dc-e0b1fca5d619.jpg)

# Zendesk Sunshine Events via Webhooks
This repository contains sample code for the article [Zendesk Sunshine Events via Webhooks](https://internalnote.com/p/6af82739-a7e5-49ef-b132-70961403cd17/) published on Internal Note.

## Incoming POST request
We parse an incoming post request

```
var payload = {
    "name": "James Sullivan",
    "email": "james@monsters.inc",
    "booking_id": "1345",
    "date": "04/05/2023"
}
```

## findUser()
We then use the search API endpoint of Zendesk to get the `user.id` of the user matching the `payload.email` above.

## create Event()
Finally we create an event payload based on the received input data and `POST` it to Zendesk.

```
var url = `https://${domain}.zendesk.com/api/v2/users/${user.id}/events`;
var event = {
	"event": {
		"source": "Website",
		"type": "Booking",
		"description": "✈️ New Booking",
		"properties": {
			"booking_id": input.booking_id,
			"date": input.date
		}
	},
	"profile": {
		"identifiers": [{
			"type": "email",
			"value": user.email
		}],
		"name": user.name,
		"source": "website",
		"type": "customer"
	}
}
```
