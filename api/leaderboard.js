let users = {};

module.exports = (req, res) => {

  if (req.method !== "GET") {
    return res.status(405).json({ error: "GET only" });
  }

  const board = Object.entries(users)
    .map(([name, points]) => ({ name, points }))
    .sort((a, b) => b.points - a.points);

  res.json(board);
};