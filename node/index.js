const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const { notFound, errorHandler } = require("./middlewares")

const app = new express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())


app.get("/", async (req, res) => {
    res.json({ hello: "world" })
})

const supervisors = require("./routes")
app.use("/api", supervisors)

app.use(notFound)
app.use(errorHandler)

app.listen(8080, () => {
    console.log("Listening on 8080. Ctrl+c to stop this server.")
})
