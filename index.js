const express = require("express");
require("dotenv").config();
const bot = require("./bot");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors({ origin: "*" }));
app.options("*", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
});
app.post("/message", async (req, res) => {
  const { message, peer_id } = req.body;
  if (!message || !peer_id) {
    return res.status(400).end();
  }
  await bot.sendMessage(peer_id, message);
  res.end(message);
});
app.get("/chats", async (req, res) => {
  const c = await bot.getConversations();
  res.json(c);
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500);
});
app.listen(process.env.PORT, (err) => {
  console.clear();
  if (err) {
    console.log(err);
  }
  console.log(`Running on "http://localhost:${process.env.PORT}"`);
  bot.init();
});
