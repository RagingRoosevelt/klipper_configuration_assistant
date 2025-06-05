import van from "../frameworks/van-1.5.5.js"
import { ConfigBlock } from "./config_block.js"
const { details, summary, div, label, input, select, option } = van.tags

export const ConfigBlockMcu = (o, options) => {
    return details(
        {
          class: "config-block mcu",
          style: "border: 1px dashed black; margin: 10px; padding: 10px; border-radius: 10px;",
          open: true,
          style: ""
        },
        summary(van.derive(() => `[${o.name.val}]`)),
        div(
            label({style: "display: inline-block; width: 20ch;", "data-tooltip": "Leave blank for primary MCU"}, "MCU name"),
            input({
              style: "width: auto; height: calc(1rem * var(--pico-line-height) + var(--pico-border-width) * 2);",
              value: o.name.val.split(" ")[1],
              oninput: (e)=>o.name.val = (
                e.target.value!==""?`${o.name.val.split(" ")[0]} ${e.target.value}`:o.name.val.split(" ")[0]
              )
            })
          ),
          div(
            label({style: "display: inline-block; width: 20ch;",}, "MCU Model"),
            select(
              option(),
              Object.entries(options.pinouts).map(([k,v])=>option({value: k}, v.name))
            )
          ),
          ConfigBlock(o, options.pinouts)
    )
}


