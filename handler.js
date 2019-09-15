'use strict';

const trainNumberParse = require('./src/parser/trainNumber');
const trainStatusHttp = require('./src/http/trainStatus');
const slackMessageBuilder = require('./src/builder/slackMessage');

module.exports.index = async (event) => {
  try {
    const trainNumber = trainNumberParse(event.body);
    const trainStatus = await trainStatusHttp(trainNumber);
    const slackMessage = slackMessageBuilder(trainStatus);

    return {
        statusCode: 200,
        body: JSON.stringify(slackMessage)
    }
  } catch (e) {
    return {
        statusCode: 200,
        body: JSON.stringify({text: ':warning: ' + e.message})
    }
  }
};
