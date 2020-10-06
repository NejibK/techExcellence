// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

//const { ActivityHandler, MessageFactory } = require('botbuilder');
const { ActivityHandler, MessageFactory, CardFactory } = require('botbuilder');
const WelcomeCard = require('./bots/resources/cards/welcomeCard.json');

class EchoBot extends ActivityHandler {
    constructor(luisRecognizer) {
        super();
        this.recognizer = luisRecognizer;
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            //console.log(context.activity);
            var recognizerResults = await this.recognizer.recognize(context);
            console.log(recognizerResults);
            let replyText;
            //if(context.activity.text === 'Hello'){
            if(recognizerResults.luisResult.prediction.topIntent === 'greetings'){
                //replyText = 'Hello there ! Bots have not emotions but I am happy when someone greets me';
                replyText = `Hello ${ context.activity.from.name } ! Bots have no emotions but I am happy when someone greets me`;
            } else if(context.activity.value && context.activity.value['username']!==""){
                replyText = `Hey ${ context.activity.value['username'] } ! It is great talking to you ;) `;
            } else {
                replyText = `Echo: ${ context.activity.text }`;
            }
            await context.sendActivity(MessageFactory.text(replyText, replyText));
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Hello and welcome!';
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    /*await context.sendActivity('Hello and welcome to the BMW Technical Excellence Day!');
					await context.sendActivity('My name is: ' + context.activity.membersAdded[0].name);
					await context.sendActivity('I am an echo bot!');
					await context.sendActivity('You are user number:' + cnt);
					await context.sendActivity('Your id is:' + context.activity.membersAdded[cnt].id);
					await context.sendActivity('Please say something to test me.');
                    console.log(context.activity.membersAdded);*/
                    const welcomeCard = CardFactory.adaptiveCard(WelcomeCard);                    
                    await context.sendActivity({ attachments: [welcomeCard] });
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;
