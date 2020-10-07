# Change new user greeting

Let's change the welcome text when a new user joins the conversation:
    
```javascript
if (membersAdded[cnt].id !== context.activity.recipient.id) {
    //////////////////////////////
    // Explore your context
    //console.log(context);
    //console.log(context.activity);
    //console.log(context.activity.membersAdded);
    //////////////////////////////
    await context.sendActivity('Hello and welcome to the BMW Technical Excellence Day!');
    await context.sendActivity('My name is: ' + context.activity.membersAdded[0].name);
    await context.sendActivity('I am an echo bot!');
    await context.sendActivity('You are user number:' + cnt);
    await context.sendActivity('Your id is:' + context.activity.membersAdded[cnt].id);
    await context.sendActivity('Please say something to test me.');
}
```