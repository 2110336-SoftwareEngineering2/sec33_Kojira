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

client heroku git url : https://git.heroku.com/nontclient.git

server URL : https://nontserver.herokuapp.com

server heroku git url : https://git.heroku.com/nontserver.git

# Todo for everyone

Everyone needs to add the client and server heroku git url as their remote repository and set the name of the remote repository to nontclient and nontserver respectively.

1. download the heroku cli [here](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
2. login in the cli using `heroku login` , probably adding it to environmental path first.., using kojira heroku account email and password provided above.
3. add the remote client and server via

`git remote add nontclient https://git.heroku.com/nontclient.git`

`git remote add nontserver https://git.heroku.com/nontserver.git`

4. check if the remote is there using

   `git remote --verbose`

   it should show like this :

   ![image1](https://github.com/2110336-SoftwareEngineering2/sec33_Kojira/blob/main/images/image-1.png?raw=true)

# !! Changes after the deployment

1. Heroku does not allow the deployment of a project with both `npm`and `yarn`log files , so I deleted `package-log.json` (yes, I choose `yarn` over `npm` ) files in both client and server, **so from now on, only use yarn**
2. Heroku deployment of React application requires the use of library serve in the start scripts. As seen from the picture below, the client development scripts is now ***<u>changed</u>*** from `yarn start` to `yarn dev` , while the server's development script is still the same.

3. The further deployment needs to be done using `yarn deploy` of which I have already written the scripts. The deployment needs to be done separately on the client and server

   eg. on client

   `cd nontclient`

   `yarn deploy`

4. **`serverURL` constant is now set to the deployed cloud server's URL**, so if you want to test in development mode, the constant needed to be changed, which I also provide both options, local and cloud, in the file, and <u>be sure to set it back before pushing the code</u>.

5. IP address used for QR code payment is now deleted and QR code <u>doesn't need to be individually set</u> anymore.

6. remove the use of home component, after logging in, go to dashboard

![image2](https://github.com/2110336-SoftwareEngineering2/sec33_Kojira/blob/main/images/image-2.png?raw=true)

*P.S. The response time of the website decreases after the deployment, emphasizing the importance of the Loading component !!*

P.S.2 เวลา deploy แล้วมี error -> ให้ใช้ command 

`heroku logs --remote nontclient --tail` สำหรับ nontclient

`heroku logs --remote nontserver --tail` สำหรับ nontserver