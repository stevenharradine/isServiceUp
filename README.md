# Service Watch
A simple script to read if a service is up or down and notify you when the service is up

## clone the repo
```
git clone https://github.com/stevenharradine/service-watch.git
cd service-watch
```

## install node dependancies
```
npm install
```

## set up your config file to send emails and or slack
```
module.exports.EMAIL_USER     = 'youremail';
module.exports.EMAIL_PASSWORD = 'yourpassword';

module.exports.EMAIL_PASSWORD = 'TOKEN/TOKEN/TOKEN';
```

## copy or symlink parsers parsers-enabled
```
cd parsers-enabled
ln -s ../parsers-available/github.js ./
cd ..
```

## run the program selecting which service to check
```
node service-watch {{ alert_type }} [{{ alert_list }}]
```
Example
```
node service-watch email first@email.com second@email.com third@email.com
node service-watch slack "#channel1" @person1 "#channel2" @person2
```
