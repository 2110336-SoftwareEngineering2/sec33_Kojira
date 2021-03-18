# Initialize the application

###### 1. clone the repository

 `git clone https://github.com/2110336-SoftwareEngineering2/sec33_Kojira.git`

###### 2. install dependencies in both client and server app

download npm first here https://nodejs.org/en/download/ or yarn here https://nodejs.org/en/download/classic.yarnpkg.com/en/docs/install/#windows-stable

###### client app

- `cd nontclient`

- `npm install` or `yarn install`

###### server app

- `cd nontserver`
- `npm install` or `yarn install`

###### 3. run the application

- run client

  - `cd nontclient`

  - `npm start` or `yarn start`

    the client will be running on port 3000 (localhost:3000)

- run server

  - `cd nontserver`

  - `npm start` or `yarn start`

    the server will be running on port 5000 (localhost:5000)

# Deployment

##### Both client and server is now deployed on heroku account :

heroku account : 

​	email : nontkojira@gmail.com

​	password : Kojira@33isaNont

email password :

​	email : nontkojira@gmail.com

​	password : KojiraisaNont

client URL : https://nontclient.herokuapp.com

server URL : https://nontserver.herokuapp.com

# !! Changes after the deployment

1. Heroku does not allow the deployment of a project with both `npm`and `yarn`log files , so I deleted `package-log.json` (yes, I choose `yarn` over `npm` ) files in both client and server, **so from now on, only use yarn**
2. Heroku deployment of React application requires the use of library serve in the start scripts. As seen from the picture below, the client development scripts is now ***<u>changed</u>*** from `yarn start` to `yarn dev` , while the server's development script is still the same.

3. The further deployment needs to be done using `yarn deploy` of which I have already written the scripts. The deployment needs to be done separately on the client and server

   eg. on client

   `cd nontclient`

   `yarn deploy`

4. **`serverURL` constant is now set to the deployed cloud server's URL**, so if you want to test in development mode, the constant needed to be changed, which I also provide both options, local and cloud, in the file, and <u>be sure to set it back before pushing the code</u>.

5. IP address used for QR code payment is now deleted and QR code <u>doesn't need to be individually set</u> anymore.

![image-20210318220558824](C:\Users\ADMIN\AppData\Roaming\Typora\typora-user-images\image-20210318220558824.png)