# Create a Waterfall dialog

1. For this step, we will be using waterfall dialogs which allows us to store the DialogState at each step. Libraries are available in the framework. Let's import them in the *index.js* file:
``` javascript
    const { BotFrameworkAdapter, MemoryStorage, ConversationState, UserState } = require('botbuilder');
    const memoryStorage = new MemoryStorage();
    const conversationState = new ConversationState(memoryStorage);
    const userState = new UserState(memoryStorage);
```
2. We could now modify our *bot.js* file but it could a little clumsy. Let's create a new bot:
   1. In the *bots* folder, create a new *techExcellenceBot.js* file
   2. If we include the conversation/dialog logic within the bot it would become really unreadble, so we will be importing our dialogs as parameters as well.Let's create a new bot class as follows:
``` javascript
const { ActivityHandler, MessageFactory } = require('botbuilder');

class supportBot extends ActivityHandler {
    /**
     *
     * @param {ConversationState} conversationState
     * @param {UserState} userState
     * @param {Dialog} dialog
     */
    constructor(conversationState, userState, dialog) {
        super();
        if (!conversationState) throw new Error('[DialogBot]: Missing parameter. conversationState is required');
        if (!userState) throw new Error('[DialogBot]: Missing parameter. userState is required');
        if (!dialog) throw new Error('[DialogBot]: Missing parameter. dialog is required');

        this.conversationState = conversationState;
        this.userState = userState;
        this.dialog = dialog;
        this.dialogState = this.conversationState.createProperty('DialogState');
    }
    async run(context) {
        await super.run(context);

        // Save any state changes. The load happened during the execution of the Dialog.
        await this.conversationState.saveChanges(context, false);
        await this.userState.saveChanges(context, false);
    }
}
module.exports.supportBot = supportBot;
```
   3. Now we will tell our new bot how to handle new users joining the conversation in a more "natural" way. Let's add this part to the constructor:
``` javascript
    this.onMembersAdded(async (context, next) => {
        const membersAdded = context.activity.membersAdded;
        const welcomeText = 'Hello and welcome!';
        for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
            if (membersAdded[cnt].id !== context.activity.recipient.id) {
                await context.sendActivities([
                {
                    type: 'message',
                    text: 'Hello and welcome to the BMW Tech-Excellence Day!'
                },
                {
                    type: 'typing'
                },
                {
                    type: 'delay',
                    value: 1500
                },
                {
                    type: 'message',
                    text: 'My name is: ' + context.activity.membersAdded[0].name + ' and I am a bit smarter than an echo bot!'
                },
                {
                    type: 'typing'
                },
                {
                    type: 'delay',
                    value: 1000
                },
                {
                    type: 'message',
                    text: 'Please say something to test me.'
                }
            ]);
                console.log(context.activity.membersAdded);
            }
        }
        // By calling next() you ensure that the next BotHandler is run.
        await next();
    });
```  
   4. Now let's tell our bot to use our dialog when a new message comes in (add in the constructor):
```javascript
    this.onMessage(async (context, next) => {
        console.log('Running dialog with Message Activity.');

        // Run the Dialog with the new message Activity.
        await this.dialog.run(context, this.dialogState);

        // By calling next() you ensure that the next BotHandler is run.
        await next();
    });
```  
   5. Our supportBot is now ready to be called in the *index.js* file, but our dialog is still missing. Let's proceed to the next step.
3. Let's now do the dialog part:
   1. Create a new *dialogs* folder and in this folder create the dialog file: *mainDialog.js*
   2. Let's import the needed libraries and create our dialog class:
```javascript
const { MessageFactory, CardFactory, InputHints } = require('botbuilder');
const { ComponentDialog, DialogSet, DialogTurnStatus, TextPrompt, ChoicePrompt, WaterfallDialog } = require('botbuilder-dialogs');
const WelcomeCard = require('../bots/resources/cards/welcomeCard.json');

const MAIN_WATERFALL_DIALOG = 'mainWaterfallDialog';

class MainDialog extends ComponentDialog {
	constructor(luisRecognizer) {
		super('MainDialog');
		
		if (!luisRecognizer) throw new Error('[MainDialog]: Missing parameter \'luisRecognizer\' is required');
        this.luisRecognizer = luisRecognizer;
        
        // Importing the ChoicePrompt Class allows us to prompt the user and give him a list of choices, so that the user can click a button instead of typing the answer.
        this.choicePrompt = new ChoicePrompt('ChoicePrompt');
        this.choicePrompt.style = 4;
		
		this.addDialog(new TextPrompt('TextPrompt')) // We can prompt the user for an answer in plain text 
            .addDialog(this.choicePrompt) // We include the choice prompt in this dialog
            ]));

        this.initialDialogId = MAIN_WATERFALL_DIALOG
    }
}
module.exports.MainDialog = MainDialog;
```  
   3. Now let's define our *run* method that takes the context and the dialog state as parameters (see step 2.4)
```javascript
/**
     * The run method handles the incoming activity (in the form of a TurnContext) and passes it through the dialog system.
     * If no dialog is active, it will start the default dialog.
     * @param {*} turnContext
     * @param {*} accessor
     */
    async run(turnContext, accessor) {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);

        const dialogContext = await dialogSet.createContext(turnContext);
        
        ////////////////////////
        // Workaround part: this allows to use the "submit" of a rich card as input and tells the waterfall to proceed to the next dialog step
        const activity = dialogContext.context.activity;
        if (!activity.text && activity.value) {
            activity.text = JSON.stringify(activity.value);
            };
        ////////////////////////

        const results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }
```  
   4. We have the run method, all parameters but our dialog does not have any waterfall defined yet. Let's say we want a 4-steps waterfall. In the constructor we will then add 4 steps:
