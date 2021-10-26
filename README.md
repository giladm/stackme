# Get Stackoverflow Post 

### Get questions answered by a Stackoverflow user
#### Screens / Componenets 
- MainSceen - controls user input flow
- ThemedButton - controls dark or light mode
- StackUserInput - provides an input text to enter StackOverflow's user-id
 - MainStackView - Once the user id is entered the app pulls the data using REST API, shows the user details and the questions answered
 - SortQuestionsInput - User options to sort the questions
 - WebViewModal - View the selected question when a user makes a selection 
 -   



#### Other files  
- AppStateContext - Application State Context 
- AppStateLogic - Manage App State such as themes (dark or light mode, sort selection etc.)
- StackJsonInterface - Interface between JSON response and Typescript data structure
- WebServiceCall - handles rest api calls
