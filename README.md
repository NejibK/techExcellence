# Welcome to the TechEx Operation Day

Welcome to the TechExcellence Operation Day and thank you for your interest into AI Chatbots.

## Login to MS Azure

1. Please request your credentials from the workshop presenters, to be able to participate to the hand-on exercises.
2. Launch your favorit navigator and go to: https://portal.azure.com
3. Enter the username & password that were provided to you. The Azure homepage should be now displayed.
    - You should have received your credentials via Email, if you registered to this event before noon.    
    - If you didn't receive your credentials, please let us now.

## Create Ressource needed

1.  Create a new Web App Bot 
    1.  Click the "+ Create a resource" icon (top left)
    2.  You will be forwarded to Azure Marketplace.
    3.  Type "Web App Bot" in the search field. 
    4.  Click "Create".
2. Fill in the service creation form
   1. Give a cool name to your bot.
   2. Subscription should be automatically selected, if not select the active one
   3. Create a new ressource group: use the naming pattern "TechExcellence_*<trainee_number>*"
        - *Hint: Use the hyperlink "create new ressource group" under the field*
   4. Location: Germany West Central
   5. Pricing F0 (10K first messages are free)
   6. Appname is automatically defined (not to be changed)
   7. Bot template:
      1. SDK Language: Node.JS
      2. Template: Echo Bot
   9.  Application Insights: Off
   10. Leave Microsoft App Id and Password on auto create.
3. App Service & Webb App Bot will be created in your newly created Ressource Group.
   This could take up to 5 minutes.
4. Once the process finished, open your Resource Group.
5. Open the App Service & the Web App Bot in two seperate browser tabs.

## Web App bot

1.	In the Overview you can check your resource group, your subscription, your pricing tier and the messaging endpoint.
2.	Before we look into the code, let's test this echo bot: Test in Web Chat (you might need to zoom out "Ctrl -" )
3. Use this window to test your bot after every change in the code (next step)
   1. For that just click "Start Over" (refresh icon)
   2. A new conversation with the latest version of your code will be triggered
4. Now let's check our code. There are two possibilities:
   1. In the Web App bot: Go to the build menu and "Open online code editor" (link in the last line when you open the Build menu)
   2. In the app service: Scroll left menu until "App Service Editor (Preview)" and click "Go ->"

## App Service
1. In the menu bar on the left, you'll see a list of icons:
   - Explore your files
   - Search
   - Git features
   - Run (you'll need it to re-run your app after making changes)
   - Output: is your stdout
   - Console: to run commands (e.g. npm install or npm start)
   - Go to file
2. Let's explore the contents:
   1. package.json: Main dependencies
      - botbuilder: The microsoft bot framework library (latest Version)
      - dotenv: library for managing environment variables
      - restify: will allow us to create our RESTful web service
   2. index.js:
      - Middlewares implemented or that you would implement
      - Endpoint of your app and how your restful web service responds when a post request is sent to the endpoint.
   3. bot.js:
       - Chatbot logic, states, and dialogs if not defined in different files

## Exercises
1. *Change new user greeting*: The bot should greet the user differently
    - **Solution:** [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Human-dialog-info.svg/128px-Human-dialog-info.svg.png" alt="drawing" width="24"/> Change new user greeting](Solution_1.md)    
2. *Change new message processing logic*: The bot should differentiate certain user inputs from the rest
   - **Solution:** [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Human-dialog-info.svg/128px-Human-dialog-info.svg.png" alt="drawing" width="24"/> Change new user greeting](Solution_2.md)
4. *Prompt the user for his name with a rich card*: The bot should prompt the user for his name and address him with the given name
   - **Solution:** [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Human-dialog-info.svg/128px-Human-dialog-info.svg.png" alt="drawing" width="24"/> Change new user greeting](Solution_3.md)
5. *Add NLP Capabilities to our bot*: The bot should be able to recognize user intent with different utterances
   - **Solution:** [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Human-dialog-info.svg/128px-Human-dialog-info.svg.png" alt="drawing" width="24"/> Change new user greeting](Solution_4.md)
6. *Create a Waterfall dialog*: The bot is able to implement a basic conversation flow
   - **Solution:** [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Human-dialog-info.svg/128px-Human-dialog-info.svg.png" alt="drawing" width="24"/> Change new user greeting](Solution_5.md)

The [icons][Icon source] used are subject to the [Creative Commons - Attribution Share Alike license][Icon Licence].

[Icon source]: https://launchpad.net/human-icon-theme/
[Icon Licence]: https://bazaar.launchpad.net/~ubuntu-art-pkg/human-icon-theme/ubuntu/view/head:/COPYING

   


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

## [Tipps] Connect to the bot using Bot Framework Emulator

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