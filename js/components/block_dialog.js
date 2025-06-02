import van from "/js/van-1.5.5.js"
import {Mcu, Printer, Stepper, Extruder, HeaterBed} from "/js/classes.js"
const {
  div, details, summary, dialog, select, option
} = van.tags

const map = {

}



export const BlockDialog = () => {
    const handle_type_selection = (e) => {
        console.log(e)
    }

    return dialog(
        select(
            {oninput: (e)=>handle_type_selection(e)},
            option("Mcu"),
            option("Printer"),
            option("Stepper"),
            option("Extruder"),
        )
    )
}