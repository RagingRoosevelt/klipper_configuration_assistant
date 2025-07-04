import van from "../frameworks/van-1.5.5.js"
import {Toast} from './toast.js'
const { button, code, dialog, div, modal, h1 } = van.tags

export const Modal = (show, title, body) => {
  const toast_info = van.state({message: undefined, type: undefined})


  return dialog(

    {
      open: van.derive(()=>show.val),
      style: "flex-direction: column",
      onclick: (e) => {
        console.log(e.target, e.currentTarget)
        if (e.target === e.currentTarget) {
          show.val = false
        }
      }
    },
    div(
      {
        class: "app-modal"
      },
      h1(van.derive(()=>title.val)),
        code(
          {style: "white-space: pre;"},
          van.derive(()=>body.val)
        ),
      div(
        {class: "controls"},
        button({onclick: ()=>{
          toast_info.val = {
            message: "Copied to clipboard",
            type: "info",
          }
          navigator.clipboard.writeText(body.val)
        }}, "Copy"),
        button({onclick: ()=>show.val = false}, "Close")
      ),
    ),
    Toast(toast_info)
  )
}
