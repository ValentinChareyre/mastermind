import { Application, Text, Graphics } from '/node_modules/pixi.js/dist/pixi.min.mjs';
import { GameRenderer } from "./GameRenderer.js";
import { CodeRenderer } from './CodeRenderer.js';
import { CodeMaster } from './CodeMaster.js';
import { Code } from './Code.js';

export class Game
{
    /** @type {Application} */
    #_application;

    /** @type {GameRenderer} */
    #_gameRenderer;

    /** @type {number} */
    #_timeSinceStartup;

    /** @type {CodeMaster} */
    #_codeMaster;

    /** @type {Code} */
    #_secretCode;
    
    /** @type {Code} */
    #_userCode;

    /** @type {CodeRenderer} */
    #_codeRenderer;

    /**
     * @param {HTMLElement} rendererContainer
     */
    constructor(rendererContainer)
    {
        this.#_application = new Application();
        this.#_gameRenderer = new GameRenderer(this.#_application, rendererContainer);
        this.#_timeSinceStartup = 0;
        this.#_codeMaster = new CodeMaster();
        this.#_secretCode = this.#_codeMaster.generateSecretCode(5, 6);
        this.#_userCode = new Code(this.#_secretCode.length);
    }

    async init()
    {
        await this.#_application.init({ antialias: true, background: '#ffffff' });

        this.#_gameRenderer.init();
        
        this.#_codeRenderer = new CodeRenderer(this.#_userCode, 20, this.#_gameRenderer.width * 0.5);
        this.#_codeRenderer.x = this.#_gameRenderer.width * 0.5;
        this.#_codeRenderer.y = 100;
        this.#_gameRenderer.add(this.#_codeRenderer);

        this.#_codeRenderer.on('peg_clicked', index => this.#increaseDigit(index));

        // Main update loop
        this.#_application.ticker.add((ticker) => {
            this.#_codeRenderer.update(ticker.deltaTime);
        });
    }

    /**
     * @param {number} index 
     */
    #increaseDigit(index)
    {
        if (index >= 0 && index < this.#_userCode.length)
        {
            this.#_userCode.setDigit(index, (this.#_userCode.getDigit(index) + 1) % 6);

            let drawButton = true;
            for (let i = 0 ; i < this.#_userCode.length ; ++i)
            {
                if (this.#_userCode.getDigit(i) < 0)
                {
                    drawButton = false;
                    break;
                }
            }
            if (drawButton)
            {
                console.log("Draw Button");
            }
        }
    }
}