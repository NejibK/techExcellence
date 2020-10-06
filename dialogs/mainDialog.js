const { MessageFactory, CardFactory, InputHints } = require('botbuilder');
const { ComponentDialog, DialogSet, DialogTurnStatus, TextPrompt, ChoicePrompt, WaterfallDialog } = require('botbuilder-dialogs');
const WelcomeCard = require('../bots/resources/cards/welcomeCard.json');

const MAIN_WATERFALL_DIALOG = 'mainWaterfallDialog';

class MainDialog extends ComponentDialog {
	constructor(luisRecognizer) {
		super('MainDialog');
		
		if (!luisRecognizer) throw new Error('[MainDialog]: Missing parameter \'luisRecognizer\' is required');
        this.luisRecognizer = luisRecognizer;
        
        this.choicePrompt = new ChoicePrompt('ChoicePrompt');
        this.choicePrompt.style = 4;
		
		this.addDialog(new TextPrompt('TextPrompt'))
            .addDialog(this.choicePrompt)
            .addDialog(new WaterfallDialog(MAIN_WATERFALL_DIALOG, [
                this.stepZero.bind(this)
                , this.stepOne.bind(this)
                , this.stepTwo.bind(this)
                , this.stepThree.bind(this)
            ]));

        this.initialDialogId = MAIN_WATERFALL_DIALOG
	}
	
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
        
        const activity = dialogContext.context.activity;
        if (!activity.text && activity.value) {
            activity.text = JSON.stringify(activity.value);
            };
        const results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }
    
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
    async stepTwo(stepContext) {
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
        async stepThree(stepContext) {
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
        }
module.exports.MainDialog = MainDialog;