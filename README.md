# Welcome to the TechEx Operation Day  

Welcome to the TechExcellence Operation Day and thank you for your interest into AI Chatbots.

## Login to MS Azure

1. Please request your credetials  to the Workshop presenters, to be able to participate to this hand-on workshop (recommended).

2. Launch your favorit navigator and go to: https://portal.azure.com

3. Enter username & password that were provided to you. You should be forwarded to MS Azure Home portal.

4. These Credentials are available for XXXX TIME and enable you to XXXXX SERVICES / BUDGET ...  

## Create Ressource needed 

1.  Create a new Web App Bot 

    1.1. "+" symbol should be shown under Azure Services) - or
    
    1.1. Expand the Menu bar of the left side of the Home portal and click on "+ Create a ressource".
    
    1.2. You will be forwarded to Azure Marketplace.
    
    1.3. Type "Web App Bot" in the search field. 
    
    1.4. Click Create 

2. Fill service creation form

    2.1. Name your bot "Echo_<number>_<name>"
    
    2.2. Subscription should be automatically selected, if not select the active one

    2.3. Create a new ressource group: use the naming pattern TechExcellence_<number>_<name>

    2.4. Location: Germany West Central

    2.5. Pricing F0 (10K first messages are free)

    2.5. Appname is automatically defined -> not to be changed

    2.6. SDK Language: Node.JS

    2.7. Template: Echo Bot

    2.8. Application Insights: Off
    
3. App Service & Webb App Bot will be created in your newly created Ressource Group 

    This could take up to 5 minutes 

4. Search for your ressource group or your newly created service in the search bar in Az blue header.

5. Open the App Service & the Webb App Bot in two browser Tabs

## Web App bot

1.	In the Overview you can check your resource group, your subscription, your pricing tier and the messaging 
endpoint

2.	Before we look into the code, let's test this echo bot -> Test in Web Chat (you might need to zoom out "Ctrl -" )

3. Use this window to test your bot after every change in the code (next step)

    3.1. For that just click "Start Over"
    
    3.2. A new conversation with the latest version of your code will be triggered
    
4. Now let's Go to the build menu and "Open online code editor" (link in the last line when you open the Build menu) or in the app service > scroll left menu until "App Service Editor (Preview)" 

## App Service

1. Go to App Service Editor (Preview)

2. Click "Go -->". A new window with your default echo-bot root opens. 

3.	 package.json: Main dependencies
    
    - "botbuilder" => The microsoft bot framework library (version 4.6)
    
    - "dotenv" => library for managing environment variables
   
    - "restify" => which will allow us to create our RESTful web service
    
4.	index.js: 

    - Middlewares implemented or that you would implement

    - Endpoint of your app and how your restful web service responds when a post request is sent to the endpoint.

5. bot.js: 

    - Chatbot logic, states, and dialogs

## Exercises

- Change new user greeting: The bot should great the user differently

- Change new message logic: The bot should differentiate certain user inputs from the rest

- Prompt the user for his name with a rich card: The bot should prompt the user for his name and address him with the given name

- Save Conversation & User States

- Add NLP Capabilities to our bot: The bot should be able to recognize user intent with different utterances

- Create a Waterfall dialog: The bot is able to implement a basic conversation flow

## Code to Exercises

### Change new user greeting

Let's change the welcome text when a new user joins the conversation:
    
    ```javascript
    if (membersAdded[cnt].id !== context.activity.recipient.id) {
    await context.sendActivity('Hello and welcome to the BMW Technical Excellence Day!');
    await context.sendActivity('My name is: ' + context.activity.membersAdded[0].name);
    await context.sendActivity('I am an echo bot!');
    await context.sendActivity('You are user number:' + cnt);
    await context.sendActivity('Your id is:' + context.activity.membersAdded[cnt].id);
    await context.sendActivity('Please say something to test me.');
    console.log(context.activity.membersAdded);
    }
    ```

### Change new message logic

Now, let's change the echo logic triggered when the bot receives a message:

    ```javascript
    this.onMessage(async (context, next) => {
    if (context.activity.text === "Hi"){
    await context.sendActivity(`Hello ${ context.activity.from.name }`);
    }else{
    await context.sendActivity(`You said '${ context.activity.text }'`);
    }
    console.log(context);
    ```

### Prompt the user for his name with a rich card

