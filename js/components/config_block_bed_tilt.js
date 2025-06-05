import van from "../frameworks/van-1.5.5.js"
import { ConfigBlock } from "./config_block.js"
const { details, summary, div, label, input, select, option } = van.tags

export const ConfigBlockBedTilt = (cfg_blk, options) => {
    return details(
        {
            class: "config-block bed-level",
            style: "border: 1px dashed black; margin: 10px; padding: 10px; border-radius: 10px;",
            open: true,
            style: ""
        },
        summary(van.derive(()=>{
            return `[${cfg_blk.name.val}]`
        })),
        label("Config type:"),
        select(
            {
                onchange: (e)=>{
                    cfg_blk.name.val = e.target.value
                }
            },
            option(""),
            option("bed_mesh"),
            option("bed_tilt"),
            option("bed_screws"),
            option("screws_tilt_adjust"),
            option("z_tilt"),
            option("quad_gantry_level"),
            option("skew_correction"),
            option("z_termal_adjust"),
        ),
        ConfigBlock(cfg_blk.name, options.pinouts)
    )
}


