'use strict';

const dynamodb = require('./dynamodb');
const appVersion = 1;

module.exports.fetch = (event, context, callback) => {
  // console.log('event: ', JSON.stringify(event))
  if (!event.queryStringParameters) {
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'invalid date query',
    });
    return;
  }
  const dateQuery = '' || event.queryStringParameters.date;
  const dateRegex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/g;
  const found = dateQuery.match(dateRegex);
  console.log('found: ', found)
  if (!found) {
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'invalid date query',
    });
    return;
  }

  var params = {
    TableName: 'serverless-csp-reports-dev',
    KeyConditionExpression: 'dateId = :d1', // a string representing a constraint on the attribute
    ExpressionAttributeValues: { // a map of substitutions for all attribute values
      ':d1': dateQuery,
    },
    ScanIndexForward: false, // optional (true | false) defines direction of Query in the index
    ReturnConsumedCapacity: 'TOTAL', // optional (NONE | TOTAL | INDEXES)
};
  dynamodb.query(params, function(err, data) {
      if (err) {
        console.error(error);
        callback(null, {
          statusCode: error.statusCode || 500,
          headers: { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' },
          body: 'error',
        });
        return;
      }
      
      // create a response
      const response = {
        headers: {
          version: appVersion,
        },
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(data.Items),
      };
      callback(null, response);
  });
}
