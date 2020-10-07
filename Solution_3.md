# Change new message logic

Let's change the echo logic triggered when the bot receives a message:

``` javascript
this.onMessage(async (context, next) => {
    if (context.activity.text === "Hi"){
        // context.activity contains the text sent by the user.
        // In our case, since we are using the webchat channel in the Azure portal for testing, the name given to the user is always: 'You'
        // In other cases, when using channels like facebook messenger or skype, the username is retrieved (if the api of the channel sends it of course).
        await context.sendActivity(`Hello ${ context.activity.from.name }`);
    }else{
        await context.sendActivity(`You said '${ context.activity.text }'`);
    }
```