export class Pinout {
  constructor(name=undefined, options={}) {
    this.name = name
    this.stepper = options.stepper || []
    this.fan = options.fan || []
    this.endstop = options.endstop || []
    this.neopixel = options.neopixel || []
    this.thermistor = options.thermistor || []
    this.heatbed= options.heatbed || []
    this.hotend = options.hotend || []
  }
}