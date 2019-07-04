const Station = require('./modules/Station');
const https = require('https');
const events = require('events');
const request = require('request');

var emitter = new events.EventEmitter();
var cron = require('node-cron');

const url1 = 'https://www.aismagellan.io/api/things/pull/f15819e0-f0e5-11e8-a028-9771a15972bf';
const url2 = 'https://www.aismagellan.io/api/things/pull/0afa72d0-f0e6-11e8-a028-9771a15972bf';
const url3 = 'https://www.aismagellan.io/api/things/pull/0f7c5170-f0e6-11e8-a028-9771a15972bf';

cron.schedule('*/30 * * * * *', function () {
    //Get body from url1
    https.get(url1, res => {
        res.setEncoding('utf8');
        body = '';
        res.on('data', data => {
            body += data;
        });
        res.on('end', () => {
            body = JSON.parse(body);
            body.date = Date.now();
            global.jsonBody = new Station(body);
            emitter.emit('url1Ready');
        });
    });
});

cron.schedule('*/30 * * * * *', function () {
    //Get body from url2
    https.get(url2, res => {
        res.setEncoding('utf8');
        body = '';
        res.on('data', data => {
            body += data;
        });
        res.on('end', () => {
            body = JSON.parse(body);
            body.date = Date.now();
            global.jsonBody = new Station(body);
            emitter.emit('url2Ready');
        });
    });
});

cron.schedule('*/30 * * * * *', function () {
    //Get body from url3
    https.get(url3, res => {
        res.setEncoding('utf8');
        body = '';
        res.on('data', data => {
            body += data;
        });
        res.on('end', () => {
            body = JSON.parse(body);
            body.date = Date.now();
            global.jsonBody = new Station(body);
            emitter.emit('url3Ready');
        });
    });
});

//Save to DB
emitter.on('url1Ready', (newBody) => {

    newBody = jsonBody;
    newBody.date = Date.now();
    console.log(newBody);

    request('http://202.44.12.165/api/' + newBody.stationId + '/qW0dwEYTN9zrX9Gr0hC7qgmjj4YaBIvT/' + body.tempValue + '/' + body.co2Value + '/' + body.humidValue + '/' + body.dustValue, (err) => {
        if (err) { return console.log(err); }
        console.log(`Station ${newBody.stationId} has been saved to MySQL!`);
    });
    request('https://api.thingspeak.com/update?api_key=JVC2YONU82R0A43D&field1=' + body.tempValue + '&field2=' + body.co2Value + '&field3=' + body.humidValue + '&field4=' + body.dustValue, (err) => {
        if (err) { return console.log(err); }
        console.log(`Station ${newBody.stationId} has been saved to Thingspeak!`);
    });
    request('https://api.thingspeak.com/update?api_key=YLZQHMC0SCK8PBY2&field1=' + body.tempValue + '&field2=' + body.humidValue + '&field3=' + body.co2Value + '&field4=' + body.dustValue, (err) => {
        if (err) { return console.log(err); }
        console.log(`Station ${newBody.stationId} has been saved by KGEO to Thingspeak!`);
    });

});

emitter.on('url2Ready', (newBody) => {

    newBody = jsonBody;
    newBody.date = Date.now();
    console.log(newBody);

    request('http://202.44.12.165/api/' + newBody.stationId + '/qW0dwEYTN9zrX9Gr0hC7qgmjj4YaBIvT/' + body.tempValue + '/' + body.co2Value + '/' + body.humidValue + '/' + body.dustValue, (err) => {
        if (err) { return console.log(err); }
        console.log(`Station ${newBody.stationId} has been saved to MySQL!`);
    });
    request('http://www.innosoft.kmutt.ac.th/icoccac/api.php?location=3&pm1=0&pm25=' + body.dustValue + '&pm10=0&temp=' + body.tempValue + '&humi=' + body.humidValue, (err) => {
        if (err) { return console.log(err); }
        console.log(`Station ${newBody.stationId} has been saved to innosoft!`);
    });

});

emitter.on('url3Ready', (newBody) => {

    newBody = jsonBody;
    newBody.date = Date.now();
    console.log(newBody);

    request('http://202.44.12.165/api/' + newBody.stationId + '/qW0dwEYTN9zrX9Gr0hC7qgmjj4YaBIvT/' + body.tempValue + '/' + body.co2Value + '/' + body.humidValue + '/' + body.dustValue, (err) => {
        if (err) { return console.log(err); }
        console.log(`Station ${newBody.stationId} has been saved to MySQL!`);
    });

});
