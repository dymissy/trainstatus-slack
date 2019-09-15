const axios = require('axios');
const trainStationsHttp = require('./trainStations');
const trainStatusUrl = 'http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/andamentoTreno/';

module.exports = async (trainNumber) => {
  const stations = await trainStationsHttp(trainNumber);

  if (stations.length <= 0) {
    throw new Error('Nessuna stazione associata al numero di treno');
  }

  //fetch the result only for the first station - TODO: improve with Slack actions
  const {status, data} = await axios.get(`${trainStatusUrl}${stations.pop()}/${trainNumber}`)
  if (status !== 200) {
    throw new Error('Impossibile recuperare lo stato del treno ' . trainNumber);
  }

  return Promise.resolve(data)
}
