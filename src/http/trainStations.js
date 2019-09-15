const axios = require('axios');
const trainStationsParser = require('../parser/trainStations');
const trainStationsUrl = 'http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/cercaNumeroTrenoTrenoAutocomplete/';

module.exports = async (trainNumber) => {
  const {status, data} = await axios.get(trainStationsUrl + trainNumber);

  if(status !== 200) {
    throw new Error('Nessuna stazione associata al numero di treno');
  }

  const stations = trainStationsParser(data);

  return Promise.resolve(stations)
}
