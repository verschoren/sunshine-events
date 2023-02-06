The following are private APIs from Zendesk that aren't documented. They can be used to make Event types visible.
Normally this has to be done via the Admin Panel by an Admin.

All API calls are authenticated with an `admin@domain.com\token` and `Zendesk API token`

# List Event Types
- Type: GET
- url: "/api/sunshine/metadata/events/types",

## Returned Data
```
{
    "data": [
        {
            "source": "Some Custom Source",
            "type": "Some Custom Type",
            "updated_at": "2023-01-17T10:28:59.307547512Z",
            "created_at": "2023-01-17T10:28:59.307547512Z",
            "config": {
                "show_in_interaction_history": false
            }
        },
        {
            "source": "zendesk",
            "type": "suggested_article_clicked",
            "updated_at": "2022-01-20T12:28:14.64401277Z",
            "created_at": "0001-01-01T00:00:00Z",
            "config": {
                "show_in_interaction_history": true
            }
        },
        ...
    ]
}
```

# Toggle visibility
- Type: PUT
- URL: `/api/sunshine/metadata/events/types`

## Payload
```
{
   source: "Some Custom Source",
   type: "Some Custom Source",
   config: { 
      show_in_interaction_history: true //or false to hide
   },
}
```

## Returned Data
`Status: 200`
