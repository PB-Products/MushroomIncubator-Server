const https = require('https');

const keys = require('./keys');

const accountSid = keys.twilio.accountSid;
const authToken = keys.twilio.authToken;

const client = require('twilio')(accountSid, authToken);


function sendSms(alertMessage, sensor, value) {

    var msg = createMessage(alertMessage, sensor, value);
    console.log(alertMessage);
    
    client.messages
        .create({
            body: msg,
            from: '+12058283422',
            to: '+94775808225'
        })
        .then(message => console.log(message.sid));
}

function validateSms(map) {
    if (map.temp > 40) {
        sendSms("High Temperature", "Temperature", map.temp);
    }

    if (map.hum > 50) {
        sendSms("High Humidity", "Humidity", map.hum);
    }

    if (map.soil > 100) {
        sendSms("Low Soil Moisture", "Soil Moisture", map.soil);
    }

    if (map.light > 60) {
        sendSms("Bad light condition", "Light Intensity", map.light);
    }
}

function createMessage(alertMessage, sensor, value) {
    var msg = "Alert - " + alertMessage + " " + sensor + " - " + value;
    return msg;
}

module.exports.validateSms = validateSms;