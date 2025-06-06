import van from "../frameworks/van-1.5.5.js"
import { ConfigBlock } from "./config_block.js"
const { details, summary, div, label, input, select, option, h1, code } = van.tags

export const ConfigBlockPrinter = (o, options) => {
    return details(
        {
            class: "config-block printer",
            style: "border: 1px dashed black; margin: 10px; padding: 10px; border-radius: 10px;",
            open: true,
            style: ""
        },
        summary(h1(`[${o.name.val}]`)),
        ConfigBlock(o, options.pinouts)
    )
}


