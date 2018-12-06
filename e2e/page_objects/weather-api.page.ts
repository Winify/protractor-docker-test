import { $, browser, by, element, ElementFinder, Key } from 'protractor';

export class WeatherApiPage {
    private cityInput: ElementFinder;
    private submitBtn: ElementFinder;

    static get(): WeatherApiPage {
        browser.get('/');

        return new WeatherApiPage();
    }

    constructor() {
        this.cityInput = element(by.name('city'));
        this.submitBtn = $('[type="submit"]');
    }

    async getWeather(city: string): Promise<void> {
        await this.cityInput.sendKeys(city, Key.ENTER);
    }
}
