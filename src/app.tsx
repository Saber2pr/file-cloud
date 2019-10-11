import React from "react"
import ReactDOM from "react-dom"
import { FileView } from "./components"

export const App = () => (
  <div className="App">
    <header className="title">
      <h1>文件中转站</h1>
    </header>
    <main className="main">
      <FileView />
    </main>
    <footer className="footer">Copyright © 2019 saber2pr.</footer>
  </div>
)

ReactDOM.render(<App />, document.getElementById("root"))
