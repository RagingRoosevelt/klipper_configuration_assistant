export class Pinout {
  constructor(
    name=undefined,
    shortname=undefined,
    source=undefined,
    options={}
  ) {
    this.name = name
    this.shortname = shortname
    this.source = source
    this.stepper = options.stepper || []
    this.fan = options.fan || []
    this.endstop = options.endstop || []
    this.neopixel = options.neopixel || []
    this.thermistor = options.thermistor || []
    this.heatbed= options.heatbed || []
    this.hotend = options.hotend || []
  }
}