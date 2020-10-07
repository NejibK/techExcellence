# Create a Waterfall dialog
 
1. Import needed Libraries

```javascript
const { ComponentDialog, DialogSet, DialogTurnStatus, TextPrompt, ChoicePrompt, WaterfallDialog } = require('botbuilder-dialogs');
```  
 
2. Initialize Waterfall dialog

 ```javascript
const MAIN_WATERFALL_DIALOG = 'mainWaterfallDialog';
```  
 
3. We need to define the waterfall as part of our dialog and define all elements composing this waterfall
 ```javascript
class MainDialog extends ComponentDialog {
	constructor() {
		super('MainDialog');
        
        this.choicePrompt = new ChoicePrompt('ChoicePrompt'); // We can prompt the user for a choice
        this.choicePrompt.style = 4;
		
		this.addDialog(new TextPrompt('TextPrompt')) // We can prompt the user for free text 
            .addDialog(this.choicePrompt) // We include the choice prompt in this dialog
            .addDialog(new WaterfallDialog(MAIN_WATERFALL_DIALOG, [ // We define the waterfall components
                this.stepZero.bind(this)
                , this.stepOne.bind(this)
                , this.stepTwo.bind(this)
                , this.stepThree.bind(this)
            ]));

        this.initialDialogId = MAIN_WATERFALL_DIALOG
	}
 ```  
4. The last step here is the define the 4 functions that compose the waterfall "stepZero", "stepOne" .... for example: 

 ```javascript
async stepZero(stepContext) {
        if (!this.luisRecognizer.isConfigured) {
            const messageText = 'NOTE: LUIS is not properly configured.';
            await stepContext.context.sendActivity(messageText);
            return await stepContext.next();
        }
        if(stepContext.context.activity.from.name ==='You'|| stepContext.context.activity.from.name ===''){
            /*const messageText = stepContext.options.restartMsg ? stepContext.options.restartMsg : 'Can you please tell me your name ?';
            const promptMessage = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
            return await stepContext.prompt('TextPrompt', { prompt: promptMessage });*/
            
            const welcomeCard = CardFactory.adaptiveCard(WelcomeCard);                    
            await stepContext.context.sendActivity({ attachments: [welcomeCard] });
            const promptMessage = MessageFactory.text('', '', InputHints.ExpectingInput);
            return await stepContext.prompt('TextPrompt', { prompt: promptMessage });
            
        } else {
            return await stepContext.next();
        }
    }
    async stepOne(stepContext) {
        console.log(stepContext.context.activity.value.username);
        console.log(stepContext.context.activity.text);
        const username = stepContext.context.activity.value.username;
        const messageText = stepContext.options.restartMsg ? stepContext.options.restartMsg : `How can I help you ${username} ?`;
        const promptMessage = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
        return await stepContext.prompt('TextPrompt', { prompt: promptMessage });
    }
```  

Finally, let's save Conversation & User States.
    
We need first to import libraries and to initialize the memory storage & conversation state in the index.js file

``` javascript

const { BotFrameworkAdapter, MemoryStorage, ConversationState, UserState } = require('botbuilder');
const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);

    ```
 We need to pass all these variables to the bot constructor

``` javascript

const myBot = new EchoBot(conversationState, userState); 

``` 
    
We pass these variables to the code in bot.js 

``` javascript

constructor(conversationState, userState) {
super();
if (!conversationState) throw new Error('[DialogBot]: Missing parameter. conversationState is required');
if (!userState) throw new Error('[DialogBot]: Missing parameter. userState is required');
this.conversationState = conversationState;
this.userState = userState;
this.dialogState = this.conversationState.createProperty('DialogState'); 

``` 
  
Finally we override the ActivityHandler.run() method to save state changes after the bot logic completes.
   
``` javascript
async run(context) {
    await super.run(context);
    // Save any state changes. The load happened during the execution of the Dialog.
    await this.conversationState.saveChanges(context, false);
    await this.userState.saveChanges(context, false);
}
```