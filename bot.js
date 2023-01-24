const { VK } = require("vk-io");
const { HearManager } = require("@vk-io/hear");

const vk = new VK({
  token:
    "vk1.a.QdEVB1DzIendbTSEXFN93QSf1M4LuVRKbIzSgJkXaz4-IBNx7yUn8S1mGajugMlIT7V-HP9sTH2rVpW83NT24gdew9n17eTIoDzci2hUGKqjX9tIlkHHiPoPgZSCUmuRVsT-uNgCgURIeQAFaLdMSRp12--3m5q3uJp5hdPiku9z8OL6XoDn6fM6gjUKuldr-W2dbC_5yFVQjAuNY_-FFQ",
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
vk.updates.on("message_new", async (context) => {
  console.log(context);
  if (context.text === "id") {
    await context.send(context.peerId);
  }
});

module.exports = { init, sendMessage, getConversations };
