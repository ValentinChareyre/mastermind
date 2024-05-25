import { Graphics, FillGradient } from '/node_modules/pixi.js/dist/pixi.min.mjs';

export class CodePegRenderer
{
    /** @type {Graphics} */
    #_graphics;

    /** @type {number} */
    x;

    /** @type {number} */
    y;

    /** @type {number} */
    radius;

    /** @type {number} */
    color;

    #_gradient;

    /**
     * @param {Graphics} graphicsContext 
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     */
    constructor(graphicsContext, x, y, radius, color)
    {
        this.#_graphics = graphicsContext;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;

        // Create a fill gradient
        // this.#_gradient = new FillGradient(x - this.radius, y - this.radius, x + this.radius, y + this.radius);
        // this.#_gradient.addColorStop(0, 0xffffff);
        // this.#_gradient.addColorStop(0.8, 0xeeeeee);
        // this.#_gradient.addColorStop(1, 0xffffff);
    }

    draw()
    {
        this.#_graphics
            .circle(this.x, this.y, this.radius)
            .fill({color: this.color, alpha : 1})
            .stroke({ width: 1, color: 0x222222 });
    }

    /**
     * @param {number} x 
     * @param {number} y 
     * @returns {boolean} true if peg contains point (x, y)
     */
    contains(x, y)
    {
        return (x - this.x) * (x - this.x) + (y - this.y) * (y - this.y) <= this.radius * this.radius;
    }
}