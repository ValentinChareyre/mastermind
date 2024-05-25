import { Application, Container } from '/node_modules/pixi.js/dist/pixi.min.mjs';

export class GameRenderer
{
    /** @type {Application} */
    #_application;

    /** @type {HTMLElement} */
    #_rendererContainer;

    /** @type {number} */
    #_width;

    /** @type {number} */
    #_height;

    get width(){ return this.#_width; }
    get height(){ return this.#_height; }

    /**
     * @param {Application} application 
     * @param {HTMLElement} rendererContainer 
     */
    constructor(application, rendererContainer)
    {
        this.#_application = application;
        this.#_rendererContainer = rendererContainer;
    }

    init()
    {
        this.#_width = this.#_application.renderer.width;
        this.#_height = this.#_application.renderer.height;

        this.#_rendererContainer.appendChild(this.#_application.canvas);
    }

    /**
     * @param  {...Container} children 
     */
    add(...children)
    {
        this.#_application.stage.addChild(...children);
    }
}