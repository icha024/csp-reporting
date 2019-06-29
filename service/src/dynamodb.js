'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

let options = {
  convertEmptyValues: true,
};

// connect to local DB if running offline
if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    convertEmptyValues: true,
  };
}

const client = new AWS.DynamoDB.DocumentClient(options);

module.exports = client;
