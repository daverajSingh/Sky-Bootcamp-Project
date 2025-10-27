# Sky Bootcamp Project
Sky Graduate Bootcamp Project - Team (Name TBD)

## How to run the project

### Frontend

1. Firstly, ```cd frontend``` to be within the react project directory.
2. Then type ```npm install``` in your terminal. This will install any libraries and plugins required to run the react project.
3. Then type ```npm run serve:json```. This will serve the json files using json-server. In the terminal you'll receive the end points for the different routes. 
4. Finally, in new terminal instance type ```npm run dev``` to run the project. In the terminal, you will receive a url that will show the local running instance of the project.
5. Add a .env file in the same directory as vite.config.js and keep this environment variable `VITE_API_BASE_URL=<BACKEND_API_BASE_URL>`. For example `VITE_API_BASE_URL=http://example.com:XXXX`

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

# Branches

use the following convention to ensure consistency: '''NAME-work-being-done'''

# Code Coverage Report

## Backend

From the project root run the below commands, make sure the virtual environment is activated and you have the dependencies installed
`cd backend`
`export PYTHONPATH=.`
`pytest --cov=application`

## Frontend

From the project root run the below commands, make sure you have all the dependencies installed
`cd frontend`
`npm run test:coverage`

# ENVIRONMENT VARIABLES

There are sample .env files in the frontend and backend folders named `env_sample`

Use the correct values, the .env file in backend will be used for connecting with your SQL database and the .env file in the frontend will be used to provide the backend url to make the requests. 

