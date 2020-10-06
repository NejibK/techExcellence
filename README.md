# Welcome to the TechEx Operation Day  

Welcome to the TechExcellence Operation Day and thank you for your interest into AI Chatbots.

## Login to MS Azure

1. Please request your credetials  to the Workshop presenters, to be able to participate to this hand-on workshop (recommended).

2. Launch your favorit navigator and go to: https://portal.azure.com

3. Enter username & password that were provided to you. You should be forwarded to MS Azure Home portal.

4. These Credentials are available for XXXX TIME and enable you to XXXXX SERVICES / BUDGET ...  

## Create Ressource needed 

1.  Create a new Web App Bot 
    1. "+" symbol should be shown under Azure Services) - or
    1. Expand the Menu bar of the left side of the Home portal and click on "+ Create a ressource".
    1. You will be forwarded to Azure Marketplace.
    1. Type "Web App Bot" in the search field. 
    1. Click Create 

2. Fill creationn form
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

# Echo Bot template

This bot has been created using [Bot Framework](https://dev.botframework.com), it shows how to create a simple bot that accepts input from the user and echoes it back.

## Prerequisites

- [Node.js](https://nodejs.org) version 10.14 or higher
    ```bash
    # determine node version
    node --version
    ```
# To run the bot locally
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
