import { message } from "antd"

export const useAlert = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const successAlert = (msg: string) => {
    console.log("çalışıyor")
    messageApi.success(msg)
  }

  const errorAlert = (msg: string) => {
    messageApi.error(msg)
  }

  const warningAlert = (msg: string) => {
    messageApi.warning(msg)
  }

  return {
    contextHolder,
    successAlert,
    errorAlert,
    warningAlert
  }
}