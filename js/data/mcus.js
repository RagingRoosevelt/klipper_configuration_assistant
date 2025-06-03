import { Pinout } from "../classes/pinout.js"

export const mcu_pinouts = {
  ldo_leviathan: new Pinout(
    "LDO Leviathan v1.2",
    "Leviathan",
    "https://github.com/MotorDynamicsLab/Leviathan/blob/master/Manual/Leviathan_V1.2_Manual.pdf",
    {
      stepper: [
        { en: 'pd7', step: 'pd4', dir: 'pd3', diag: 'pd6', uart: 'pd5', name: "Stepper0 / Stepper Z", note: "TMC2209" }, //stepper0
        { en: 'pd2', step: 'pc12', dir: 'pc11', diag: 'pd1', uart: 'pd0', name: "Stepper1 / Stepper Z1", note: "TMC2209" }, //stepper1
        { en: 'pc10', step: 'pc9', dir: 'pc8', diag: 'pa15', uart: 'pa8', name: "Stepper2 / Stepper Z2", note: "TMC2209" }, //stepper2
        { en: 'pc7', step: 'pg7', dir: 'pg6', diag: 'pc6', uart: 'pg8', name: "Stepper3 / Stepper Z3", note: "TMC2209" }, //stepper3
        { en: 'pd13', step: 'pd10', dir: 'pd9', diag: 'pd12', uart: 'pd11', name: "Stepper4 / Extruder", note: "TMC2209" }, // stepper4
        { en: 'pg0', step: 'pb10', dir: 'pb11', diag: 'pg1', uart: '', name: "HV_Stepper0 / Stepper X", note: "TMC5160" },
        { en: 'pe9', step: 'pf15', dir: 'pf14', diag: 'pe10', uart: '', name: "HV_Stepper1 / Stepper Y", note: "TMC5160" },
      ],
      fan: [
        { pwm: 'pb7', tach: 'pb8', name: "Fan0" },//fan0
        { pwm: 'pb3', tach: 'pb4', name: "Fan1" },//fan1
        { pwm: 'pf7', tach: 'pf6', name: "Fan2" },//fan2
        { pwm: 'pf9', tach: 'pf8', name: "Fan3" },//fan3
      ],
      endstop: [
        { pin: 'pc1', name: "X" }, //x
        { pin: 'pc2', name: "Y" }, //y
        { pin: 'pc3', name: "Z" }, //z
        { pin: 'pf1', name: "Z-Probe" },  // z-probe
        { pin: 'pc0', name: "Filament Sensor" }, // filament sensor
      ],
      thermistor: [
        { pin: 'pa1', name: "TH0" }, //th0
        { pin: 'pa2', name: "TH1" }, //th1
        { pin: 'pa0', name: "TH2" }, //th2
        { pin: 'pa3', name: "TH3" }, //th3
      ],
      neopixel: [
        { pin: 'pf10', name: "" },
      ],
      heatbed: [
        { pin: 'pg11', name: "" },
      ],
      hotend: [
        { pin: 'pg10', name: "" },
      ]
  }),
  fysetc_spyder_2_2: new Pinout(
    "Fysetc Spyder 2.2",
    "Spyder",
    "https://github.com/FYSETC/FYSETC-SPIDER/blob/main/images/Spider_V2.2_Pinout.jpg",
    {
      stepper: [
        { en: 'pc5', step: 'pe1', dir: 'pe0', diag: '', uart: '', name: "M8 / E4-MOT" }, //stepper e4-mot
        { en: 'pe8', step: 'pd12', dir: 'pc4', diag: '', uart: '', name: "M7 / E3-MOT" }, //stepper e3-mot
        { en: 'pe3', step: 'pe2', dir: 'pe4', diag: '', uart: '', name: "M6 / E2-MOT" }, //stepper e2-mot
        { en: 'pe5', step: 'pe6', dir: 'pc13', diag: '', uart: '', name: "M5 / E1-MOT" }, //stepper e1-mot
        { en: 'pd4', step: 'pd5', dir: 'pd6', diag: '', uart: '', name: "M4 / E0-MOT" }, //stepper e0-mot
        { en: 'pd15', step: 'pd14', dir: 'pd13', diag: '', uart: '', name: "M3 / Z-MOT" }, //stepper z-mot
        { en: 'pd9', step: 'pd8', dir: 'pb12', diag: '', uart: '', name: "M2 / Y-MOT", note: '60Vmax' }, //stepper y-mot
        { en: 'pe9', step: 'pe11', dir: 'pe10', diag: '', uart: '', name: "M1 / X-MOT", note: '60Vmax' }, //stepper x-mot
      ],
      fan: [
        { pwm: 'pa13', name: 'V-Fan0' },
        { pwm: 'pa14', name: 'V-Fan1' },
        { pwm: 'pb2', name: 'V-Fan2' },
      ],
      thermistor: [
        { pin: 'pc0', name: 'TE0' },
        { pin: 'pc1', name: 'TE1' },
        { pin: 'pc2', name: 'TE2' },
        { pin: 'pc3', name: 'TE3' },
        { pin: 'pb1', name: 'TE4' },
        { pin: 'pb0', name: 'TB' },
      ],
      endstop: [
        { pin: 'pa1', name: 'X+' },
        { pin: 'pb14', name: 'X-' },
        { pin: 'pa2', name: 'Y+' },
        { pin: 'pb13', name: 'Y-' },
        { pin: 'pa3', name: 'Z+' },
        { pin: 'pa0', name: 'Z-' },
      ],
      heatbed: [
        { pin: 'pb4', name: "Bed Out" },
      ],
      hotend: [
        { pin: 'pb3', name: "E2 Out" },
        { pin: 'pc8', name: "E1 Out" },
        { pin: 'pb15', name: "E0 Out" },
      ],
      neopixel: [
        { pin: 'pd3', name: "" }
      ],
    }
  ),
  ldo_picobilical: new Pinout(
    "LDO Picobilical",
    "Picobilical",
    "",
    {

    }
  )
}