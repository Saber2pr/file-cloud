import { Koa } from "@saber2pr/koa"
import { getBody, addFile, delFile, getFiles, getLocalIP } from "./node"

const mode = process.env.NODE_ENV

Koa({ base: "/static" })
  .use(async (ctx, next) => {
    ctx.response.setHeader(
      "Access-Control-Allow-Origin",
      `http://${mode === "production" ? getLocalIP() : "localhost"}:8080`
    )
    ctx.response.setHeader("Access-Control-Allow-Methods", [
      "GET",
      "POST",
      "DELETE"
    ])
    try {
      await next()
    } catch (error) {
      ctx.response.end(JSON.stringify(error))
    }
  })
  .use(async ctx => {
    if (ctx.request.method === "GET") {
      const files = await getFiles(ctx.base)
      ctx.response.statusCode = 200
      ctx.response.statusMessage = "get files ok."
      ctx.response.end(JSON.stringify(files))
    }

    if (ctx.request.method === "POST") {
      const body = await getBody(ctx.request)
      const buffer = Buffer.from(body, "base64")
      await addFile(ctx.base + ctx.request.url, buffer)
      ctx.response.statusCode = 200
      ctx.response.statusMessage = "upload ok."
      ctx.response.end()
    }

    if (ctx.request.method === "DELETE") {
      await delFile(ctx.base + ctx.request.url)
      ctx.response.statusCode = 200
      ctx.response.statusMessage = "delete ok."
      ctx.response.end()
    }

    if (ctx.request.method === "OPTIONS") {
      ctx.response.setHeader("Access-Control-Max-Age", 10000)
      ctx.response.end()
    }
  })
  .listen(3000, () => {
    console.log("http://localhost:3000")
    console.log(`IPv4: http://${getLocalIP()}:3000`)
  })
