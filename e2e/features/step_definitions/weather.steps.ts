import {Given, Then, When} from "cucumber";
import {expect} from "../support/expect";
import {$} from "protractor";
import {WeatherApiPage} from "../../page_objects/weather-api.page";

let weather: WeatherApiPage;
let query: string;

Given(/^az alkalmazás oldalán állok$/, function () {
    return weather = WeatherApiPage.get();
});

When(/^lekérdezem (.*) időjárását$/, function (city) {
    return weather.getWeather(city);
});

Then(/^látni fogom az aktuálisat$/, function () {
    return expect($('p').getText()).not.to.eventually.contain(query);
});