import van from "../frameworks/van-1.5.5.js"
const { button, code, dialog, div, modal } = van.tags

export const Modal = (show, modal_info) => {
  return dialog(
    {open: van.derive(()=>show.val),style: "flex-direction: column"},
    div(
      code(
        {style: "white-space: pre;"},
        van.derive(()=>modal_info.val.body)
      )
    ),
    div(
      button({onclick: ()=>navigator.clipboard.writeText(modal_info.val.body)}, "Copy"),
      button({onclick: ()=>show.val = false}, "Close")
    )
  )
}
