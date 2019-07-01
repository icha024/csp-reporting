# CSP Reporting Service

## Local DynamoDB
sls dynamodb start
http://localhost:8000/shell/
```
var params = {
    TableName: 'csp-reports-dev',
    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
};
dynamodb.scan(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
});


var params = {
    TableName: 'csp-reports-dev',
    KeyConditionExpression: 'dateId = :d1', // a string representing a constraint on the attribute
    ExpressionAttributeValues: { // a map of substitutions for all attribute values
      ':d1': '2019-06-29',
    },
    ScanIndexForward: false, // optional (true | false) defines direction of Query in the index
    ReturnConsumedCapacity: 'TOTAL', // optional (NONE | TOTAL | INDEXES)
};
docClient.query(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
});
```