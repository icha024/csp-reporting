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
```