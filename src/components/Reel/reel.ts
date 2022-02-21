import * as PIXI from 'pixi.js';
import reelCellsImg from './assets/reel_cells.png';
// import aceImg from './assets/a.png'
import { ConfigInterface } from '../../config/contract';
//import util from 'util'

class Reel extends PIXI.TilingSprite {

  protected spinningOutcome: number;
  protected spinningCycles: number;
  protected spinningCyclesMeter: number;
  protected reelIndex: number;
  protected horizontalMargin: number;
  protected verticalPadding: number;
  protected cellHeight: number;

  protected appTicker: PIXI.Ticker;

  static totalCells: number;

  constructor(reelIndex: number, config: ConfigInterface, ticker: PIXI.Ticker) {
    const texture = PIXI.Texture.from('reelCellsImg');

    const {
      reelCellHeight,
      reelVerticalPadding,
      reelCellWidth,
      reelHorizontalMargin,
      reelSpinningCycles,
      reelVisibleCells,

    } = config;
  
    //const jackCell = reelCellsImg
    const reelHeight = reelCellHeight * Reel.totalCells + 1 * reelVisibleCells
    super(texture, reelCellWidth, reelHeight);
    this.appTicker = ticker;
    this.spinningOutcome = Math.floor(Math.random() * (Reel.totalCells + 1));
    this.cellHeight = reelCellHeight;
    this.horizontalMargin = reelHorizontalMargin;
    this.spinningCycles = reelSpinningCycles;
    this.verticalPadding = reelVerticalPadding;
    this.reelIndex = reelIndex;
    this.spinningCyclesMeter = Reel.totalCells + 1;
    //this.allCells = allImgs
    this.setPosition();
  }
  protected setPosition() {
    console.log(`WIDTH: ${this.width}`)
    this.scale.x = .5
    this.scale.y = .5
    this.x = this.reelIndex * (this.width/2 + this.horizontalMargin);
    this.y = 0;
  }

  protected setTilePositionAt(cellNumber: number) {
    this.tilePosition.x = 0;
    this.tilePosition.y = -cellNumber * this.cellHeight + Math.ceil(this.verticalPadding / 2);
  }

  protected resetSpinningMeter() {
    //const totalHeight = this.cellHeight * Reel.totalCells
   // const randomYpos = Math.floor(Math.random() * totalHeight);
    this.spinningCyclesMeter = this.spinningCycles * this.cellHeight * Reel.totalCells;
    //console.log(`Spinning Meter: ${this.spinningCyclesMeter}`)
  }


  static rollDice(): number {
    const chance = Reel.getNumberBetween(0, 10);
    if (chance < 5) {
      return Reel.getRandomOutcome();
    }
    return -1;
  }
  protected setSpinningOutcome(useOutcome: number) {
    this.spinningOutcome = useOutcome >= 0 ? useOutcome : Reel.getRandomOutcome();
    // console.log(`Spinning Outcome: ${this.spinningOutcome}`)

    this.setTilePositionAt(this.spinningOutcome);
    this.resetSpinningMeter();
  }

  //ANIMATION  -----------------
  spin(useOutcome: number, spinningSpeedFactor: number, cb: Function) {
    this.setSpinningOutcome(useOutcome);
    const animation = () => {
      if (this.spinningCyclesMeter > 0) {
        this.tilePosition.y += spinningSpeedFactor;
        this.spinningCyclesMeter -= spinningSpeedFactor;
      } else if (this.spinningCyclesMeter <= 0) {
        if (this.spinningCyclesMeter < 0) {
          this.tilePosition.y += this.spinningCyclesMeter;
          this.spinningCyclesMeter = 0;
        }
        this.appTicker.remove(animation);
        cb();
      }
    };
    this.appTicker.add(animation);
  }


  getSpinningOutcome() {
    return this.spinningOutcome;
  }
  protected static getNumberBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  protected static getRandomOutcome() {
    return Reel.getNumberBetween(0, Reel.totalCells - 1);
  }


}

PIXI.Loader.shared.add('reelCellsImg', reelCellsImg);
//PIXI.Loader.shared.add('queenImg', queenImg);


export default Reel;