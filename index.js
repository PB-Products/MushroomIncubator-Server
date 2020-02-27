const keys = require('./keys');
var mqtt = require('mqtt');
var con = require('./db');
var writeData = require('./data_handler');
var sms = require('./send_sms');

var options = keys.options;
const client = mqtt.connect('mqtt://soldier.cloudmqtt.com', options);

con.connect((err) => {
    if (err) throw err;
    console.log("Database connected");
});

client.on('connect', () => {
    console.log("Connected...");
    client.subscribe('Data');
});

client.on('message', (topic, message) => {
    if (topic === 'Data') {
        //console.log(JSON.parse(message.toString()));
        //var data = JSON.parse(message.toString());
        //writeData(data);
        if (message.toString() !== "Data not received") {
            var data = message.toString().split(':-')[1].split(',');

            console.log(data)

            var map = {
                temp: data[0],
                hum: data[1],
                light: data[2],
                soil: data[3]
            }

            console.log(map);

            try {
                writeData(map);
                sms.validateSms(map);
            } catch (err) {
                console.log(err);
            }

        }
    }
})
