import { Graphics, FillGradient } from '/node_modules/pixi.js/dist/pixi.min.mjs';
import { Code } from './Code.js';

export class CodeRenderer extends Graphics
{
    /** @type {Array<number>} */
    #_value;
    
    /** @type {number} Space between pegs */
    #_gutter;

    /** @type {number} */
    #_pegRadius;

    /** @type {Array<number>} */
    #_colorMap;

    /** @type {Array<number>} */
    #_currentPegRadii;

    get value()
    {
        return Array.from(this.#_value);
    }

    set value(v)
    {
        this.#_value.forEach((digit, index) =>
        {
            if (this.#_value[index] != v[index])
            {
                this.#_currentPegRadii[index] = 0;
            }
        });
        this.#_value = v;
        this.#redraw();
    }

    /**
     * @param {Code} code 
     * @param {number} pegRadius
     * @param {number} width
     */
    constructor(code, pegRadius, width)
    {
        super();
        this.#_gutter = code.length > 1 ? (width - pegRadius * code.length) / (code.length - 1) : 0;
        this.#_value = code;
        this.#_currentPegRadii = code.map(_ => 0);
        this.#_pegRadius = pegRadius;
        this.#_colorMap = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
        this.eventMode = 'static';
        this.cursor = 'pointer';
        this.on('click', this.#checkIfPegClicked, this);

        this.#redraw();
    }

    update(deltaTime)
    {
        let redrawNeeded = false;
        this.#_currentPegRadii.forEach((radius, index) =>
        {
            const deltaRadius = Math.max(this.#_pegRadius - radius, 0);
            if (deltaRadius > 0)
            {
                redrawNeeded = true;
                this.#_currentPegRadii[index] = radius + deltaRadius * deltaTime / 10;
            }
        });

        if (redrawNeeded)
        {
            this.#redraw();
        }
    }

    #redraw()
    {
        this.clear();
        
        this.#_value.forEach((digit, index) => this.#drawPeg(index, digit));
    }

    #drawPeg(index, digit)
    {
        const x = (index - (this.#_value.length - 1) / 2) * this.#_gutter;
        this.circle(x, 0, this.#_currentPegRadii[index])
            .fill({ color: digit >= 0 ? this.#_colorMap[digit] : 0x555555, alpha: 1 })
            .stroke({ width: 1, color: 0x222222 });
    }

    #checkIfPegClicked(event)
    {
        this.#_value.forEach((digit, index) => this.#checkPegHasBeenClicked(index, event));
    }

    #checkPegHasBeenClicked(index, event)
    {
        const worldPegXPosition = this.x + (index - (this.#_value.length - 1) / 2) * this.#_gutter;
        const worldPegYPosition = this.y;
        const sqrDistance = (worldPegXPosition - event.data.global.x) * (worldPegXPosition - event.data.global.x)
            + (worldPegYPosition - event.data.global.y) * (worldPegYPosition - event.data.global.y);
        if (sqrDistance <= this.#_pegRadius * this.#_pegRadius)
        {
            console.log("Peg " + index + " clicked");
        }
    }
}