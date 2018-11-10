# expressReact
This is **Node.js (Express)** server with front-end (**React**) and Database (**MongoDb** via **Mongoose**).
# expressReact structure  

1. (10) this app is based on **Node.js**;  
2. (1) the app uses **Express** server;  
3. (2) uses **nconf** npm module for config functionality; (expressReact/config) 
4. (5) the app uses module stracture;  
5. (11) as template engine we use **React** (front end);  
6. (6) content processing module (expressReact/static_content_processing.js);  
7. (4) this app doesn't have multithreading but it has asynchronous function via **async** npm module (used in expressReact/createDb.js and expressReact/Db/getPlaces.js module to work with database data);  
8. (3) expressReact uses **winston** npm module for logging purpose (expressReact/libs/log.js);    
9. we use **MongoDb** as DBMS and **mongoose** npm module (for ease of use);  

# Get started


1. This app uses MongoDb, so you need to insatall MongoDb;  
2. This app uses Node.js, so you need to install it as well;  
3. Download this project using **git clone https://github.com/YaroslavGrushko/expressReact.git** command in your cmd (for Windows). Or simply download project zip from download button and unzip it;  
4. Go to root directory of expressReact project via cmd (for Windows) and type **npm install** (npm will install all dependencies for back-end (node.js {Express}) part);  
5. Go to client directory and also type **npm install** (npm will install all dependencies for front-end (React) part);  
6. Now let's create database, to do this go to root directory of expressReact and type **npm createDb** in cmd;
7. Now let's run this app, type in cmd  **npm run dev**;   
also if you want to run server and client separately, you can type:    
  **npm run start** - this just run server (Express) part of app;  
  **npm run server** - this run server (Express) part of app in nodemon mode;  
  **npm run client** - this run client (React) part of app;  
  
  
  
