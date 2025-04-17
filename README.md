Welcome to the Lord of the Rings, Mini-Games site! This is a typescript react app created using vite. Inside this site, you will find a Lord fo the Rings themed hangman game, a riddles game with gollum, a LOTR math cipher game, as well as a character search and details page. The character search and details pages are powered by the free Lord of the Rings api which you can read about here https://the-one-api.dev/. Once a specific character is searched, their details will be cached making searching them again a speedy and seamless experience for the user.

To run the project, navigate to the root directory in an environment where you have node installed. Create a .env file and declare this variable.

VITE_LOTR_API_BEARER_TOKEN={a_valid_lotr_api_bearer_token}

I will provide one to you in my project submission. The API is free to use, but they require a bearer token for certain routes on the API that the characterinformation pages require. In the root directory you are ready to run these commands:
1. npm install
2. npm run dev

The LOTR API calls are made using the Fetch and Promise API's built into javascript. Data is then stored in a charactersdatacontext object that is accessed within a charactersdataprovider context component. A custom CharactersDataContextHook was created to access the context object within 2 different components that utilized it (CharacterInfoHome & CharacterInfo). Local storage is used to cache information about specific characters that are selected from the CharacterInfoHome search area. While away from the home route, breadcrumbs are displayed in the top left of the screen for an easy navigation experience. These are moved to the bottom of the screen when viewing on a narrow device screen.