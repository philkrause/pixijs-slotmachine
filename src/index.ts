import * as PIXI from 'pixi.js';
import { config } from './config/config';
//import Background from './components/Background';
import Spin from './components/spin/spin';
import PlayButton from './components/PlayButton';

const { gameWidth, gameHeight } = config;

function createApplication(): PIXI.Application {
  const app = new PIXI.Application({
    backgroundColor: 0xB4C3D4,
    width: gameWidth,
    height: gameHeight
  });
  app.renderer.resize(window.innerWidth, window.innerHeight);
  app.stage.scale.x = window.innerWidth / gameWidth;
  app.stage.scale.y = window.innerHeight / gameHeight;
  window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    app.stage.scale.x = window.innerWidth / gameWidth;
    app.stage.scale.y = window.innerHeight / gameHeight;
  });
  return app;
}

function loadAssets(onComplete: () => void): void {
  const loader = PIXI.Loader.shared;
  loader.onComplete.once(onComplete);
  loader.load();
}

function render(app: PIXI.Application) {
  document.body.appendChild(app.view);
}

window.onload = () =>
  loadAssets(() => {
    const app = createApplication();
    const stage = app.stage;
    
    const spinner = new Spin(config, app.ticker)
    stage.addChild(spinner);

    console.log(spinner)
    // const spinner2 = new Spin(config, app.ticker)
    // stage.addChild(spinner2);

    // const background = new Background(config);
    // stage.addChild(background);

    const button = new PlayButton(config);
    stage.addChild(button);

    button.on('click', function (this: PlayButton) {
      if (!spinner.areSpinning()) {
        this.setDisabled();
        spinner.spin(() => {
          this.setInactive();
        });
      }
    });

    render(app);
  });