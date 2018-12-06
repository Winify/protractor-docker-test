const tsNode = require('ts-node');
const path = require('path');
const os = require('os');

exports.config = {
    baseUrl: `http://172.25.1.129:3000`,

    specs: ['e2e/**/*.feature'],

    seleniumAddress: 'https://selenium-docker.apertus.uni-nke.hu/wd/hub',
    directConnect: false,

    multiCapabilities: [
        {
            name: 'protractor-docker-test',
            browserName: 'chrome',

            metadata: {
                device: 'selenium-docker',
                platform: {
                    name: os.platform().includes('win') ? 'Windows' : 'Linux',
                    version: os.release()
                }
            }
        }
    ],

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    ignoreUncaughtException: true,

    cucumberOpts: {
        format: 'json:target/reports/results.json',
        require: [path.resolve(process.cwd(), './e2e/**/*.ts')],
        strict: true
    },

    plugins: [
        {
            package: 'protractor-multiple-cucumber-html-reporter-plugin',
            options: {
                pageTitle: 'Weather API Docker Test',
                reportName: 'Protractor Docker Test',
                automaticallyGenerateReport: true,
                removeExistingJsonReportFile: true,

                customData: {
                    title: 'Run Information',
                    data: [
                        { label: 'Project', value: 'Protractor Docker Test' },
                        { label: 'Release', value: '1.0.0' },
                        { label: 'Execution Time', value: new Date().toLocaleString() }
                    ]
                },

                displayDuration: true
            }
        }
    ],

    beforeLaunch() {
        tsNode.register({
            project: path.join(__dirname, './tsconfig.e2e.json')
        });
    },

    onPrepare() {
        browser.waitForAngularEnabled(false);
        browser
            .manage()
            .window()
            .maximize();
    },

    onComplete() {
        browser.sleep(5000);
    }
};
