import React from "react"

import { LazyCom } from "../lazy-com"
import {
  fetchFileData,
  postFileData as postImageData,
  deleteFileData
} from "../../request"
import { readFile, parseBase64Value } from "../../utils"
import { useForceUpdate } from "../../hooks"
import { origin } from "../../request/api"

export interface FileView {}

const Upload = ({ onUploaded }: { onUploaded?: (value: Response) => any }) => (
  <input
    type="file"
    multiple
    onChange={e => {
      const files = e.target.files
      Promise.all(
        Array.from(files).map(file =>
          readFile(file).then(base64 =>
            postImageData(parseBase64Value(base64), file.name).then(
              res => onUploaded && onUploaded(res)
            )
          )
        )
      )
    }}
  />
)

const File = ({
  path,
  onDelete
}: {
  path: string
  onDelete?: (value: Response) => any
}) => (
  <span>
    <a href={origin.root + path}>{path}</a>
    <button className="btn" onClick={() => deleteFileData(path).then(onDelete)}>
      删除
    </button>
  </span>
)

export const FileView = ({  }: FileView) => {
  const refresh = useForceUpdate()
  return (
    <div className="FileView">
      <Upload onUploaded={refresh} />
      <hr />
      <LazyCom await={fetchFileData()} fallback={"loading"}>
        {res => (
          <ol>
            {res
              .filter(p => !p.includes("gitkeep"))
              .map(path => (
                <li className="item" key={path}>
                  <File path={path} onDelete={refresh} />
                </li>
              ))}
          </ol>
        )}
      </LazyCom>
    </div>
  )
}
