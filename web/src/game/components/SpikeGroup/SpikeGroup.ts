import Spike from '../Spike'
import constants from '../../constants'
import Phaser from 'phaser'

type SpikeGroupConfig = {
  x?: number
  y?: number
  count?: number
  maximum?: number
  label?: string
  color?: number
  alpha?: number
  angle?: number
  space?: number
  orientation?: 'horizontal' | 'vertical'
  isAnimation?: boolean
}

export default class SpikeGroup {
  private scene: Phaser.Scene
  private spikes: Spike[] = []
  private currentSpikes = 0
  private maximumSpikes = 0
  private isAnimation: boolean

  constructor(scene: Phaser.Scene, config: SpikeGroupConfig) {
    const {
      x = 0,
      y = 0,
      count = 0,
      maximum = count,
      label,
      color,
      alpha,
      angle,
      space = 0,
      orientation = 'horizontal',
      isAnimation = false,
    } = config

    this.scene = scene
    this.isAnimation = isAnimation
    this.currentSpikes = count
    this.maximumSpikes = maximum

    const spikeWidth = constants.SPIKE.WIDTH
    const spikeHeight = constants.SPIKE.HEIGHT

    for (let index = 0; index < maximum; index++) {
      const spikeX =
        x +
        (orientation === 'horizontal'
          ? index * spikeWidth + spikeWidth / 2 + index * space
          : 0)

      const spikeY =
        y +
        (orientation === 'vertical'
          ? index * spikeWidth + spikeWidth / 2 + index * space
          : 0)

      const spike = new Spike(scene, {
        x: spikeX,
        y: spikeY,
        width: spikeWidth,
        height: spikeHeight,
        label,
        color: 0xa3a3a3,
        alpha,
      })

      spike.setAngle(angle)

      this.spikes.push(spike)
    }

    this.hideSpikes()

    this.changeCount(count)
  }

  public setFillStyle(color: number | undefined, alpha?: number | undefined) {
    for (const spike of this.spikes) spike.setFillStyle(color, alpha)

    return this
  }

  private randNumber(min: number, max: number, exclude: number[] = []) {
    let number_ = Math.floor(
      Math.random() * (max - min + 1 - exclude.length) + min
    )
    ;[...exclude]
      .sort((a, b) => a - b)
      .every((exeption) => exeption <= number_ && (number_++, true))
    return number_
  }

  public changeCount(count: number) {
    if (count > this.maximumSpikes) count = this.maximumSpikes
    this.currentSpikes = count

    this.hideSpikes()

    const excludedIndexes = []

    for (const [index, spike] of this.spikes.entries()) {
      if (spike.visible) {
        excludedIndexes.push(index)
      }
    }

    while (excludedIndexes.length < count) {
      const index = this.randNumber(0, this.maximumSpikes - 1, excludedIndexes)

      this.showSpike(index)

      excludedIndexes.push(index)
    }

    return this
  }

  public static getNeededSpikes(score: number) {
    if (score === 0) return 0
    if (score === 1) return 2
    if (score < 5) return 3
    if (score < 12) return 4
    if (score < 20) return 5
    if (score < 30) return 6
    if (score < 40) return Phaser.Math.Between(4, 7)
    if (score < 50) return Phaser.Math.Between(6, 8)
    if (score < 60) return Phaser.Math.Between(6, 9)
    if (score >= 60) return Phaser.Math.Between(7, 9)
    return Phaser.Math.Between(3, 9)
  }

  private showSpike(index: number) {
    const spike = this.spikes[index]

    if (this.isAnimation) {
      const tween = this.scene.tweens.add({
        targets: spike,
        timeScale: 1,
        duration: 300,
      })

      tween.play();
      console.log('showSpikes')
    }

    spike.setVisible(true)
    spike.setActive(true)

    // https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Matter.Components.Collision.html
    // @ts-ignore
    spike.setCollisionCategory(Number(true))

    return this
  }

  private hideSpikes() {
    for (const spike of this.spikes) {
      if (this.isAnimation) {
        const tween = this.scene.tweens.add({
          targets: spike,
          timeScale: 0,
          duration: 300,
        })   

        tween.play();
        console.log('hideSpikes')
      }

      spike.setVisible(false)
      spike.setActive(false)

      // https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Matter.Components.Collision.html
      // @ts-ignore
      spike.setCollisionCategory(Number(false))
    }

    return this
  }

  public get getCurrentCount() {
    return this.currentSpikes
  }
}
