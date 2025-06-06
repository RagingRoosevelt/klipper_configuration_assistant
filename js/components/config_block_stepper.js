import van from "../frameworks/van-1.5.5.js"
import { ConfigBlock } from "./config_block.js"
const { details, summary, div, label, input, select, option } = van.tags

export const ConfigBlockStepper = (o, options) => {
  const pinouts = options.pinouts.ldo_leviathan
  Object.keys(o).filter((v)=>v!=="name").forEach((k)=>{
    let input_options
    if (o[k].pin_type) {
        const pin_type = o[k].pin_type
        const pin_type_key = pin_type.split(".")[0]

        if (pin_type_key === "stepper") {
            const stepper_pin = o[k].pin_type.split(".")[1]
            input_options = pinouts.stepper.map(v => {return { value: v[stepper_pin], text: `${v[stepper_pin]} - ${v.name}`}})
        } else {
          input_options = []
          for (const source of Object.values(options.pinouts)) {
            input_options.push(optgroup({label: `${source.shortname}`}))
            input_options = pinouts[pin_type].map(v => {return { value: v.pin, text: `${v.pin} - ${v.name}`}})
          }
        }
    } else {
        input_options = undefined
    }
    console.log(k, o[k], input_options)
    o[k] = {
        ...input_options,
        ...o[k]
    }
  })


    console.log("modified object", o)
    console.log(o.name.val)




    return details(
        {
            class: "config-block stepper",
            open: true,
        },
        summary(van.derive(() => `[${o.name.val}]`)),
        div(
            label({ style: "display: inline-block; width: 20ch;", "data-tooltip": "Leave blank for primary MCU" }, "Stepper role"),
            select(
                {
                    style: "width: auto;",
                    value: o.name.val.split(" ")[1],
                    oninput: (e) => o.name.val = (
                        e.target.value !== "--required--" ? e.target.value : undefined
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


