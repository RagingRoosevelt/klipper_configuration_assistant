import van from "../frameworks/van-1.5.5.js"
import { ConfigBlock } from "./config_block.js"
const { details, summary, div, label, input, select, option, h2, code } = van.tags

export const ConfigBlockPrinter = (o, options) => {
    return details(
        {
            class: "config-block printer",
            open: options.open!==undefined?options.open:true,
        },
        summary(h2(`[${o.name.val}]`)),
        ConfigBlock(o, options.pinouts)
    )
}


