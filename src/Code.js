import { createNanoEvents } from '/node_modules/nanoevents/index.js';

export class Code
{
    static get #_eventName() { return "valueChanged" }

    /** @type {Array<number>} */
    #_value;

    #_eventEmitter;

    /** @returns {number} The length of the code */
    get length() { return this.#_value.length; }

    constructor(length) {
        this.#_value = new Array(length);
        this.#_value.fill(-1);
        this.#_eventEmitter = createNanoEvents();
    }

    /**
     * @param {number} index 
     * @param {number} value 
     */
    setDigit(index, value)
    {
        this.#_value[index] = value;
        this.#_eventEmitter.emit(Code.#_eventName);
    }

    /**
     * @param {number} index 
     * @returns {number}
     */
    getDigit(index)
    {
        return this.#_value[index];
    }

    registerValueChangedCallback(callback)
    {
        this.#_eventEmitter.on(Code.#_eventName, callback);
    }

    /**
     * @param {number} digit 
     * @returns {boolean} true if the code contains digit, false otherwise
     */
    contains(digit)
    {
        return this.#_value.includes(digit);
    }
}