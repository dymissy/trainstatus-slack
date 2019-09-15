module.exports = (rawData) => {
  return rawData.split("\n").reduce((stations, station) => {
    const stationId = station.split('|').pop().split('-').pop();

    if(stationId) {
      stations.push(stationId);      
    }

    return stations;
  }, []);
}
