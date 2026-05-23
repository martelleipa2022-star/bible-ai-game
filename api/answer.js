
let memoryStore = global.memoryStore || {};
global.memoryStore = memoryStore;

module.exports = (req, res) => {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  const { user, answer, correct } = req.body;

  if (!user) {
    return res.status(400).json({ error: "Missing user" });
  }

  if (!memoryStore[user]) {
    memoryStore[user] = 0;
  }

  const isCorrect = answer === correct;

  if (isCorrect) {
    memoryStore[user] += 10;
  }

  return res.json({
    correct: isCorrect,
    points: memoryStore[user]
  });
};