import * as PIXI from 'pixi.js';
import { ConfigInterface } from '../../config/contract';
import Button from '../UI/Button';

import playButtonActive from './assets/start_active_btn.png';
import playButtonInactive from './assets/start_inactive_btn.png';
import playButtonDisabled from './assets/disabled_btn.png';

class PlayButton extends Button {
  constructor(config: ConfigInterface) {
    super({
      activeTexture: PIXI.Texture.from('playButtonActive'),
      inactiveTexture: PIXI.Texture.from('playButtonInactive'),
      disabledTexture: PIXI.Texture.from('playButtonDisabled')
    });
    this.position.set(config.playButtonPosition.x, config.playButtonPosition.y);
    this.scale.set(.4)
  }
}

PIXI.Loader.shared.add('playButtonActive', playButtonActive);
PIXI.Loader.shared.add('playButtonInactive', playButtonInactive);
PIXI.Loader.shared.add('playButtonDisabled', playButtonDisabled);

export default PlayButton;