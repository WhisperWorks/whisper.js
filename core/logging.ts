export namespace Logger {
  export function info(text: string) {
    console.log("[INFO]", text)
  }

  export function warn(text: string) {
    console.warn("[WARN]", text)
  }

  export function error(text: string) {
    console.error("[ERROR]", text)
  }
}