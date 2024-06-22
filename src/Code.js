import { createNanoEvents } from '/node_modules/nanoevents/index.js';

// class MyEmitter extends EventEmitter {}

// const myEmitter = new MyEmitter();
// myEmitter.on('event', () => {
//   console.log('an event occurred!');
// });
// myEmitter.emit('event');



export class Code {

    static get #_eventName() { return "valueChanged" }

    /**
     * @type {Array<number>}
     */
    #_value;
    #_eventEmitter;

    get value() { return Array.from(this.#_value); }
    get length() { return this.#_value.length; }

    constructor(length) {
        this.#_value = new Array(length);
        this.#_value.fill(-1);
        this.#_eventEmitter = createNanoEvents();
    }

    setDigit(index, value)
    {
        this.#_value[index] = value;
        this.#_eventEmitter.emit(Code.#_eventName);

    }

    getDigit(index)
    {
        return this.#_value[index];
    }

    registerValueChangedCallback(callback)
    {
        this.#_eventEmitter.on(Code.#_eventName, callback);
    }

    contains(digit)
    {
        return this.#_value.includes(digit);
    }
}