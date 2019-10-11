import { promisify } from "util"
import { writeFile, readdir, readFile, exists, mkdir, stat, unlink } from "fs"
import { IncomingMessage } from "http"
import { join } from "path"

export const getBody = (req: IncomingMessage) =>
  new Promise<string>((resolve, reject) => {
    const data = []
    req.on("data", chunk => data.push(chunk))
    req.on("end", () => resolve(data.join("")))
    req.on("error", err => reject(err))
  })

export const ReadDir = promisify(readdir)
export const ReadFile = promisify(readFile)
export const Stat = promisify(stat)
export const Exists = promisify(exists)
export const MkDir = promisify(mkdir)
export const WriteFile = promisify(writeFile)
export const UnLink = promisify(unlink)

export const addFile = (path: string, data: Buffer) =>
  promisify(writeFile)(join(process.cwd(), path), data)
export const delFile = (path: string) => UnLink(join(process.cwd(), path))
export const getFiles = (path: string) => ReadDir(join(process.cwd(), path))
export const getLocalIP = require("./getIP")
