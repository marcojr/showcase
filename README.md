This is just a dummy project for people with intentions to hire my services.

It's basically a demonstration of my source code on the following contexts

- Node: Code using NodeJS with MongoDB and Amazon AWS API
- Ionic: Code using Ionic 3 and Angular 5 containing: Consume of the APIs using RsJx,
         my interface Skills, my attention on details, and my programing logic

For now, only the following user stories are done:

- As an user, I'd like to register myself
    - {FE} Fill the form fields
    - {FE} Use camera or album to choose a profile picture
    - {BE} Check if the username has already been taken
    - {BE} Check if the email is already in use
    - {BE} Check if the mobile is already in use
    - {BE} Send a SMS text message to FE containing a code before proceed
    - {BE} Store the user's picture on the Amazon AWS S3 Bucket
- As an user, I'd like to login on the app
    - {FE} Place fields on the welcome page
    - {FE} Call Login endpoint
    - {FE} Store User Login Information on the local storage
    - {FE} Skip the Welcome/Login Page and perform a auto-login on the app
           if the app found login information stored locally
    - {BE} Endpoint for Login and store a session token
- As an user, I'd like to logout from the app
    - {FE} Place a logout button
    - {FE} Call logout endpoint
    - {FE} Go back to the Welcome/Login screen
    - {FE} Clear Local storage data
    - {BE} Endpoint for logout and clear session

...But it's enough to evaluate me indeed. I will create more features everytime I've a chance.

How to lift this project.

First, ensure you have all of this installed:

- Ionic 3 with ionic client at least 3.19.1
- NodeJS , minimum version: 9.8.0
- MongoDB version ﻿3.6.3
- Xcode and or/Android SDk if you wish to run it in your mobile device

After clone the project, inside the node folder:

- Rename config-sample.json to config.json
- Set parameters keys for AWS (this requires a S3 amazon service)
- (*) Set parameters for Nexmo SMS provider

(*) = By default, the application is not contacting nexmo and it's sending the
      static code of 9999. If you really wish to test using real SMS texts,
      this requires a nexmo account, you can create a trial one and you must
      uncomment the file routes/registtration.sj - exports.sendSMS function

Inside the node folder, do the following:

- type: npm install (sudo could be necessary)
- type: node ./tools/init_db
- type: gulp (this will run the serve application)

And inside the ionic folder, just launch it by typing: ionic serve --lab

If you wish to run it in your android device or emulator, do the following:

- type: ionic cordova platform add android
        ionic cordova prepare android
        ionic cordova run android (if you have your android device attached and with the
                                   developers options enable, this will launch in your
                                   device, otherwise: this will open the Android Emulator)

For iOS (Requires a Mac computer):
- type: ionic cordova platform add ios
        ionic cordova prepare ios
        open the folder ./platforms/ios using Finder
        double click on The Simpsons.xcodeproj
        execute the project on the Xcode