# Create an echo bot
## I. Create Ressource needed

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
   4. Location: West Europe
   5. Pricing F0 (10K first messages are free)
   6. Appname is automatically defined (not to be changed)
   7. Bot template:
      1. SDK Language: Node.JS
      2. Template: Echo Bot
   9.  Application Insights: Off
   10. Create App Service Plan
   11. Leave Microsoft App Id and Password on auto create.
3. App Service & Web App Bot will be created in your newly created Ressource Group.
   This could take up to 5 minutes.
4. Once the process finished, open your Resource Group.
5. Open the App Service & the Web App Bot in two seperate browser tabs.

## II. Web App bot

1.	In the Overview you can check your resource group, your subscription, your pricing tier and the messaging endpoint.
2.	Before we look into the code, let's test this echo bot: Test in Web Chat (you might need to zoom out "Ctrl -" )
3. Use this window to test your bot after every change in the code (next step)
   1. For that just click "Start Over" (refresh icon)
   2. A new conversation with the latest version of your code will be triggered
4. Now let's check our code. There are two possibilities:
   1. In the Web App bot: Go to the build menu and "Open online code editor" (link in the last line when you open the Build menu)
   2. In the app service: Scroll left menu until "App Service Editor (Preview)" and click "Go ->"

## III. App Service
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