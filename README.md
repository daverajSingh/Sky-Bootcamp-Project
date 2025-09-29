# Sky Bootcamp Project
Sky Graduate Bootcamp Project - Team (Name TBD)

## How to run the project

### Frontend

1. Firstly, ```cd frontend``` to be within the react project directory.
2. Then type ```npm install``` in your terminal. This will install any libraries and plugins required to run the react project.
3. Finally, type ```npm run dev``` to run the project. In the terminal, you will receive a url that will show the local running instance of the project.

### Backend

1. Firstly, ```cd backend``` to be within the react project directory.
2. Then type ```pip3 install -r requirements.txt``` in your terminal. This will install any libraries and plugins required to run the react project.
3. Finally, type ```python3 app.py``` to run the project. In the terminal, you will receive a url that will show the local running instance of the project.
4. NB - Make sure to have the .env file in backend directory to ensure correct login details for the mysql database - WILL NOT WORK OTHERWISE

# Git Conventions

For this project, I thought it would be useful to outline a set of conventions to use for commit and pull request messages. Here is the outline:

```[TYPE]<optional scope> : [description]```

Here are the possible types:

```FIX``` : This should be used when a commit fixes a bug in the codebase.  
```CREATE```: This should be used when a commit introduces a new feature to the codebase.   
```REFACTOR```: This should be used when a commit changes the file structure of the codebase.   
```CHORE```: This should be used when a commit is a grunt task - changing implementation or configuration of the codebase without changing functionality.  

Example message:

```CREATE<project>: made react app, added routing and file structure```

NB: Don't use the ```TYPE``` in the description, for example ```CREATE: created ...```. 

## Why?

- Makes reviewing pull requests easier, as we will be able to see what has changed in each commit and in the final pull request
- Ensures that commit messages are uniform and makes it easy to figure out what has changed between commits.
