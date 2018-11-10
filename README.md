# node-js-docker
# About  
This is Node.js based server with React in front-end and MongoDb database. Also this project has docker-compose.yml and Dockerfile-s that allows to bring it to Docker containers. All componetns (Node.js server, React static files and MongoDb database) will has their own Docker container after we launch **docker-compose up** command in cmd. Detailed instructions see below.
# Prerequests  
1. Docker installed on your OS
# Get started
1. create folder
2. open cmd in this folder (this will be the root of our project)
3. type **git clone https://github.com/YaroslavGrushko/node-js-docker.git .**
3. type **docker-compose build**
4. type **docker images -a** to see images that has been generated
5. type **docker-compose up**
6. That's all :) Go to browser in **http://localhost:8080** and test this application
