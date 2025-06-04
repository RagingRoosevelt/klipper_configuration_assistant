import van from "../frameworks/van-1.5.5.js"
const { button, code, dialog, div, modal, span } = van.tags

export const Toast = (toast_info) => {
  const toast_timeout_duration = 100000
  let toast_timeout_countdown = undefined
  let message_queue = []
  const message_to_show = van.state(null)
  const message_color = {bg: van.state("#00ff00"), t: van.state("#ff0000")}
  const is_visible = van.state(false)

  const clear_toast = () => {
    is_visible.val = false
    clearTimeout(toast_timeout_countdown)

    show_message()
  }

  const show_message = () => {
    if (is_visible.val === false && message_queue.length > 0) {
      const message = message_queue.pop()
      message_to_show.val = message.message
      message_color.bg.val = message_color_options[message.type].bg
      message_color.t.val = message_color_options[message.type].t
      is_visible.val = true
      toast_timeout_countdown = setTimeout(clear_toast, toast_timeout_duration)
    }
  }

  van.derive(()=>{
    if (toast_info.val.message && toast_info.val.message.length>0) {
      message_queue.push(toast_info.val)
      show_message()
    }
  })
  const message_color_options = {
    "warning": {
      bg: "var(--pico-contrast)", 
      t: "hsl(from var(--pico-contrast-inverse) 35 s l)"
    },
    "info": {
      bg: "var(--pico-contrast)", 
      t: "hsl(from var(--pico-contrast-inverse) 50 s l)"
    },
    "error": {
      bg: "var(--pico-contrast)", 
      t: "var(--pico-contrast-inverse)"
    },
    undefined: {
      bg: "#000", 
      t: "#fff"
    },
  }

  // van.derive(()=>{
  //   message_color.bg.val = message_color_options[message_type.val].bg
  //   message_color.t.val = message_color_options[message_type.val].t
  // })

  return div(
    {
      class: van.derive(()=>is_visible.val?"":"hidden"),
      style: van.derive(()=>`z-index: 1000; padding: 10px; border-radius: 10px; position: fixed; right: 10px; bottom: 10px; background-color: ${message_color.bg.val}; color: ${message_color.t.val};`)
    },
    span(van.derive(()=>`${message_to_show.val}`)),
    button({style: "margin-left: 10px;", onclick: clear_toast}, "✕")
  )
}
