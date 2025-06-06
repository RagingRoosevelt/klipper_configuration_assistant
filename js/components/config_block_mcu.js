import van from "../frameworks/van-1.5.5.js"
import { ConfigBlock } from "./config_block.js"
const { details, summary, div, label, input, select, option, h2, code } = van.tags

export const ConfigBlockMcu = (o, options, mcu_selection_callback) => {
    console.log(`'${o.name.val}'`)

    const mcu_name_input_value = van.state(o.name.val!=="mcu"?o.name.val.split(" ")[1]:"")

    van.derive(()=>{
      if (mcu_name_input_value.val === "" || mcu_name_input_value.val === undefined) {
        o.name.val = "mcu"
      } else {
        o.name.val = `mcu ${mcu_name_input_value.val}`
      }
    })

    return details(
        {
          class: "config-block mcu",
          style: "border: 1px dashed black; margin: 10px; padding: 10px; border-radius: 10px;",
          open: true,
          style: ""
        },
        summary(h2(van.derive(() => `[${o.name.val}]`))),
        div(
            label({"data-tooltip": "Leave blank for primary MCU"}, "MCU name"),
            input({
              value: mcu_name_input_value.val,
              oninput: (e)=>mcu_name_input_value.val = e.target.value
            })
          ),
          div(
            label({style: "display: inline-block; width: 20ch;",}, "MCU Model"),
            select(
              {
                onchange: (e) => {
                  mcu_selection_callback(e.target.value)
                }
              },
              option(),
              Object.entries(options.pinouts).map(([k,v])=>option({value: k}, v.name))
            )
          ),
          ConfigBlock(o, options.pinouts)
    )
}


