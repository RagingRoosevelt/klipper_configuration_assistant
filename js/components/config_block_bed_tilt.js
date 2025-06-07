import van from "../frameworks/van-1.5.5.js"
import { ConfigBlock } from "./config_block.js"
const { details, summary, div, label, input, select, option, h1 } = van.tags

export const ConfigBlockBedTilt = (cfg_blk, options) => {
    // console.log(cfg_blk)
    return details(
        {
            class: "config-block bed-level",
            open: options.open!==undefined?options.open:true,
        },
        summary(h1(`[${cfg_blk.name.val}]`)),
        ConfigBlock(cfg_blk, options.pinouts)
    )
}


