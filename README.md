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

3.	Main dependencies in the package.json file
    
    3.1. "botbuilder" => The microsoft bot framework library (version 4.6)
    
    3.2. "dotenv" => library for managing environment variables
   
    3.3. "restify" => which will allow us to create our RESTful web service
    
4.	index.js

    4.1. Middlewares implemented or that you would implement

    4.2. Endpoint of your app and how your restful web service responds when a post request is sent to the endpoint.

5. bot.js

    5.1. Let's change how the bot reacts when a new user joins the conversation:
    
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

2.	Let's check in the constructor how the bot handles new messages and make some changes
this.onMessage(async (context, next) => {
if (context.activity.text === "Hi"){
await context.sendActivity(`Hello ${ context.activity.from.name }`);
}else{
await context.sendActivity(`You said '${ context.activity.text }'`);
}
console.log(context);
 
New Bot
1.	Download the latest version of the emulator: https://aka.ms/abs/build/emulatordownload
2.	Download the latest version of node.js https://nodejs.org/en/download/
3.	If Visual Studio Code not installed and you wish to have it => https://code.visualstudio.com/download
 
4.	Now let's create a new node.js bot but this time we'll take the basic sample including language understanding (Basic_<number>_<name>)
a.	Same Subscription, Resource Group, Location and Pricing Tier
b.	App name not modified
c.	LUIS App location => West Europe
d.	LUIS Accounts => Create new BMW-TechExcellence-<number>
e.	App Service Plan => Create new BMW-TechExcellence-Basic-<number> 
f.	Insights On
g.	App Insights Location => West Europe
5.	We open the web app bot
6.	We go to Build and Download the Bot Source Code, and extract the zip file to a folder
7.	Open the extracted folder in your preferred IDE (with  Node.js / Javascript support) or if you are using VS Code just right clic on the folder and clic "open with code"
8.	Let's open the package.json file and see what's changed
a.	Botbuilder-ai and botbuilder-dialogs
b.	Let's have a closer look
9.	Terminal > New Terminal
a.	npm install
10.	Go to eu.luis.ai
a.	Select the subscription and the authoring resource created before
b.	An app should appear
c.	Clic it to open
d.	In the menu on the top, clic "BUILD", intents and entities are displayed
e.	Explore and check how intents and entities are built
11.	Now open the emulator and click open bot
a.	URL http://localhost:3978/api/messages
b.	App-ID and password can be found in the .env file (MicrosoftAppId, MicrosoftAppPassword)
c.	In the Emulator settings (icon in the bottom left corner), click bypass ngrok for local addresses
12.	What has changed: you see a card instead of just text
a.	Let's Check bots\dialogsAndWelcomeBot.js => welcomeCard is loaded
b.	Let's open welcomeCard.json in the resources folder => Difficult to read
c.	Open: https://adaptivecards.io/designer/ and copy paste the content of the welcomeCard in the Card Payload Editor
 
 










# [OutOFScope] To run the bot locally
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

## Testing the bot using Bot Framework Emulator

[Bot Framework Emulator](https://github.com/microsoft/botframework-emulator) is a desktop application that allows bot developers to test and debug their bots on localhost or running remotely through a tunnel.

- Install the Bot Framework Emulator version 4.9.0 or greater from [here](https://github.com/Microsoft/BotFramework-Emulator/releases)

### Connect to the bot using Bot Framework Emulator

- Launch Bot Framework Emulator
- File -> Open Bot
- Enter a Bot URL of `http://localhost:3978/api/messages`

## Deploy the bot to Azure

To learn more about deploying a bot to Azure, see [Deploy your bot to Azure](https://aka.ms/azuredeployment) for a complete list of deployment instructions.

## Further reading

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
