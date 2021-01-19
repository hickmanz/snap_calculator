import express from "express"
import path from "path"
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'dist')))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
