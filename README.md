# isServiceUp
A simple script to read if a service is up or down and notify you when the service is up

## clone the repo
```
git clone https://github.com/stevenharradine/isServiceUp.git
cd isServiceUp
```

## install node dependancies
```
npm install
```

## set up your config file to send emails and who to notify
```
module.exports.EMAIL_USER     = 'youremail';
module.exports.EMAIL_PASSWORD = 'yourpassword';
```

## run the program selecting which service to check
```
node isServiceUp {{ parser_name }} {{ alert_type }} [{{ alert_list }}]
```
Example
```
node isServiceUp github email first@email.com second@email.com third@email.com
node isServiceUp github slack "#channel1" @person1 "#channel2" @person2
```
