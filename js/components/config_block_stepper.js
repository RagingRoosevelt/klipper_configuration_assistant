import van from "../frameworks/van-1.5.5.js"
import { ConfigBlock } from "./config_block.js"
const { details, summary, div, label, input, select, option, h2 } = van.tags

export const ConfigBlockStepper = (o, options) => {
  const pinouts = options.pinouts.ldo_leviathan
  Object.keys(o).filter((v)=>v!=="name").forEach((k)=>{
    let input_options
    if (o[k].pin_type) {
        const pin_type = o[k].pin_type
        const pin_type_key = pin_type.split(".")[0]

        if (pin_type_key === "stepper") {
            const stepper_pin = o[k].pin_type.split(".")[1]
            input_options = []
            for (const source of Object.values(options.pinouts)) {
                if (source.stepper.length > 0) {
                    input_options.push({group: `${source.shortname}`})
                    input_options = input_options.concat(
                        source.stepper.map(v => {return { value: v[stepper_pin], text: `${v[stepper_pin]} - ${v.name}`}})
                    )
                }
            }

        } else {
          input_options = []
          for (const source of Object.values(options.pinouts)) {
            if (source[pin_type].length > 0)
            input_options.push({group: `${source.shortname}`})
            input_options = input_options.concat(
                source[pin_type].map(v => {return { value: v.pin, text: `${v.pin} - ${v.name}`}})
            )
          }
        }
    } else {
        input_options = undefined
    }
    o[k] = {
        options: input_options,
        ...o[k]
    }
  })



    return details(
        {
            class: "config-block stepper",
            open: options.open!==undefined?options.open:true,
        },
        summary(h2(van.derive(() => `[${o.name.val}]`))),
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


