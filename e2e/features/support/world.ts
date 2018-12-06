import {setDefaultTimeout, setWorldConstructor} from 'cucumber';

function CustomWorld({attach}) {
    setDefaultTimeout(90 * 1000);

    this.attach = attach;
}

setWorldConstructor(CustomWorld);