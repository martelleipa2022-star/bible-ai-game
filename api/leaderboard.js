
let memoryStore = global.memoryStore || {};
global.memoryStore = memoryStore;

module.exports = (req, res) => {

  if (req.method !== "GET") {
    return res.status(405).json({ error: "GET only" });
  }

  const leaderboard = Object.entries(memoryStore)
    .map(([name, points]) => ({
      name,
      points
    }))
    .sort((a, b) => b.points - a.points);

  return res.json(leaderboard);
};