Let's create a rich card first. This can be down with the help of the Card Designer (https://adaptivecards.io/designer/):

    ```javascript
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

Now we want to show this newly created card to our new users:
    
    ```javascript
    this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Hello and welcome!';
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    const welcomeCard = CardFactory.adaptiveCard(WelcomeCard);  // We define the card                   
                    await context.sendActivity({ attachments: [welcomeCard] }); // we send the card
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    ```
    
### Save Conversation & User States    

We need first to import libraries and to initialize the memory storage & conversation state in the index.js file

    ```javascript
    const { BotFrameworkAdapter, MemoryStorage, ConversationState, UserState } = require('botbuilder');
    const memoryStorage = new MemoryStorage();
    const conversationState = new ConversationState(memoryStorage);
    const userState = new UserState(memoryStorage);
    ```
 We need to pass all these variables to the bot constructor

    ```javascript
    const myBot = new EchoBot(conversationState, userState); 
    ``` 
    
We pass these variables to the code in bot.js 

    ```javascript
     constructor(conversationState, userState) {
        super();
        if (!conversationState) throw new Error('[DialogBot]: Missing parameter. conversationState is required');
        if (!userState) throw new Error('[DialogBot]: Missing parameter. userState is required');
        this.conversationState = conversationState;
        this.userState = userState;
        this.dialogState = this.conversationState.createProperty('DialogState'); 
    ``` 
  
Finally we override the ActivityHandler.run() method to save state changes after the bot logic completes.
   
   ```javascript
    async run(context) {
        await super.run(context);
        // Save any state changes. The load happened during the execution of the Dialog.
        await this.conversationState.saveChanges(context, false);
        await this.userState.saveChanges(context, false);
    }
    ``` 
    
### Add NLP Capabilities to our bot

1. Let's first create our NLP Model 

    Go to eu.luis.ai
    
    Select the subscription and the authoring resource created before
    
    An app should appear
    
    Clic it to open
    
    In the menu on the top, clic "BUILD", intents and entities are displayed
    
    Explore and check how intents and entities are built


4.	Now let's create a new node.js bot but this time we'll take the basic sample including language understanding (Basic_<number>_<name>)
a.	Same Subscription, Resource Group, Location and Pricing Tier
b.	App name not modified
c.	LUIS App location => West Europe
d.	LUIS Accounts => Create new BMW-TechExcellence-<number>
e.	App Service Plan => Create new BMW-TechExcellence-Basic-<number> 
f.	Insights On
g.	App Insights Location => West Europe
5.	We open the web app bot-service-4

We create a function that retrieves our LUIS Configuration

  ```javascript
    const { LuisRecognizer } = require('botbuilder-ai');

    class supportRecognizer {
        constructor(config) {
            const luisIsConfigured = config && config.applicationId && config.endpointKey && config.endpoint;
            if (luisIsConfigured) {
                const recognizerOptions = {
                    apiVersion: 'v3'
                };

                this.recognizer = new LuisRecognizer(config, recognizerOptions);
            }
        }

        get isConfigured() {
            return (this.recognizer !== undefined);
        }

        async executeLuisQuery(context) {
            return await this.recognizer.recognize(context);
        }
    }
    module.exports.supportRecognizer = supportRecognizer;
    ``` 

We import the needed libraries and the previous function in the index.js file

    ```javascript
    const { LuisRecognizer } = require('botbuilder-ai');
    const { supportRecognizer } = require('./bots/resources/recognizers/supportRecognizer');
    const { LuisAppId, LuisAPIKey, LuisAPIHostName } = process.env;
    const luisConfig = { applicationId: LuisAppId, endpointKey: LuisAPIKey, endpoint: `https://${ LuisAPIHostName }` };
const recognizerOptions = {
        apiVersion: 'v3'
    };
const luisRecognizer = new supportRecognizer(luisConfig, recognizerOptions);
    ``` 

### Create a Waterfall dialog
 

# [Tipps] To run the bot locally
- Download the bot code from the Build blade in the Azure Portal (make sure you click "Yes" when asked "Include app settings in the downloaded zip file?").
    - If you clicked "No" you will need to copy all the Application Settings properties from your App Service to your local .env file.
- Install modules

    ```bash
    npm install
    ```

- Run the bot

    ```bash
    npm start
    ```

## [Tipps] Testing the bot using Bot Framework Emulator

[Bot Framework Emulator](https://github.com/microsoft/botframework-emulator) is a desktop application that allows bot developers to test and debug their bots on localhost or running remotely through a tunnel.

- Install the Bot Framework Emulator version 4.9.0 or greater from [here](https://github.com/Microsoft/BotFramework-Emulator/releases)

### [Tipps] Connect to the bot using Bot Framework Emulator

- Launch Bot Framework Emulator
- File -> Open Bot
- Enter a Bot URL of `http://localhost:3978/api/messages`

## [Tipps] Deploy the bot to Azure

To learn more about deploying a bot to Azure, see [Deploy your bot to Azure](https://aka.ms/azuredeployment) for a complete list of deployment instructions.

## [Tipps] Further reading

- [Bot Framework Documentation](https://docs.botframework.com)
- [Bot Basics](https://docs.microsoft.com/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0)
- [Activity processing](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-concept-activity-processing?view=azure-bot-service-4.0)
- [Azure Bot Service Introduction](https://docs.microsoft.com/azure/bot-service/bot-service-overview-introduction?view=azure-bot-service-4.0)
- [Azure Bot Service Documentation](https://docs.microsoft.com/azure/bot-service/?view=azure-bot-service-4.0)
- [Deploy your bot to Azure](https://aka.ms/azuredeployment)
- [Azure CLI](https://docs.microsoft.com/cli/azure/?view=azure-cli-latest)
- [Azure Portal](https://portal.azure.com)
- [Language Understanding using LUIS](https://docs.microsoft.com/en-us/azure/cognitive-services/luis/)
- [Channels and Bot Connector Service](https://docs.microsoft.com/en-us/azure/bot-service/bot-concepts?view=azure-bot-service-4.0)
- [Restify](https://www.npmjs.com/package/restify)
- [dotenv](https://www.npmjs.com/package/dotenv)
