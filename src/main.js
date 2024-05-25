import { Game } from './Game.js';

(async () =>
{
    const game = new Game(document.getElementById("game-container"));

    await game.init();
})();
