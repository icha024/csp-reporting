
'use strict';

const dynamodb = require('./dynamodb');

module.exports.insert = (event, context, callback) => {
  const date = new Date();
  const dateId = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;
  const timeId = `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}.${date.getUTCMilliseconds()}`;

  const body = JSON.parse(event.body)['csp-report'];
  console.log('body is: ' + JSON.stringify(body));
  if (body === undefined) {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'No CSP found',
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      'dateId': dateId,
      'timeId': timeId,
      'blockedUri': body['blocked-uri'],
      'documentUri': body['document-uri'],
      'disposition': body['disposition'],
      'effectiveDirective': body['effective-directive'],
      'originalPolicy': body['original-policy'],
      'referrer': body['referrer'],
      'scriptSample': body['script-sample'],
      'statusCode': body['status-code'],
      'violatedDirective': body['violated-directive'],
    },
  };

  // write the todo to the database
  dynamodb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 500,
        headers: { 'Content-Type': 'text/plain' },
        body: 'error',
      });
      return;
    }

    // create a response
    const response = {
      headers: {
        "version" : "3"
      },
      statusCode: 204,
      body: '',
    };
    callback(null, response);
  });
};
