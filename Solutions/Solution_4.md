# Prompt the user for his name with a rich card

1. Let's create a rich card first. This can be down with the help of the Card Designer (https://adaptivecards.io/designer/).
   1. Create this folder structure: */bots/resources/cards/*
   2. Create a file with the name: *welcomeCard.json*
   3. Paste the content below in this file
``` javascript
{
    "type": "AdaptiveCard",
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.2",
    "body": [
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "BMW TechExcellence",
                            "wrap": true,
                            "id": "title",
                            "fontType": "Monospace",
                            "size": "Medium",
                            "weight": "Bolder",
                            "color": "Light",
                            "isSubtle": true
                        }
                    ],
                    "width": 90
                },
                {
                    "type": "Column",
                    "width": 10,
                    "items": [
                        {
                            "type": "Image",
                            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/1200px-BMW_logo_%28gray%29.svg.png",
                            "size": "Small"
                        }
                    ]
                }
            ]
        },
        {
            "type": "TextBlock",
            "text": "Welcome to this hands-on session about chatbots. I want to address you directly, so it would be better if you can provide more information about yourself.",
            "wrap": true,
            "id": "intro",
            "maxLines": 4,
            "height": "stretch",
            "fontType": "Default"
        },
        {
            "type": "Container",
            "items": [
                {
                    "type": "TextBlock",
                    "text": "Username",
                    "wrap": true,
                    "id": "your_name",
                    "weight": "Bolder"
                },
                {
                    "type": "Input.Text",
                    "placeholder": "your name",
                    "value": "",
                    "id": "username"
                }
            ]
        },
        {
            "type": "ActionSet",
            "actions": [
                {
                    "type": "Action.Submit",
                    "title": "Submit",
                    "style": "positive"
                }
            ]
        }
    ]
}
```

2. Now we want to show this newly created card to our new users: 
``` javascript
// We import CardFactory in our bot.js file
const { ActivityHandler, MessageFactory, CardFactory } = require('botbuilder');

// We import our welcomeCard
const WelcomeCard = require('./bots/resources/cards/welcomeCard.json');

this.onMembersAdded(async (context, next) => {
    const membersAdded = context.activity.membersAdded;
    const welcomeText = 'Hello and welcome!';
    for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
        if (membersAdded[cnt].id !== context.activity.recipient.id) {
            // We create the card
            const welcomeCard = CardFactory.adaptiveCard(WelcomeCard);  
            // We send it as an attachment
            await context.sendActivity({ attachments: [welcomeCard] });
        }
    }
    // By calling next() you ensure that the next BotHandler is run.
    await next();
});
```
 