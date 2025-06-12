import van from "../frameworks/van-1.5.5.js"
import { prepare_pin_options } from "../utils.js"
import { ConfigBlock } from "./config_block.js"
const { details, summary, div, label, input, select, option, h2, code } = van.tags

export const ConfigBlockExtruder = (cfg_blk, options) => {
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

    // console.log(cfg_blk)
    return details(
        {
            class: "config-block extruder",
            open: options.open!==undefined?options.open:true,
        },
        summary(h2(`[${cfg_blk.name.val}]`)),
        ConfigBlock(cfg_blk, options.pinouts)
    )
}
