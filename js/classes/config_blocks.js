import van from "../frameworks/van-1.5.5.js"

export class Mcu {
  constructor(name = undefined, options = {}) {
    this.name = van.state((name === undefined || name === "") ? 'mcu' : `mcu ${name}`)
    this.serial = { value: van.state(undefined), required: false, desc: 'The serial port to connect to the MCU. If unsure (or if it\nchanges) see the "Where\'s my serial port?" section of the FAQ.\nThis parameter must be provided when using a serial port.' }
    this.baud = { value: van.state(undefined), required: false, default: 250000, desc: 'The baud rate to use. The default is 250000.' }
    this.canbus_uuid = { value: van.state(undefined), required: false, desc: 'If using a device connected to a CAN bus then this sets the unique\nchip identifier to connect to. This value must be provided when using \nCAN bus for communication.' }
    this.canbus_interface = { value: van.state(undefined), required: false, default: "can0", desc: 'If using a device connected to a CAN bus then this sets the CAN\nnetwork interface to use. The default is \'can0\'.' }
    this.restart_method = { value: van.state(undefined), required: false, desc: 'This controls the mechanism the host will use to reset the\nmicro-controller. The choices are \'arduino\', \'cheetah\', \'rpi_usb\',\nand \'command\'. The \'arduino\' method (toggle DTR) is common on\nArduino boards and clones. The \'cheetah\' method is a special\nmethod needed for some Fysetc Cheetah boards. The \'rpi_usb\' method\nis useful on Raspberry Pi boards with micro-controllers powered\nover USB - it briefly disables power to all USB ports to\naccomplish a micro-controller reset. The \'command\' method involves\nsending a Klipper command to the micro-controller so that it can\nreset itself. The default is \'arduino\' if the micro-controller\ncommunicates over a serial port, \'command\' otherwise.' }
    for (const p of Object.keys(this)) {
      if (p in options) {
        this[p].value = options[p]
      }
    }
  }
}

