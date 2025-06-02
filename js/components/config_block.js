import van from "../frameworks/van-1.5.5.js"
const { button, details, div, form, input, label, option, section, select, span, summary } = van.tags



export const ConfigBlock = (o, pinouts={}) => {
  console.log(pinouts['stepper'])
  let properties = []
  for (const k of Object.keys(o).filter((key)=>key!=="name")) {
    const tooltip = o[k].desc?{"data-tooltip": o[k].desc}:{}
    let input_elem;
    if (o[k].options) {
      input_elem = select(
        {
          required: o[k].required, 
          value: null, 
          onchange: (e) => o[k].value.val = e.target.value
        }, 
        option(),
        o[k].options.map(v=>option({"data-value": v},v))
      )
    } else if (o[k].pin_type) {
      const pin_type_key = o[k].pin_type.split(".")[0]
      let select_options;

      if (pin_type_key === "stepper") {
        const stepper_pin = o[k].pin_type.split(".")[1]
        select_options = pinouts.stepper.map(v=>option(v[stepper_pin]))
      } else {
        select_options = pinouts[pin_type_key].map(v=>option(v))
      }      

      input_elem = select(
        {
          required: o[k].required, 
          value: null,
          onchange: (e) => o[k].value.val = e.target.value
        }, 
        option(),
        select_options
      )
    } else  {
      input_elem = input({
        id: `${o.name.val.replace(" ","_")}-${k}`,
        style: "width: auto; height: calc(1rem * var(--pico-line-height) + var(--pico-border-width) * 2);", 
        value: o[k].value.val===undefined?"":o[k].value, 
        type: "text", 
        oninput: e=> o[k].value.val = e.target.value===""?undefined:e.target.value,
        required: o[k].required
      })
    }
    properties.push(div(
      {style: "padding: 5px;"},
      label({
        style: "display: inline-block; width: 20ch;", 
        for:`${o.name.val.replace(" ","_")}-${k}`,
        ...tooltip
      }, k), 
      // todo: need CSS for :invalid:required
      input_elem
    ))
  }




  let name_input = []
  if (o.name.val.split(" ")[0] === "mcu") {
    name_input.push(
      div(
        label({style: "display: inline-block; width: 20ch;", "data-tooltip": "Leave blank for primary MCU"}, "MCU name"),
        input({
          style: "width: auto; height: calc(1rem * var(--pico-line-height) + var(--pico-border-width) * 2);", 
          value: o.name.val.split(" ")[1], 
          oninput: (e)=>o.name.val = (
            e.target.value!==""?`${o.name.val.split(" ")[0]} ${e.target.value}`:o.name.val.split(" ")[0]
          )
        })
      )   
    )
  }


  return details(
    {
      open: true,
      style: "border: 1px dashed black; margin: 10px; padding: 10px; border-radius: 10px;"
    },
    summary(van.derive(() => `[${o.name.val}]`)),
    ...name_input,
    form(
      {style: "display: flex; flex-direction: row; flex-wrap: wrap;"},
      ...properties
    )
  )
}