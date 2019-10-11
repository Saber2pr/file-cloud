export const readFile = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener("load", () => resolve(reader.result.toString()))

    reader.addEventListener("error", () => reject(reader.result))
  })
