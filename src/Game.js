import { Application, Text, Graphics } from '/node_modules/pixi.js/dist/pixi.min.mjs';
import { GameRenderer } from "./GameRenderer.js";
import { CodeRenderer } from './CodeRenderer.js';
import { Code } from './Code.js';

export class Game
{
    /** @type {Application} */
    #_application;

    /** @type {GameRenderer} */
    #_gameRenderer;

    /** @type {number} */
    #_timeSinceStartup;

    /**
     * @param {HTMLElement} rendererContainer
     */
    constructor(rendererContainer)
    {
        this.#_application = new Application();
        this.#_gameRenderer = new GameRenderer(this.#_application, rendererContainer);
        this.#_timeSinceStartup = 0;
    }

    async init()
    {
        await this.#_application.init({ antialias: true, background: '#ffffff' });

        this.#_gameRenderer.init();
        
        const code = Code.from([-1, -1, -1, -1]);
        const codeRenderer = new CodeRenderer(code, 20, this.#_gameRenderer.width * 0.5);
        codeRenderer.x = this.#_gameRenderer.width * 0.5;
        codeRenderer.y = 100;
        this.#_gameRenderer.add(codeRenderer);

        // Main update loop
        this.#_application.ticker.add((ticker) => {
            codeRenderer.update(ticker.deltaTime);
        });

        document.addEventListener('keydown', (event) =>
        {
            const number = parseInt(event.key);
            if (!isNaN(number) && number > 0 && number <= codeRenderer.value.length)
            {
                let value = codeRenderer.value;
                value[number - 1] = (value[number - 1] + 1) % 6;
                codeRenderer.value = value;
            }
        });
    }
}