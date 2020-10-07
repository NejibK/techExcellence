# Add NLP Capabilities to our bot (15 mn)

1. Create a new Natural Languange Processing (NLP) resource (Cognitive Services)
   1. In your same Ressource Group, create a new resource (+)
   2. Search for "Language Understanding"
   3. Creation options : "both" (default)
   4. Select your Ressource Group
   5. Both Regions: "West Europe"
   6. Review + Create > Create
   7. "Your deployment is complete" is displayed
2. Let's then create our NLP Model (MS LUIS app)
   1. Go to eu.luis.ai
   2. Click "New App for conversation"
   3. Fill Name, Culture (English) ... 
   4. Prediction Resource: You should be able to select the cognitive service you just created in the previous step
   5. Your app should appear > Clic it to open
   6. In the menu on the top, clic "BUILD", intents and entities are displayed on the left side menu
   7. Explore and check how intents and entities are built
   8. Click on Train (Red color means that the model was not trained yet)
   9. Publish : Our model will be available to do inferences
3. Add the parameters of your LUIS app as environment variables to your bot:
   1. Open the App Service
   2. Go to Settings > Configuration
   3. Add the following Application Settings
      - LuisAPIHostName: *westeurope.api.cognitive.microsoft.com*
      - LuisAppId: *<app_id>*  (can be found in your LUIS app, under MANAGE > Settings)
      - LuisAPIKey: *<your_luis_api_key>* (can be found in LUIS platform, under MANAGE > Azure Ressources > Prediction Resources > Primary or Secondary Key)
   4. Don't forget to **Save**     
4. In order to call LUIS easily, we can use the **botbuilder-ai** library. But first, we need to install the package: in the console,  type:
``` bash
npm install --save botbuilder-ai
```
5. We create a function in a seperate file that retrieves our LUIS Configuration (*/bots/resources/recognizers/supportRecognizer.js*)
``` javascript
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
6. We import the needed libraries and the previous function in the *index.js* file
```javascript
const { supportRecognizer } = require('./bots/resources/recognizers/supportRecognizer'); // path of the previously created recognizer

// The following line should not be pasted before: dotenv.config({ path: ENV_FILE });
const { LuisAppId, LuisAPIKey, LuisAPIHostName } = process.env;
const luisConfig = { applicationId: LuisAppId, endpointKey: LuisAPIKey, endpoint: `https://${ LuisAPIHostName }` };
const luisRecognizer = new supportRecognizer(luisConfig);
``` 
7. We pass the previously defined Recognizer to the bot at its initialization in the index.js
```javascript
const myBot = new EchoBot(luisRecognizer)
``` 
8. Since we are passing the recognizer as a parameter, we need to add it to our constructor. Then we can use it once a message is received.
```javascript
// add the parameter
constructor(luisRecognizer) {
        super();
        // assign it
        this.recognizer = luisRecognizer;
        
        this.onMessage(async (context, next) => {
        // use it
        var recognizerResults = await this.recognizer.recognize(context);
``` 
9. Now instead of building our condition based on text (*"Hello* or *Hi*), we use the inference from our NLP Model:
```javascript
    if(recognizerResults.luisResult.prediction.topIntent === 'greetings'){ .... 
``` 