# CSP Reporting Service
```
sls dynamodb start
IS_OFFLINE=true sls offline -s dev
```

## Local DynamoDB
sls dynamodb start
http://localhost:8000/shell/
```
var params = {
    TableName: 'serverless-csp-reports-dev',
    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
};
dynamodb.scan(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
});


var params = {
    TableName: 'serverless-csp-reports-dev',
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

## Sample
```
{
  "csp-report": {
    "document-uri": "http://example.com/signup.html",
    "referrer": "",
    "blocked-uri": "http://example.com/css/style.css",
    "violated-directive": "style-src cdn.example.com",
    "original-policy": "default-src 'none'; style-src cdn.example.com; report-uri /_/csp-reports"
  }
}
```