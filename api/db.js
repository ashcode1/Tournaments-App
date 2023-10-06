const createTournament = require('./createTournament');

module.exports = () => {
  const data = { tournaments: [] };

  for (let i = 0; i < 75; i++) {
    data.tournaments.push(createTournament());
  }

  return data;
};
