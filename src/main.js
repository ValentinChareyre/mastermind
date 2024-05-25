import { Application, Text } from './../node_modules/pixi.js/dist/pixi.min.mjs';

(async () =>
{
    const app = new Application();

    await app.init({ antialias: true, background: '#1099bb' });

    document.getElementById("game-container").appendChild(app.canvas);

    const text = new Text({ text : "Hello world", });
    text.x = app.renderer.width / 2 - text.width / 2;
    text.y = app.renderer.height / 2 - text.height / 2;
    app.stage.addChild(text);
})();
