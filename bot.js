const { VK } = require("vk-io");
const { HearManager } = require("@vk-io/hear");
const { default: axios } = require("axios");
const parser = require("node-html-parser");
const vk = new VK({
  token: process.env.VK_TOKEN,
});
const bot = new HearManager();

async function init() {
  try {
    await vk.updates.start();
    console.log("Bot started");
  } catch (err) {
    console.log(err);
  }
}
async function sendMessage(peer_id = 2000000001, message) {
  await vk.api.messages.send({
    message,
    peer_id,
    random_id: Date.now(),
  });
}
async function getConversations() {
  const conversations = await vk.api.messages.getConversations();
  return conversations;
}
vk.updates.on("message_new", bot.middleware);
bot.hear(/\/id/i, async (context) => {
  await context.send(context.peerId);
});
bot.hear(/\/кто/i, async (context) => {
  const members = await vk.api.messages.getConversationMembers({
    peer_id: context.peerId,
  });
  const random =
    members.profiles[Math.floor(Math.random() * members.profiles.length)];
  console.log(random);
  await context.send(
    `Это [id${random.id}|${random.first_name} ${random.last_name}]`
  );
});
bot.hear(/\/анекдот/i, async (context) => {
  const anek = await axios.get("https://www.anekdot.ru/random/anekdot/");
  const parsed = parser.parse(anek.data).querySelector(".text").rawText;
  //
  await context.send(parsed);
});
module.exports = { init, sendMessage, getConversations };
