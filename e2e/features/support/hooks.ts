import { After, Before, HookScenarioResult, Status } from 'cucumber';
import { browser, promise } from 'protractor';

Before(function(): promise.Promise<void> {
    return browser.manage().deleteAllCookies();
});

After(function(scenario: HookScenarioResult): promise.Promise<void> {
    if (scenario.result.status === Status.FAILED) {
        return browser.takeScreenshot().then(screenShot => {
            this.attach(screenShot, 'image/png');
            browser.getCurrentUrl().then(url => this.attach(url));
        });
    }
});
