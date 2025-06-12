import van from "../frameworks/van-1.5.5.js"
import { ConfigBlock } from "./config_block.js"
const { details, summary, div, label, input, select, option, h2, code } = van.tags

export const ConfigBlockGcodeMacro = (o, options, mcu_selection_callback) => {
    // console.log(`'${o.name.val}'`)

    const macro_name_input_value = van.state(o.name.val!=="gcode_macro"?o.name.val.split(" ")[1]:"")

    van.derive(()=>{
      if (macro_name_input_value.val === "" || macro_name_input_value.val === undefined) {
        o.name.val = "gcode_macro --required--"
      } else {
        o.name.val = `gcode_macro ${macro_name_input_value.val}`
      }
    })

    return details(
        {
          class: "config-block gcode_macro",
          open: options.open!==undefined?options.open:true,
        },
        summary(h2(van.derive(() => `[${o.name.val}]`))),
        div(
            label("Macro name"),
            input({
              value: (macro_name_input_value.val!==undefined)?macro_name_input_value.val:"",
              oninput: (e)=>macro_name_input_value.val = e.target.value
            })
          ),
          ConfigBlock(o, options.pinouts)
    )
}
