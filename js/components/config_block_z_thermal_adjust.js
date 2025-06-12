import van from "../frameworks/van-1.5.5.js"
import { prepare_pin_options } from "../utils.js"
import { ConfigBlock } from "./config_block.js"
const { details, summary, h2 } = van.tags

export const ConfigBlockZThermalAdjust = (cfg_blk, options) => {
    Object.keys(cfg_blk).filter((v)=>v!=="name").forEach((k)=>{
      let input_options
      if (cfg_blk[k].pin_type) {
          input_options = prepare_pin_options(cfg_blk[k].pin_type, options.pinouts)
      } else {
          input_options = undefined
      }
      cfg_blk[k] = {
          options: input_options,
          ...cfg_blk[k]
      }
    })
    return details(
        {
            class: "config-block z_thermal_adjust",
            open: options.open!==undefined?options.open:true,
        },
        summary(h2(`[${cfg_blk.name.val}]`)),
        ConfigBlock(cfg_blk, options.pinouts)
    )
}
