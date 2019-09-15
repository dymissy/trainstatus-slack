const querystring = require('querystring');

module.exports = (slackBody) => {
  const items = querystring.parse(slackBody);

  if (!items.text || isNaN(parseInt(items.text))) {
   throw new Error('Train number is required. Please provide a valid train number.');
  }

  return parseInt(items.text);
}
