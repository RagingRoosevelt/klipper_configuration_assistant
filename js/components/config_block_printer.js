import van from "../frameworks/van-1.5.5.js"
import { ConfigBlock } from "./config_block.js"
const { details, summary, div, label, input, select, option } = van.tags

export const ConfigBlockPrinter = (mcu_selection, o, pinouts) => {
    console.log(Object.entries(pinouts).map(([k,v])=>option({value: k}, v.name)))
    return details(
        {
            style: "border: 1px dashed black; margin: 10px; padding: 10px; border-radius: 10px;",
            open: true,
            style: ""
        },
        summary(`[${o.name.val}]`),
        ConfigBlock(o, pinouts)
    )
}