export class Printer {
  constructor(unused, options = {}) {
    this.name = van.state('printer')
    this.kinematics = { value: van.state(undefined), required: true, options: [
      {group: 'Common'},
      {value:'cartesian'}, 
      {value:'delta'}, 
      {value:'corexy'},
      {group: 'Uncommon'},
      {value: 'deltesian'},
      {value: 'corexz'},
      {value: 'hybrid_corexy'},
      {value: 'hybrid_corexz'},
      {value: 'polar'},
      {value: 'rotary_delta'},
      {value: 'winch'},
      {value: 'generic_cartesian'},
    ], requires_others: {
      cartesian: ['stepper_x', 'stepper_y', 'stepper_z'],
      delta: ['stepper_a', 'stepper_b', 'stepper_c', 'delta_calibrate'],
      deltesian: ['stepper_left', 'stepper_right', 'stepper_y'],
      corexy: ['stepper_x', 'stepper_y', 'stepper_z'],
      corexz: ['stepper_x', 'stepper_y', 'stepper_z'],
      hybrid_corexy: ['stepper_x', 'stepper_y', 'stepper_z'],
      hybrid_corexz: ['stepper_x', 'stepper_y', 'stepper_z'],
      polar: ['stepper_bed', 'stepper_arm', 'stepper_z'],
      rotary_delta: ['stepper_a', 'stepper_b', 'stepper_c', 'delta_calibrate'],
      winch: ['stepper_a', 'stepper_b', 'stepper_c'],
      generic_cartesian: ['carriage x', 'carriage y', 'carriage z']
    }, requires_self: {
      cartesian: ['max_z_velocity', 'max_z_accel'],
      delta: ['max_z_velocity', 'delta_radius'],
      deltesian: ['max_z_velocity'],
      corexy: ['max_z_velocity', 'max_z_accel'],
      corexz: ['max_z_velocity', 'max_z_accel'],
      hybrid_corexy: ['max_z_velocity', 'max_z_accel'],
      hybrid_corexz: ['max_z_velocity', 'max_z_accel'],
      polar: ['max_z_velocity', 'max_z_accel'],
      rotary_delta: ['max_z_velocity', 'shoulder_radius', 'shoulder_height'],
      winch: ['max_velocity', 'max_accel'],
    }, desc: 'The type of printer in use. This option may be one of: cartesian,\ncorexy, corexz, hybrid_corexy, hybrid_corexz, generic_cartesian,\nrotary_delta, delta, deltesian, polar, winch, or none.\nThis parameter must be specified.' }
    this.max_velocity = {value: van.state(undefined), required: false, desc: 'Maximum velocity (in mm/s) of the toolhead (relative to the\nprint). This value may be changed at runtime using the\nSET_VELOCITY_LIMIT command. This parameter must be specified.'}
    this.max_accel = {value: van.state(undefined), required: false, desc: 'Maximum acceleration (in mm/s^2) of the toolhead (relative to the\nprint). Although this parameter is described as a "maximum"\nacceleration, in practice most moves that accelerate or decelerate\nwill do so at the rate specified here. The value specified here\nmay be changed at runtime using the SET_VELOCITY_LIMIT command.\nThis parameter must be specified.'}
    this.minimum_cruise_ratio = {value: van.state(undefined), required: false, default: 0.5, desc: 'Most moves will accelerate to a cruising speed, travel at that\ncruising speed, and then decelerate. However, some moves that\ntravel a short distance could nominally accelerate and then\nimmediately decelerate. This option reduces the top speed of these\nmoves to ensure there is always a minimum distance traveled at a\ncruising speed. That is, it enforces a minimum distance traveled\nat cruising speed relative to the total distance traveled. It is\nintended to reduce the top speed of short zigzag moves (and thus\nreduce printer vibration from these moves). For example, a\nminimum_cruise_ratio of 0.5 would ensure that a standalone 1.5mm\nmove would have a minimum cruising distance of 0.75mm. Specify a\nratio of 0.0 to disable this feature (there would be no minimum\ncruising distance enforced between acceleration and deceleration).\nThe value specified here may be changed at runtime using the\nSET_VELOCITY_LIMIT command. The default is 0.5.'}
    this.square_corner_velocity = {value: van.state(undefined), required: false, desc: 'The maximum velocity (in mm/s) that the toolhead may travel a 90\ndegree corner at. A non-zero value can reduce changes in extruder\nflow rates by enabling instantaneous velocity changes of the\ntoolhead during cornering. This value configures the internal\ncentripetal velocity cornering algorithm; corners with angles\nlarger than 90 degrees will have a higher cornering velocity while\ncorners with angles less than 90 degrees will have a lower\ncornering velocity. If this is set to zero then the toolhead will\ndecelerate to zero at each corner. The value specified here may be\nchanged at runtime using the SET_VELOCITY_LIMIT command. The\ndefault is 5mm/s.'}
  }
}
export class Stepper {
  constructor(name, options = {}) {
    this.name = van.state(name)
    this.step_pin = { value: van.state(undefined), required: true, pin_type: 'stepper.step', desc: 'Step GPIO pin (triggered high). This parameter must be provided.'}
    this.dir_pin = { value: van.state(undefined), required: true, pin_type: 'stepper.dir', desc: 'GPIO pin (high indicates positive direction). This\nparameter must be provided.'}
    this.enable_pin = { value: van.state(undefined), required: false, pin_type: 'stepper.en', desc: 'Enable pin (default is enable high; use ! to indicate enable\nlow). If this parameter is not provided then the stepper motor\ndriver must always be enabled.'}
    this.rotation_distance = { value: van.state(undefined), required: true, desc: 'Distance (in mm) that the axis travels with one full rotation of\nthe stepper motor (or final gear if gear_ratio is specified).\nThis parameter must be provided.'}
    this.microsteps = { value: van.state(undefined), required: true, desc: 'The number of microsteps the stepper motor driver uses. This\nparameter must be provided.'}
    this.full_steps_per_rotation = { value: van.state(undefined), required: false, desc: "The number of full steps for one rotation of the stepper motor.\nSet this to 200 for a 1.8 degree stepper motor or set to 400 for a\n0.9 degree motor. The default is 200." }
    this.gear_ratio = { value: van.state(undefined), required: false, desc: 'The gear ratio if the stepper motor is connected to the axis via a\ngearbox. For example, one may specify "5:1" if a 5 to 1 gearbox is\nin use. If the axis has multiple gearboxes one may specify a comma\nseparated list of gear ratios (for example, "57:11, 2:1"). If a\ngear_ratio is specified then rotation_distance specifies the\ndistance the axis travels for one full rotation of the final gear.\nThe default is to not use a gear ratio.' }
    this.step_pulse_duration = { value: van.state(undefined), required: false, desc: 'The minimum time between the step pulse signal edge and the\nfollowing "unstep" signal edge. This is also used to set the\nminimum time between a step pulse and a direction change signal.\nThe default is 0.000000100 (100ns) for TMC steppers that are\nconfigured in UART or SPI mode, and the default is 0.000002 (which\nis 2us) for all other steppers.' }
    this.endstop_pin = { value: van.state(undefined), required: ['printer.cartesian', 'printer.corexy'], pin_type: 'endstop', desc: 'Endstop switch detection pin. If this endstop pin is on a\ndifferent mcu than the stepper motor then it enables "multi-mcu\nhoming". This parameter must be provided for the X, Y, and Z\nsteppers on cartesian style printers.' }
    this.position_min = { value: van.state(undefined), required: false, default: 0, desc: 'Minimum valid distance (in mm) the user may command the stepper to\nmove to.  The default is 0mm.' }
    this.position_endstop = { value: van.state(undefined), required: ['printer.cartesian', 'printer.corexy'], desc: 'Location of the endstop (in mm). This parameter must be provided\nfor the X, Y, and Z steppers on cartesian style printers.' }
    this.position_max = { value: van.state(undefined), required: ['printer.cartesian', 'printer.corexy'], desc: 'Maximum valid distance (in mm) the user may command the stepper to\nmove to. This parameter must be provided for the X, Y, and Z\nsteppers on cartesian style printers.' }
    this.homing_speed = { value: van.state(undefined), required: false, default: 5, desc: 'Maximum velocity (in mm/s) of the stepper when homing. The default\nis 5mm/s.' }
    this.homing_retract_dist = { value: van.state(undefined), required: false, default: 5, desc: 'Distance to backoff (in mm) before homing a second time during\nhoming. Set this to zero to disable the second home. The default\nis 5mm.' }
    this.homing_retract_speed = { value: van.state(undefined), required: false, desc: 'Speed to use on the retract move after homing in case this should\nbe different from the homing speed, which is the default for this\nparameter' }
    this.second_homing_speed = { value: van.state(undefined), required: false, desc: 'Velocity (in mm/s) of the stepper when performing the second home.\nThe default is homing_speed/2.' }
    this.homing_positive_dir = { value: van.state(undefined), required: false, desc: 'If true, homing will cause the stepper to move in a positive\ndirection (away from zero); if false, home towards zero. It is\nbetter to use the default than to specify this parameter. The\ndefault is true if position_endstop is near position_max and false\nif near position_min.' }
    for (const p of Object.keys(this)) {
      if (p in options) {
        this[p].value.val = options[p]
      }
    }
  }
}
export class Extruder {
  constructor(name = undefined, options = {}) {
    this.name = 'extruder'
    this.step_pin = { value: van.state(undefined), required: true, desc: '' }
    this.dir_pin = { value: van.state(undefined), required: true, desc: '' }
    this.enable_pin = { value: van.state(undefined), required: true, desc: '' }
    this.microsteps = { value: van.state(undefined), required: true, desc: '' }
    this.rotation_distance = { value: van.state(undefined), required: true, desc: '' }
    this.full_steps_per_rotation = { value: van.state(undefined), required: true, desc: '' }
    this.gear_ratio = { value: van.state(undefined), required: true, desc: 'See the "stepper" section for a description of the above parameters. If none of the above parameters are specified then no stepper will be associated with the nozzle hotend (though a SYNC_EXTRUDER_MOTION command may associate one at run-time).' }
    this.nozzle_diameter = { value: van.state(undefined), required: true, desc: 'Diameter of the nozzle orifice (in mm). This parameter must be provided.' }
    this.filament_diameter = { value: van.state(undefined), required: true, desc: 'The nominal diameter of the raw filament (in mm) as it enters the extruder. This parameter must be provided.' }
    this.max_extrude_cross_section = { value: van.state(undefined), required: true, desc: 'Maximum area (in mm^2) of an extrusion cross section (eg, extrusion width multiplied by layer height). This setting prevents excessive amounts of extrusion during relatively small XY moves. If a move requests an extrusion rate that would exceed this value it will cause an error to be returned. The default is = {value: van.state(undefined), required: true, desc 4.0 * nozzle_diameter^2' }
    this.instantaneous_corner_velocity = { value: van.state(undefined), required: true, default: 1, desc: 'The maximum instantaneous velocity change (in mm/s) of the extruder during the junction of two moves. The default is 1mm/s.' }
    this.max_extrude_only_distance = { value: van.state(undefined), required: true, default: 50, desc: 'Maximum length (in mm of raw filament) that a retraction or extrude-only move may have. If a retraction or extrude-only move requests a distance greater than this value it will cause an error to be returned. The default is 50mm.' }
    this.max_extrude_only_velocity = { value: van.state(undefined), required: true, desc: '' }
    this.max_extrude_only_accel = { value: van.state(undefined), required: true, desc: 'Maximum velocity (in mm/s) and acceleration (in mm/s^2) of the extruder motor for retractions and extrude-only moves. These settings do not have any impact on normal printing moves. If not specified then they are calculated to match the limit an XY printing move with a cross section of 4.0*nozzle_diameter^2 would have.' }
    this.pressure_advance = { value: van.state(undefined), required: true, default: 0, desc: 'The amount of raw filament to push into the extruder during extruder acceleration. An equal amount of filament is retracted during deceleration. It is measured in millimeters per millimeter/second. The default is 0, which disables pressure advance.' }
    this.pressure_advance_smooth_time = { value: van.state(undefined), required: true, default: 0.04, desc: 'A time range (in seconds) to use when calculating the average extruder velocity for pressure advance. A larger value results in smoother extruder movements. This parameter may not exceed 200ms. This setting only applies if pressure_advance is non-zero. The default is 0.040 (40 milliseconds).' }
    this.heater_pin = { value: van.state(undefined), required: true, desc: 'PWM output pin controlling the heater. This parameter must be provided.' }
    this.max_power = { value: van.state(undefined), required: true, default: 1, desc: 'The maximum power (expressed as a value from 0.0 to 1.0) that the heater_pin may be set to. The value 1.0 allows the pin to be set fully enabled for extended periods, while a value of 0.5 would allow the pin to be enabled for no more than half the time. This setting may be used to limit the total power output (over extended periods) to the heater. The default is 1.0.' }
    this.sensor_type = { value: van.state(undefined), required: true, desc: 'Type of sensor - common thermistors are "EPCOS 100K B57560G104F", "ATC Semitec 104GT-2", "ATC Semitec 104NT-4-R025H42G", "Generic 3950","Honeywell 100K 135-104LAG-J01", "NTC 100K MGB18-104F39050L32", "SliceEngineering 450", and "TDK NTCG104LH104JT1". See the "Temperature sensors" section for other sensors. This parameter must be provided.' }
    this.sensor_pin = { value: van.state(undefined), required: true, desc: 'Analog input pin connected to the sensor. This parameter must be provided.' }
    this.pullup_resistor = { value: van.state(undefined), required: true, default: 4700, desc: 'The resistance (in ohms) of the pullup attached to the thermistor. This parameter is only valid when the sensor is a thermistor. The default is 4700 ohms.' }
    this.smooth_time = { value: van.state(undefined), required: true, default: 1, desc: 'A time value (in seconds) over which temperature measurements will be smoothed to reduce the impact of measurement noise. The default is 1 seconds.' }
    this.control = { value: van.state(undefined), required: true, desc: 'Control algorithm (either pid or watermark). This parameter must be provided.' }
    this.pid_Kp = { value: van.state(undefined), required: true, desc: 'proportional (pid_Kp) term in PID' }
    this.pid_Ki = { value: van.state(undefined), required: true, desc: 'integral (pid_Ki) term in PID' }
    this.pid_Kd = { value: van.state(undefined), required: true, desc: 'The proportional (pid_Kp), integral (pid_Ki), and derivative (pid_Kd) settings for the PID feedback control system. Klipper evaluates the PID settings with the following general formula: heater_pwm = (Kp*error + Ki*integral(error) - Kd*derivative(error)) / 255 Where "error" is "requested_temperature - measured_temperature" and "heater_pwm" is the requested heating rate with 0.0 being full off and 1.0 being full on. Consider using the PID_CALIBRATE command to obtain these parameters. The pid_Kp, pid_Ki, and pid_Kd parameters must be provided for PID heaters.' }
    this.max_delta = { value: van.state(undefined), required: true, default: 2, desc: 'On "watermark" controlled heaters this is the number of degrees in Celsius above the target temperature before disabling the heater as well as the number of degrees below the target before re-enabling the heater. The default is 2 degrees Celsius.' }
    this.pwm_cycle_time = { value: van.state(undefined), required: true, default: 0.1, desc: 'Time in seconds for each software PWM cycle of the heater. It is not recommended to set this unless there is an electrical requirement to switch the heater faster than 10 times a second. The default is 0.100 seconds.' }
    this.min_extrude_temp = { value: van.state(undefined), required: true, default: 170, desc: 'The minimum temperature (in Celsius) at which extruder move commands may be issued. The default is 170 Celsius.' }
    this.min_temp = { value: van.state(undefined), required: true, desc: '' }
    this.max_temp = { value: van.state(undefined), required: true, desc: 'The maximum range of valid temperatures (in Celsius) that the heater must remain within. This controls a safety feature implemented in the micro-controller code - should the measured temperature ever fall outside this range then the micro-controller will go into a shutdown state. This check can help detect some heater and sensor hardware failures. Set this range just wide enough so that reasonable temperatures do not result in an error. These parameters must be provided.' }
    for (const p of Object.keys(this)) {
      if (p in options) {
        this[p].value = options[p]
      }
    }
  }

}
export class HeaterBed {

}
export class BedTilt {
  constructor(name = undefined, options={}) {
    this.name = van.state(name)
    this.x_adjust = {value: van.state(undefined), required: true, default: 0, desc: 'The amount to add to each move\'s Z height for each mm on the X axis. The default is 0.'}
    this.y_adjust = {value: van.state(undefined), required: true, default: 0, desc: 'The amount to add to each move\'s Z height for each mm on the Y axis. The default is 0.'}
    this.z_adjust = {value: van.state(undefined), required: true, default: 0, desc: 'The amount to add to the Z height when the nozzle is nominally at 0, 0. The default is 0. The remaining parameters control a BED_TILT_CALIBRATE extended g-code command that may be used to calibrate appropriate x and y adjustment parameters.'}
    this.points = {value: van.state(undefined), required: true, desc: 'A list of X, Y coordinates (one per line; subsequent lines indented) that should be probed during a BED_TILT_CALIBRATE command. Specify coordinates of the nozzle and be sure the probe is above the bed at the given nozzle coordinates. The default is to not enable the command. speed: 50 The speed (in mm/s) of non-probing moves during the calibration. The default is 50. horizontal_move_z: 5 The height (in mm) that the head should be commanded to move to just prior to starting a probe operation. The default is 5.'}
    for (const p of Object.keys(this)) {
      if (p in options) {
        this[p].value = options[p]
      }
    }
  }
}
export class BedScrews {
  constructor(name = undefined, options={}) {
    this.name = van.state(name)
    this.screw1 =             {value: van.state(undefined), required: true, desc: 'The X, Y coordinate of the first bed leveling screw. This is a position to command the nozzle to that is directly above the bed screw (or as close as possible while still being above the bed). This parameter must be provided.'}
    this.screw1_name =        {value: van.state(undefined), required: false, desc: 'An arbitrary name for the given screw. This name is displayed when the helper script runs. The default is to use a name based upon the screw XY location.'}
    this.screw1_fine_adjust = {value: van.state(undefined), required: false, desc: 'An X, Y coordinate to command the nozzle to so that one can fine tune the bed leveling screw. The default is to not perform fine adjustments on the bed screw.'}
    this.screw2 =             {value: van.state(undefined), required: true, desc: ""}
    this.screw2_name =        {value: van.state(undefined), required: false, desc: ""}
    this.screw2_fine_adjust = {value: van.state(undefined), required: false, desc: ""}
    this.screw3 =             {value: van.state(undefined), required: true, desc: ""}
    this.screw3_name =        {value: van.state(undefined), required: false, desc: ""}
    this.screw3_fine_adjust = {value: van.state(undefined), required: false, desc: ""}
    this.screw4 =             {value: van.state(undefined), required: false, desc: ""}
    this.screw4_name =        {value: van.state(undefined), required: false, desc: ""}
    this.screw4_fine_adjust = {value: van.state(undefined), required: false, desc: ""}
    this.horizontal_move_z =  {value: van.state(undefined), required: false, default: 5, desc: 'The height (in mm) that the head should be commanded to move to when moving from one screw location to the next. The default is 5.'}
    this.probe_height =       {value: van.state(undefined), required: false, default: 0, desc: 'The height of the probe (in mm) after adjusting for the thermal expansion of bed and nozzle. The default is zero.'}
    this.speed =              {value: van.state(undefined), required: false, default: 50, desc: 'The speed (in mm/s) of non-probing moves during the calibration. The default is 50.'}
    this.probe_speed =        {value: van.state(undefined), required: false, default: 5, desc: 'The speed (in mm/s) when moving from a horizontal_move_z position to a probe_height position. The default is 5.'}
    for (const p of Object.keys(this)) {
      if (p in options) {
        this[p].value = options[p]
      }
    }
  }
}
