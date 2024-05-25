import { Application, Text, Ticker } from '/node_modules/pixi.js/dist/pixi.min.mjs';
import { GameRenderer } from "./GameRenderer.js";

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

        const text = new Text({ text : "Mindmaster" });
        this.#_gameRenderer.add(text);
        text.x = (this.#_gameRenderer.width - text.width) / 2;
        text.y = (this.#_gameRenderer.height - text.height) / 2;

        this.#_application.ticker.add((ticker) => {
            this.#_timeSinceStartup += ticker.deltaTime;
            text.y =(this.#_gameRenderer.height - text.height) / 2 + Math.sin(this.#_timeSinceStartup / 20) * 50;
        });
    }
}