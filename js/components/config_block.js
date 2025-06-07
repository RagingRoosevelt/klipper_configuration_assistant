import van from "../frameworks/van-1.5.5.js"
const { details, div, form, input, label, option, optgroup, select, summary, textarea } = van.tags
import { INPUT_TYPE } from "../classes/config_blocks.js"

export const ConfigBlockItem = (input_var, label_str, tooltip_str, required, input_type, options) => {
  // console.log(label_str, input_var, options)
  const uuid = self.crypto.randomUUID()
  const input_label_name = `${label_str}-${uuid}`

  const elem_lbl = label(
    {
      for: input_label_name,
      ...(tooltip_str?{"data-tooltip": tooltip_str, "data-placement":"right"}:{})
    },
    van.derive(()=>`${label_str}`)
  )
  let elem_inpt

  console.log(label_str, input_type)
  if (options !== undefined || input_type===INPUT_TYPE.SELECT) {
    elem_inpt = select(
      {
        onchange: (e) => input_var.val = (e.target.value!=="")?e.target.value:undefined,
        name: input_label_name
      },
      ...options.map(
        (o)=>o.group?
          optgroup({label: `${o.group}`})
          :option({value: o.value||o.text}, o.text||o.value)
      )
    )
  } else if (input_type === INPUT_TYPE.MULTILINE) {
    elem_inpt = textarea(
      {
        onchange: (e) => input_var.val = (e.target.value !== "")?e.target.value:undefined,
        name: input_label_name,
        value: `${input_var.val||required?"--required--":""}`,
        cols: 10,
        rows: 6,

      }
    )
  }else {
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
      class: ["config-block-item", ...(required?["required"]:[])].join(" ")
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
  const required_props = Object.keys(o).filter((key)=>(key!=="name" && o[key].required))
  const optional_props = Object.keys(o).filter((key)=>(key!=="name" && !o[key].required))
  for (const k of Array.prototype.concat(required_props, optional_props)) {


    let show_property = false
    if (
      o[k].shown === undefined
      || o[k].shown === true
    ) {
      // console.log("We should show this...")
      show_property = true
    }
    // console.log(k, show_property, o[k].shown, o[k])

    if (show_property) {
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
          o[k].input_type||"TEXT",
          input_options
        )
      )
    }
  }


  return form(
    {class: "grid",},
    // {style: "display: flex; flex-direction: row; flex-wrap: wrap;"},
    ...properties
  )
}