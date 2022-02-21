import * as PIXI from 'pixi.js';
import { ConfigInterface } from '../../config/contract';
import { config } from '../../config/config';
import backgroundImg from './assets/back.png';
const { backgroundPosition, backgroundVerticalPadding } = config;


class Background extends PIXI.Sprite{


    constructor( config: ConfigInterface){
      
      const texture = PIXI.Texture.from('backgroundImg');
      //const renderer = PIXI.autoDetectRenderer();
      super(texture)
      this.scale.set(.6) 
      // console.log("window height" + window.innerHeight)
      // console.log("window width" + window.innerWidth)
      // console.log("render width:" + renderer.width)
      // console.log("render resolution: " + renderer.resolution)
      // console.log("rendererheight:" + renderer.height)
      this.position.set(backgroundPosition.x, backgroundPosition.y - backgroundVerticalPadding)
    }  
    
}
PIXI.Loader.shared.add('backgroundImg', backgroundImg);

export default Background;
