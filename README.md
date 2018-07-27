# express-mongo-seed
This project is a  production ready skeleton for building nodejs REST Api services backed by mongodb.

### How to run project
for windows platform **run.bat** in powershell
for linux **sh run.sh**

### mongo connection
Configure the mongo connection inside **util/config.js** file.On production use **pm2** process manager. Use **process.json** as **pm2**  options. Append your mongo credentials inside **process.json** and read from **process.env** variable.

This seed project is configured to run on nodemon as well as pm2 environment. On development use nodemon.
The project is organized in a mini MVC architecture. Since it is intented to use for REST  api purpose view engine support is not included. For authoriz
