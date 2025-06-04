import van from "../frameworks/van-1.5.5.js"
const { button, code, dialog, div, modal } = van.tags

export const Modal = (show, modal_info, toast_info) => {
  return dialog(
    {open: van.derive(()=>show.val),style: "flex-direction: column"},
    div(
      code(
        {style: "white-space: pre;"},
        van.derive(()=>modal_info.val.body)
      )
    ),
    div(
      button({onclick: ()=>{
        toast_info.val = {
          message: "Copied to clipboard",
          type: "info",
        }
        navigator.clipboard.writeText(modal_info.val.body)
      }}, "Copy"),
      button({onclick: ()=>show.val = false}, "Close")
    )
  )
}
