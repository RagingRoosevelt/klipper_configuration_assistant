import van from "../frameworks/van-1.5.5.js"
import { ConfigBlock } from "./config_block.js"
const { details, summary, div, label, input, select, option } = van.tags

export const ConfigBlockStepper = (o, options) => {
    return details(
        {
            class: "config-block stepper",
            open: true,
        },
        summary(van.derive(() => `[${o.name.val}]`)),
        div(
            label({style: "display: inline-block; width: 20ch;", "data-tooltip": "Leave blank for primary MCU"}, "Stepper role"),
            select(
                {
                    style: "width: auto;",
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
          ConfigBlock(o, options.pinouts)
    )
}


