# Welcome to the TechEx Operation Day

Welcome to the TechExcellence Operations Day and thank you for your interest in AI Chatbots.

## Login to MS Azure

1. Please request your credentials from the workshop presenters, to be able to participate to the hand-on exercises.
2. Launch your favorit navigator and go to: https://portal.azure.com
3. Enter the username & password that were provided to you. The Azure homepage should be now displayed.
    - You should have received your credentials via Email, if you registered to this event before noon.    
    - If you didn't receive your credentials, please let us now.

## Today's training agenda
1. Create an echo chatbot in the Azure cloud
    - **Solution:** [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Human-dialog-info.svg/128px-Human-dialog-info.svg.png" alt="drawing" width="24"/> Create an echo bot](Solution_1.md)
2. The bot should greet the user differently
    - **Solution:** [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Human-dialog-info.svg/128px-Human-dialog-info.svg.png" alt="drawing" width="24"/> Change the user greeting](Solution_2.md)
3. The bot should respond differently based on the user's message.
   - **Solution:** [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Human-dialog-info.svg/128px-Human-dialog-info.svg.png" alt="drawing" width="24"/> Change the message processing logic](Solution_3.md)
4. The bot should prompt the user for his name and address him using the provided name.
   - **Solution:** [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Human-dialog-info.svg/128px-Human-dialog-info.svg.png" alt="drawing" width="24"/> Prompt users & use Rich Cards](Solution_4.md)
5. The bot should be able to understand the meaning of the user's text instead of reacting based on predefined words.
   - **Solution:** [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Human-dialog-info.svg/128px-Human-dialog-info.svg.png" alt="drawing" width="24"/> Add NLP Capabilities](Solution_5.md)
6. The bot is able to run a basic support conversation with the user, meaning that multiple diagnosis questions are asked and based on the user answers a final solution is provided.
   - **Solution:** [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Human-dialog-info.svg/128px-Human-dialog-info.svg.png" alt="drawing" width="24"/> Create a Support Bot with a waterfall dialog](Solution_6.md) 

## Additional tipps, links and documentation
### How to run the bot locally
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

### How to test the bot using Bot Framework Emulator
[Bot Framework Emulator](https://github.com/microsoft/botframework-emulator) is a desktop application that allows bot developers to test and debug their bots on localhost or running remotely through a tunnel.

- Install the Bot Framework Emulator version 4.9.0 or greater from [here](https://github.com/Microsoft/BotFramework-Emulator/releases)

### How to connect to the bot using Bot Framework Emulator
- Launch Bot Framework Emulator
- File -> Open Bot
- Enter a Bot URL of `http://localhost:3978/api/messages`

### How to deploy the bot to Azure
To learn more about deploying a bot to Azure, see [Deploy your bot to Azure](https://aka.ms/azuredeployment) for a complete list of deployment instructions.

### All the samples you need (incl. for MS Teams bots)
[Bot Framework samples in .NET, JS/TS and Python](https://github.com/microsoft/BotBuilder-Samples)

### Further reading
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

##### The [icons][Icon source] used are subject to the [Creative Commons - Attribution Share Alike license][Icon Licence].

[Icon source]: https://launchpad.net/human-icon-theme/
[Icon Licence]: https://bazaar.launchpad.net/~ubuntu-art-pkg/human-icon-theme/ubuntu/view/head:/COPYING