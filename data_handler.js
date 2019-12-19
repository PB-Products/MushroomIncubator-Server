const con = require('./db');

var writeData = (data) => {
    var sql = "INSERT INTO Sensor_Data(Temperature, Humidity, SoilMoisture, Light) VALUES("+data.temp+", "+data.hum+", "+data.soil+", "+data.light+")";
    con.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
    });
}

module.exports = writeData;