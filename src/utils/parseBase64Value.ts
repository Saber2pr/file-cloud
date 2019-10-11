export const parseBase64Value = (str: string) =>
  str.replace(/^(data:\s*image\/(\w+);base64,)/, "")
