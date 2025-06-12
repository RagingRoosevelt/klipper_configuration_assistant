import van from "../frameworks/van-1.5.5.js"
import * as BlockDefs from "../classes/config_blocks.js"
import {Pinout} from "../classes/pinout.js"
import {Modal} from './modal.js'
import {Mcu, Printer, Stepper, Extruder, HeaterBed} from '../classes/config_blocks.js'
import {Toast} from './toast.js'
import {ConfigBlock} from './config_block.js'
import {ConfigBlockMcu} from './config_block_mcu.js'
import {ConfigBlockStepper} from './config_block_stepper.js'
import {ConfigBlockExtruder} from './config_block_extruder.js'
import {ConfigBlockPrinter} from './config_block_printer.js'
import {ConfigBlockBedLevel} from './config_block_bed_level.js'
import {ConfigBlockBedTilt} from './config_block_bed_tilt.js'
import {ConfigBlockBedMesh} from './config_block_bed_mesh.js'
import {ConfigBlockBedScrews} from './config_block_bed_screws.js'
import {ConfigBlockScrewsTiltAdjust} from './config_block_screws_tilt_adjust.js'
import {ConfigBlockZTilt} from './config_block_z_tilt.js'
import {mcu_pinouts} from '../data/mcus.js'
import {ConfigBlockQuadGantryLevel} from "./config_block_quad_gantry_level.js"
import { ConfigBlockZThermalAdjust } from "./config_block_z_thermal_adjust.js"
const { details, div, form, input, label, option, optgroup, select, summary, h1, button } = van.tags


export const ConfigFile = (filename, file_str, pinouts) => {

    const config_block_str = (config_block_list)=>{
        let s = ""
        for (const block of Object.values(config_block_list)) {
        s = `${s}\n[${block.name.val}]`
        // console.log(Object.entries(block).filter(([k,p])=>k!=="name"))
        for (const [prop_key, prop] of Object.entries(block).filter(([k,p])=>k!=="name")) {
            // console.log(prop_key, prop)
            if (prop.value.val !== undefined) {
                s = `${s}\n${prop_key}: ${prop.value.val}`
            } else if (prop.value.val === undefined && prop.required) {
                s = `${s}\n${prop_key}: --required--`
            }

            if (prop.desc !== undefined && (prop.value.val !== undefined || prop.required)) {
                s = `${s}\n  # ${prop.desc.replaceAll("\n","\n  # ")}`
            }
        }
            s = `${s}\n`
        }
        return s
    }

    const modal_info = {
        show: van.state(false),
        title: van.state(""),
        body: van.state(""),
    }
    document.addEventListener("keydown", (e)=>{
        if (e.key === "Escape") {
            modal_info.show.val = false
        }
    })

    // van.derive(()=>console.log(modal_info.show.val, modal_info.title.val, modal_info.body.val))


    let config_block_instances = []
    let block_data = []
    let selected_mcus = []
    for (const [idx, [Block, Elem]] of [
        [BlockDefs.Printer, ConfigBlockPrinter],
        [BlockDefs.Mcu, ConfigBlockMcu],
        [BlockDefs.Stepper, ConfigBlockStepper],
        [BlockDefs.Extruder, ConfigBlockExtruder],
        // [BlockDefs.BedMesh, ConfigBlockBedMesh],
        [BlockDefs.BedTilt, ConfigBlockBedTilt],
        [BlockDefs.BedScrews, ConfigBlockBedScrews],
        [BlockDefs.ScrewsTiltAdjust, ConfigBlockScrewsTiltAdjust],
        [BlockDefs.ZTilt, ConfigBlockZTilt],
        [BlockDefs.QuadGantryLevel, ConfigBlockQuadGantryLevel],
        [BlockDefs.ZThermalAdjust, ConfigBlockZThermalAdjust],
        // [BlockDefs.SafeZHome, ConfigBlockSafeZHome],
        // [BlockDefs.HomingOverride, ConfigBlockHomingOverride],
        // [BlockDefs.EndstopPhase, ConfigBlockEndstopPhase],
        // [BlockDefs.ZTilt, ConfigBlockZTilt],
    ].entries()) {
        // const [Block, Elem] = Block_Elem
        const block_type = Block.prototype.constructor.name

        if (block_type === "Mcu") {
            selected_mcus.push(van.state(undefined))
        }

        const elem_options = {
            pinouts: Object.keys(mcu_pinouts)
                .filter(key => ["ldo_leviathan", "ldo_picobilical", "fysetc_spyder_2_2"].includes(key))
                .reduce(
                    (obj, key) => {
                        obj[key] = mcu_pinouts[key];
                        return obj;
                    },
                    {}
                ),
            open: (block_type === "Extruder"),
        }

        const data = (block_type === "Mcu")?new Block(""):new Block("--required--")
        const elem = (
            (block_type === "Mcu")?
                Elem(data, elem_options, (new_mcu)=>changed_mcu_selection(idx, new_mcu))
                :Elem(data, elem_options)
        )

        block_data.push(data)

        config_block_instances.push(elem)
    }


    return details(
        {
            open: true,
            class: 'config-file',
        },
        summary(h1(van.derive(()=>`${filename.val}`))),
        button(
            {
                onclick: ()=>{
                    // console.log(block_data)
                    modal_info.show.val = true
                    // const code_block_str = config_blocks.map(b=>config_block(b)).join("\n")
                    file_str.val = config_block_str(block_data)
                    modal_info.title.val = `${filename.val}`
                    modal_info.body.val = file_str.val
                }
            },
            "Show cfg file"
        ),
        form(
            {class:"mcu-selection"},
            label(
                {for: van.derive(()=>`${filename.val}-primary-mcu`)},
                "Primary MCU"
            ),
            select(
                {name: van.derive(()=>`${filename.val}-primary-mcu`)},
                ...Object.entries(pinouts).map(
                    ([k, o])=>option({value: k}, o.name)
                )
            )
        ),
        ...config_block_instances,
        Modal(modal_info.show, modal_info.title, modal_info.body)
    )

}
