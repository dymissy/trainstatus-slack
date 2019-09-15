require('../util/strtr');

const messageTemplate = require('./trainStatusMessageTemplate.json')

module.exports = (trainStatus) => {
  const message = JSON.stringify(messageTemplate).strtr({
    '{trainType}': trainStatus.categoria,
    '{trainNumber}': trainStatus.numeroTreno,
    '{departureStation}': trainStatus.origine,
    '{arrivalStation}': trainStatus.destinazione,
    '{departureTime}': formatDate(trainStatus.orarioPartenza),
    '{arrivalTime}': formatDate(trainStatus.orarioArrivo),
    '{statusEmoji}': statusEmoji(trainStatus.compImgRitardo),
    '{status}': trainStatus.compRitardo[0],
    '{lastCheckpoint}': trainStatus.stazioneUltimoRilevamento || '-',
  });

  return JSON.parse(message);
}


const statusEmoji = iconName => {
  if (iconName.indexOf('regolare.png') >= 0) {
    return ':white_check_mark:';
  }

  if (iconName.indexOf('ritardo01.png') >= 0) {
    return ':grey_exclamation:';
  }

  if (iconName.indexOf('ritardo02.png') >= 0) {
    return ':exclamation:';
  }

  return ':bangbang:';
}

const formatDate = (timestamp) => new Date(timestamp)
  .toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', timeZone: 'Europe/Rome'})
