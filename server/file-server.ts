import { Koa } from "@saber2pr/koa"
import { ReadFile, getLocalIP } from "./node"
import { join } from "path"

Koa()
  .use(async (ctx, next) => {
    if (ctx.request.url === "/favicon.ico") {
      ctx.response.end()
    } else {
      await next()
    }
  })
  .use(async ctx => {
    let url = ""
    if (ctx.request.method === "GET") {
      if (ctx.request.url.startsWith("/static")) {
        url = join(process.cwd(), ctx.request.url)
      } else {
        url = join(process.cwd(), "build", ctx.request.url)
        if (ctx.request.url === "/") url += "index.html"
      }
      try {
        const res = await ReadFile(url)
        ctx.response.statusCode = 200
        ctx.response.end(res.toString())
      } catch (error) {
        ctx.response.end("404")
      }
    } else {
      ctx.response.end("404")
    }
  })
  .listen(8080, () => {
    console.log("http://localhost:8080")
    console.log(`IPv4 http://${getLocalIP()}:8080`)
  })
