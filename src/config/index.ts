import { ConfigInterface } from './contract';

export const config: ConfigInterface = {
  gameWidth: 800,
  gameHeight: 600,
  firstreelPosition: { x: 175, y: 20 },
  secondreelPosition: { x: 175, y: 164 },
  playButtonPosition: { x: 600, y: 450 },
  selectEasyModePosition: { x: 640, y: 470 },
  FPSDisplayPosition: { x: 500, y: 20 },
  totalReels: 5,
  reelSpinningCycles: 1,
  reelSpinningSpeedFactor: [25, 24, 23, 22, 21],
  reelShuffleSpinningSpeedFactor: false,
  totalReelCells: 8,
  reelVisibleCells: 8,
  reelCellHeight: 144,
  reelCellWidth: 144,
  reelVerticalPadding: 0,
  reelHorizontalMargin: -60,
  backgroundHeight: 800,
  backgroundWidth: 600,
  backgroundHorizontalMargin: 0,
  backgroundVerticalPadding: 0,
  backgroundPosition: {x: 10, y: 40}
};