```javascript
this.addDialog(new TextPrompt('TextPrompt'))
    .addDialog(this.choicePrompt)
    .addDialog(new WaterfallDialog(MAIN_WATERFALL_DIALOG, [ // We define the waterfall components
        this.stepZero.bind(this)
        , this.stepOne.bind(this)
        , this.stepTwo.bind(this)
        , this.stepThree.bind(this)
```  
   5. Now we will add these 4 steps (functions / methods) in our class:
```javascript
    async stepZero(stepContext) {// Check if LUIS is working and display a welcome/submit name card if the username is unknown
        if (!this.luisRecognizer.isConfigured) {
            const messageText = 'NOTE: LUIS is not properly configured.';
            await stepContext.context.sendActivity(messageText);
            return await stepContext.next();
        }
        if(stepContext.context.activity.from.name ==='You'|| stepContext.context.activity.from.name ===''){
            const welcomeCard = CardFactory.adaptiveCard(WelcomeCard);                    
            await stepContext.context.sendActivity({ attachments: [welcomeCard] });
            // This part just tells the bot that we are waiting for the user's input
            const promptMessage = MessageFactory.text('', '', InputHints.ExpectingInput);
            return await stepContext.prompt('TextPrompt', { prompt: promptMessage });
            
        } else {
            return await stepContext.next();
        }
    }
    async stepOne(stepContext) { // Adresses the user by his/her name and asks the user's how to help
        console.log(stepContext.context.activity.value.username);
        console.log(stepContext.context.activity.text);
        // we assume the user answers within the card. If the user writes text instead, this won't work.
        const username = stepContext.context.activity.value.username;
        const messageText = stepContext.options.restartMsg ? stepContext.options.restartMsg : `How can I help you ${username} ?`;
        const promptMessage = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
        return await stepContext.prompt('TextPrompt', { prompt: promptMessage });
    }
    async stepTwo(stepContext) {// Some logic, if the user says hi, the bot just answers and closes the conversation. If the user asks for help, a choice question will be asked, otherwise we will pass the contents of the "else" choice to the next step.
    // Luis is needed here
        console.log(stepContext.context.activity);
        var recognizerResults = await this.luisRecognizer.executeLuisQuery(stepContext.context);
        console.log(recognizerResults);
        let replyText;
        switch (recognizerResults.luisResult.prediction.topIntent){
            case 'greetings':
                replyText = `Hello ${ stepContext.context.activity.from.name } ! Bots have no emotions but I am happy when someone greets me`;
                await stepContext.context.sendActivity(replyText)
                return stepContext.endDialog();
            case 'requestForHelp':
                replyText = 'Can you please tell me more about your issue ?';
                return await stepContext.prompt('ChoicePrompt', replyText,
                [
                    { value: 'printingIssue', action: { type: 'imBack', title: 'I cannot print', value: 'I have a printing issue' }, synonyms: ['1', 'printingIssue', 'I cannot print', 'I have a printing issue'] },
                    { value: 'passwordIssue', action: { type: 'imBack', title: 'I forgot my password', value: 'I cannot remember my password' }, synonyms: ['2', 'passwordIssue', 'I forgot my password', 'I cannot remember my password'] },
                    { value: 'otherIssue', action: { type: 'imBack', title: 'Something else', value: 'I have another issue that is not listed here' }, synonyms: ['3', 'otherIssue', 'Something else', 'I have another issue that is not listed here'] }
                ]);
            default:
                return await stepContext.next({ value: recognizerResults.luisResult.prediction.topIntent });  
            }
        }
        async stepThree(stepContext) { // Final step: we provide an answer based on the user's problem
            console.log(stepContext.result);
            let replyText;
            switch(stepContext.result.value){
                case 'printingIssue':
                    replyText = "Be eco-friendly, don't print :)";
                    await stepContext.context.sendActivity(replyText);
                    return stepContext.endDialog();
                case 'passwordIssue':
                    replyText = 'Please contact a colleague for the four-eyes password reset process';
                    await stepContext.context.sendActivity(replyText);
                    return stepContext.endDialog();
                case 'otherIssue':
                    replyText = 'Sorry I cannot find any resolveIT solution for your issue. You will be contacted by an expert.';
                    await stepContext.context.sendActivity(replyText);
                    return stepContext.endDialog();
                default:
                    replyText = 'Sorry the training I had was not good enough, I cannot understand what you said';
                    await stepContext.context.sendActivity(replyText);
                    return stepContext.endDialog();
                }
            }
```
4. We have done a pretty good job so far. A new bot and the waterfall dialogs are created. Now we need to make the whole thing work. Let's check our *index.js* file:
   1. Import additional libraries and initialize the needed variables:
``` javascript
// Replace const { BotFrameworkAdapter } = require('botbuilder'); by the lines below:
// The MemoryStorage should be used only for dev purposes. If you restart your app, the memory is flushed, which is not acceptable in production
const { BotFrameworkAdapter, MemoryStorage, ConversationState, UserState } = require('botbuilder');
const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);
```
   2. Import the new bot:
``` javascript
const { supportBot } = require('./bots/techExcellenceBot');
```   
   3. Import the new dialog:
``` javascript
const { MainDialog } = require('./dialogs/mainDialog');
const dialog = new MainDialog(luisRecognizer);
```   
   4. Instantiate your new bot and pass the variables:
``` javascript
const mySupportBot = new supportBot(conversationState, userState, dialog);
```
   5. Finally modify the routing of your adapter once you receive a message on your */api/messages* endpoint:
``` javascript
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        // Route to main dialog.
        await mySupportBot.run(context); // Use your new bot here
    });
});
```