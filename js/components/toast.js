import van from "../frameworks/van-1.5.5.js"
const { button, code, dialog, div, modal, span } = van.tags

export const Toast = (toast_info) => {
  const toast_timeout_duration = 1500
  let toast_timeout_countdown = undefined
  let message_queue = []
  const message_to_show = van.state({})
  const is_visible = van.state(false)

  const clear_toast = () => {
    is_visible.val = false
    clearTimeout(toast_timeout_countdown)

    show_message()
  }

  const show_message = () => {
    if (is_visible.val === false && message_queue.length > 0) {
      const message = message_queue.pop()
      message_to_show.val = {message: message.message, type: message.type}
      is_visible.val = true
      toast_timeout_countdown = setTimeout(clear_toast, message.timeout?message.timeout:toast_timeout_duration)
    }
  }

  van.derive(()=>{
    if (toast_info.val.message && toast_info.val.message.length>0) {
      message_queue.push({
        message: toast_info.val.message, 
        type: toast_info.val.type,
        ...(toast_info.val.timeout?{timeout: toast_info.val.timeout}:{})
      })
      console.log(message_queue)
      show_message()
    }
  })

  return div(
    {
      class: van.derive(()=>[
        "toast", 
        is_visible.val?"":"hidden", 
        `${message_to_show.val.type}`
      ].join(" ")),
    },
    span(van.derive(()=>`${message_to_show.val.message}`)),
    button({style: "margin-left: 10px;", onclick: clear_toast}, "✕")
  )
}
