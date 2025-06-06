import van from "../frameworks/van-1.5.5.js"
const { details, div, form, input, label, option, optgroup, select, summary } = van.tags


export const ConfigBlockItem = (input_var, label_str, tooltip_str, required, options) => {
  // console.log(label_str, input_var, options)
  const uuid = self.crypto.randomUUID()
  const input_label_name = `${label_str}-${uuid}`

  const elem_lbl = label(
    {
      for: input_label_name,
      ...(tooltip_str?{"data-tooltip": tooltip_str}:{})
    },
    van.derive(()=>`${label_str}`)
  )
  let elem_inpt

  if (options !== undefined) {
    elem_inpt = select(
      { onimput: (e) => o.value.val = e.target.value, name: input_label_name },
      ...options.map(o=>o.group?optgroup({label: `${o.group}`}):option({value: o.value||o.text}, o.text||o.value))
    )
  } else {
    elem_inpt = input(
      {
        onchange: (e) => input_var.val = e.target.value,
        required: required,
        name: input_label_name,
      },
      `${input_var.val}`
      )
  }


  return div(
    {
      class: "config-block-item"
    },
    elem_lbl,
    elem_inpt,
  )
}

// todo: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select
export const ConfigBlock = (o, pinouts={}) => {
  pinouts = pinouts.ldo_leviathan
  // console.log("data in config_block.js", o)
  let properties = []
  for (const k of Object.keys(o).filter((key)=>key!=="name")) {
    // console.log(k)
    const tooltip = o[k].desc?{"data-tooltip": o[k].desc}:{}
    let input_elem;

    let options
    if (o[k].options) {

    }

    if (o[k].options) {
      input_elem = select(
        {
          required: o[k].required,
          value: null,
          onchange: (e) => o[k].value.val = e.target.value
        },
        option(o[k].required?"--required--":""),
        o[k].options.map(v=>option({"data-value": v},v))
      )
    } else if (o[k].pin_type) {
      const pin_type_key = o[k].pin_type.split(".")[0]
      let select_options;

      if (pin_type_key === "stepper" && pinouts && pinouts.stepper) {
        const stepper_pin = o[k].pin_type.split(".")[1]
        select_options = pinouts.stepper.map(v=>option({value:v[stepper_pin]}, `${v[stepper_pin]} - ${v.name}`))
      } else if (pinouts && pinouts[pin_type_key]) {
        select_options = pinouts[pin_type_key].map(v=>option({value:v.pin}, `${v.pin} - ${v.name}`))
      }

      input_elem = select(
        {
          required: o[k].required,
          value: null,
          onchange: (e) => o[k].value.val = e.target.value
        },
        option(o[k].required?"--required--":""),
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

    // properties.push(div(
    //   {style: "padding: 5px;"},
    //   label({
    //     style: "display: inline-block; width: 20ch;",
    //     for:`${o.name.val.replace(" ","_")}-${k}`,
    //     ...tooltip
    //   }, k),
    //   // todo: need CSS for :invalid:required
    //   input_elem
    // ))
    let input_options = undefined
    if (o[k].options){
      if (o[k].required) {
        input_options = [{text: "--required--"}, ...o[k].options]
      } else {
        input_options = [{text: ""}, ...o[k].options]
      }
    }
    properties.push(
      ConfigBlockItem(
        o[k].value,
        k,
        o[k].desc,
        o[k].required,
        input_options
      )
    )
  }







  return     form(
    {class: "grid",},
    // {style: "display: flex; flex-direction: row; flex-wrap: wrap;"},
    ...properties
  )
}