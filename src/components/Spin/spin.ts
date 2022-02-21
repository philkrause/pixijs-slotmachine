import * as PIXI from 'pixi.js';
import Reel from '../Reel/reel';
import { ConfigInterface } from '../../config/contract';
//import util from 'util'


  class Spin extends PIXI.Container {
    protected items: Reel[] = [];
    protected totalReels: number;
    protected spinningSpeedFactor: number[];
    protected useEasyMode: boolean = false;
    protected spinning = false;
    protected shuffleSpinningSpeedFactor: boolean;
  
    protected rolledDiceOutcome: number = -1;


  
    constructor(config: ConfigInterface, ticker: PIXI.Ticker) {
      super();
      this.totalReels = config.totalReels ;
      this.spinningSpeedFactor = [...config.reelSpinningSpeedFactor];
      this.shuffleSpinningSpeedFactor = config.reelShuffleSpinningSpeedFactor;
      this.position.set(config.reelPosition.x, config.reelPosition.y);
      // this.position.set(config.reelPosition_two.x, config.reelPosition_two.y);
      // this.position.set(config.reelPosition_three.x, config.reelPosition_three.y);

      Reel.totalCells = config.totalReelCells;
      for (let index = 0; index < this.totalReels; index = index + 1) {
        const reel = new Reel(index, config, ticker);
        this.items.push(reel);
        this.addChild(reel);
      }
    }

    spin(cb: Function) {
        this.spinning = true;
        let spinningReelsNumber = this.totalReels;
        const onStop = () => {
          spinningReelsNumber -= 1;
          if (!spinningReelsNumber) {
            cb();
            this.spinning = false;
            this.checkResults();
          }
        };
    this.rolledDiceOutcome = this.useEasyMode ? Reel.rollDice() : -1;    
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].spin(this.rolledDiceOutcome, this.spinningSpeedFactor[i], onStop);
    }
  }
    areSpinning() {
        return this.spinning;
    }

        protected checkResults(): void {
            // If we have rolled a dice and got lucky, skip checking spinning outcome
            let won = this.rolledDiceOutcome >= 0;
            if (!won) {
              // Check if all the reels have the same spinning outcome
              const outcome1 = this.items[0].getSpinningOutcome();
              const outcome2 = this.items[1].getSpinningOutcome();
              const outcome3 = this.items[2].getSpinningOutcome();
              const outcome4 = this.items[3].getSpinningOutcome();
              const outcome5 = this.items[4].getSpinningOutcome();

              console.log(`ROW1: ${outcome1}, ROW2: ${outcome2}, ROW3: ${outcome3}, ROW4: ${outcome4}, ROW5: ${outcome5}`)
            
              won = this.items.find((i) => i.getSpinningOutcome() !== outcome1) === undefined;
            }
            if (won) console.log('You won!');
          }        
  }



  export default Spin;


      // static shuffle(cellImg: any): any {
    //   var m = cellImg.length, t, i;
    //   while (m) { 
    //     i = Math.floor(Math.random() * m--);
    //     t = cellImg[m];
    //     cellImg[m] = cellImg[i];
    //     cellImg[i] = t;
    //   }
    //   return cellImg;
    // }