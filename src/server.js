const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const apiKey = '0af3d632d12222a495f78c2a821104c6';
const app = express();

app.use(express.static(process.cwd() + '/src/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', process.cwd() + '/src/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index', { weather: null, error: null });
});

app.post('/', function(req, res) {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&units=metric&appid=${apiKey}`;

    request(url, function(err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Some error occured during the request, please try again.' });
        } else {
            let weather = JSON.parse(body);
            if (weather.main === undefined) {
                res.render('index', { weather: null, error: 'Non-existent City, please try again.' });
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name} with a ${
                    weather.weather[0].description
                }.`;
                res.render('index', { weather: weatherText, error: null });
            }
        }
    });
});

app.listen(process.env.npm_package_config_port, function() {
    console.log(`Example app listening on port ${process.env.npm_package_config_port}!`);
});
