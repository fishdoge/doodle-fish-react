import Phaser from 'phaser'
import constants from '../constants'
import SceneList from './sceneList'
import plugins from './pluginsConfig'

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Dont Touch',
  version: '0.0.16',
  type: Phaser.AUTO,
  parent: 'game-container',
  backgroundColor: constants.COLORS.DEFAULT.BACKGROUND,
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom: 0.3,
    width: constants.WIDTH,
    height: constants.HEIGHT,
  },
  physics: {
    default: 'matter',
    matter: {
      debug: constants.DEBUG,
      gravity: {
        y: 3,
      },
    },
  },
  render: {
    pixelArt: false,
    antialias: true,
    antialiasGL: true,
    roundPixels: true,
  },
  autoFocus: true,
  dom: {
    createContainer: true,
  },
  powerPreference: 'high-performance',
  scene: SceneList,
  plugins,
}

export default gameConfig
