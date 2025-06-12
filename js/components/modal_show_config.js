import van from "../frameworks/van-1.5.5.js"
import {Toast} from './toast.js'
import { config_block_str } from "../utils.js"
const { button, code, dialog, div, modal, h1, label, input } = van.tags

export const Modal = (show, filename, config_blocks) => {
  const toast_info = van.state({message: undefined, type: undefined})
  const config_block_show_comments = van.state(false)
  const config_blocks_string = van.state(
    config_block_str(config_blocks, config_block_show_comments.val)
  )

  van.derive(()=>{
    config_blocks_string.val = config_block_str(config_blocks, config_block_show_comments.val)
  })

  return dialog(
    {
      open: van.derive(()=>show.val),
      style: "flex-direction: column",
      onclick: (e) => {
        if (e.target === e.currentTarget) {
          show.val = false
        }
      }
    },
    div(
      {
        class: "app-modal"
      },
      h1(van.derive(()=>filename.val)),
        code(
          {style: "white-space: pre;"},
          van.derive(()=>config_blocks_string.val)
        ),
      div(
      ),
      div(
        {class: "controls"},

        label("Show config descriptions"),
        input(
            {
                type: "checkbox",
                role: "switch",
                checked: config_block_show_comments.val,
                onchange: (e)=>{
                    config_block_show_comments.val = e.target.checked
                }
            },
        ),
        button({onclick: ()=>{
          toast_info.val = {
            message: "Copied to clipboard",
            type: "info",
          }
          navigator.clipboard.writeText(config_blocks_string.val)
        }}, "Copy"),
        button({onclick: ()=>show.val = false}, "Close")
      ),
    ),
    Toast(toast_info)
  )
}
