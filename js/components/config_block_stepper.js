import van from "../frameworks/van-1.5.5.js"
import { ConfigBlock } from "./config_block.js"
const { details, summary, div, label, input, select, option } = van.tags

export const ConfigBlockStepper = (mcu_selection, o, pinouts) => {
    console.log(Object.entries(pinouts).map(([k,v])=>option({value: k}, v.name)))
    return details(
        {
            style: "border: 1px dashed black; margin: 10px; padding: 10px; border-radius: 10px;",
            open: true,
            style: ""
        },
        summary(van.derive(() => `[${o.name.val}]`)),
        div(
            label({style: "display: inline-block; width: 20ch;", "data-tooltip": "Leave blank for primary MCU"}, "Stepper role"),
            select(
                {
                    style: "width: auto; height: calc(1rem * var(--pico-line-height) + var(--pico-border-width) * 2);",
                    value: o.name.val.split(" ")[1],
                    oninput: (e)=>o.name.val = (
                        e.target.value!=="--required--"?e.target.value:undefined
                    )
                },
                option("--required--"),
                option("stepper_x"),
                option("stepper_y"),
                option("stepper_z"),
                option("stepper_z1"),
                option("stepper_a"),
                option("stepper_b"),
                option("stepper_c"),
                option("stepper_a"),
                option("stepper_left"),
                option("stepper_right"),
                option("stepper_a"),
                option("stepper_bed"),
                option("stepper_arm"),
            )
          ),
          ConfigBlock(o, pinouts)
    )
}


