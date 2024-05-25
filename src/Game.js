import { Application, Text, Graphics } from '/node_modules/pixi.js/dist/pixi.min.mjs';
import { GameRenderer } from "./GameRenderer.js";
import { CodePegRenderer } from "./CodePegRenderer.js"

export class Game
{
    /** @type {Application} */
    #_application;

    /** @type {GameRenderer} */
    #_gameRenderer;

    /** @type {number} */
    #_timeSinceStartup;

    /** @type {Array<CodePegRenderer>} */
    #_pegs;

    /**
     * @param {HTMLElement} rendererContainer
     */
    constructor(rendererContainer)
    {
        this.#_application = new Application();
        this.#_gameRenderer = new GameRenderer(this.#_application, rendererContainer);
        this.#_timeSinceStartup = 0;
        this.#_pegs = [];
    }

    async init()
    {
        await this.#_application.init({ antialias: true, background: '#ffffff' });

        this.#_gameRenderer.init();
        
        // Graphics to render pegs, detecting clicks to know which peg has been clicked
        const graphics = new Graphics();
        graphics.eventMode = 'static';
        graphics.cursor = 'pointer';
        graphics.on('click', this.#checkIfPegClicked, this);
        this.#_gameRenderer.add(graphics);

        this.#createPegs(graphics);

        // Main update loop
        this.#_application.ticker.add((ticker) => {
            graphics.clear();
            this.#_pegs.forEach(peg => peg.draw());
        });
    }

    #createPegs(graphics)
    {
        const centerX = this.#_gameRenderer.width * 0.5;
        const pegRadius = 20;
        const horizontalSpace = 100;
        const pegCount = 5;
        for (let i = 0; i < pegCount; ++i) {
            this.#_pegs.push(new CodePegRenderer(graphics, centerX + (i - (pegCount - 1) / 2) * horizontalSpace, 100, pegRadius, 0x555555));
        }
    }

    #checkIfPegClicked(event)
    {
        this.#_pegs.forEach((peg, index) =>
        {
            if (peg.contains(event.data.global.x, event.data.global.y))
            {
                console.log("Peg " + index + " clicked");
            }
        });
    }
}