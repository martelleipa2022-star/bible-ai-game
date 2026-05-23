let users = {};

module.exports = (req, res) => {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  const { user, answer, correct } = req.body;

  if (!user) {
    return res.status(400).json({ error: "User required" });
  }

  if (!users[user]) users[user] = 0;

  const isCorrect = answer === correct;

  if (isCorrect) {
    users[user] += 10;
  }

  res.json({
    correct: isCorrect,
    totalPoints: users[user]
  });
};