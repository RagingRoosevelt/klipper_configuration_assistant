export const prepare_pin_options = (pin_type, pinouts) => {
    const pin_type_key = pin_type.split(".")[0]
    let input_options

    if (pin_type_key === "stepper") {
        const stepper_pin = pin_type.split(".")[1]
        input_options = []
        for (const source of Object.values(pinouts)) {
            if (source.stepper.length > 0) {
                input_options.push({group: `${source.shortname}`})
                input_options = input_options.concat(
                    source.stepper.map(v => {return { value: v[stepper_pin], text: `${v[stepper_pin]} - ${v.name}`}})
                )
            }
        }
    } else {
        input_options = []
        for (const source of Object.values(pinouts)) {
        if (source[pin_type].length > 0)
        input_options.push({group: `${source.shortname}`})
        input_options = input_options.concat(
            source[pin_type].map(v => {return { value: v.pin, text: `${v.pin} - ${v.name}`}})
        )
        }
    }
    return input_options
}


export const config_block_str = (config_block_list, include_comments=true)=>{
    let s = ""
    for (const block of Object.values(config_block_list)) {
        s = `${s}\n[${block.name.val}]`
        for (const [prop_key, prop] of Object.entries(block).filter(([k,p])=>k!=="name")) {
            if (prop_key === "gcode") {
                s = `${s}\n${prop_key}:`
                if (prop.value.val !== undefined) {
                    s = `${s}\n  ${prop.value.val.split("\n").join("\n  ")}`
                }
            } else if (prop.value.val !== undefined) {
                s = `${s}\n${prop_key}: ${prop.value.val}`
            } else if (prop.value.val === undefined && prop.required) {
                s = `${s}\n${prop_key}: --required--`
            }

            if (
              include_comments
              && prop.desc !== undefined
              && (prop.value.val !== undefined || prop.required)
            ) {
                s = `${s}\n  # ${prop.desc.replaceAll("\n","\n  # ")}`
            }
        }
        s = `${s}\n`
    }
    return s
}