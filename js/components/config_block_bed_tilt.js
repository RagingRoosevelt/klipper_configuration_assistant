import van from "../frameworks/van-1.5.5.js"
import { ConfigBlock } from "./config_block.js"
const { details, summary, h2 } = van.tags

export const ConfigBlockBedTilt = (cfg_blk, options) => {
    return details(
        {
            class: "config-block bed_tilt",
            open: options.open!==undefined?options.open:true,
        },
        summary(h2(`[${cfg_blk.name.val}]`)),
        ConfigBlock(cfg_blk, options.pinouts)
    )
}


