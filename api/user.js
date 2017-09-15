'use strict';

let AWS = require("aws-sdk"),
    docClient = new AWS.DynamoDB.DocumentClient(),
    response = '',
    TableName = "Users";

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

module.exports.create = (event, context, callback) => {

    const query = event.queryStringParameters;

    docClient.put({
        TableName: TableName,
        Item: {
            email: query.email,
            password: query.password
        },
    }, function(err, data) {
        if (err) {
            response = {
                statusCode: 403,
                body: {
                    status: "failed"
                }
            };
        } else {
            response = {
                statusCode: 200,
                body: {
                    status: "success"
                }
            };
        }
        callback(null, response);
    });

};

module.exports.auth = (event, context, callback) => {
    
    const query = event.queryStringParameters;

    docClient.get({
        TableName: TableName,
        Key: {
            email: query.email
        },
    }, function(err, data) {
        if (err) {
            response = {
                statusCode: 403,
                body: {
                    success: "false",
                    "message": "Invalid username or password"
                }
            };
        } else {
            if (data.Item.password == query.password) {
                response = {
                    statusCode: 200,
                    body: {
                        status: "success",
                        Token: "xxxxxxxxxxxxxxxxxxx"
                    }
                };
            } else {
                response = {
                    statusCode: 403,
                    body: {
                        success: "false",
                        "message": "Invalid username or password"
                    }
                };
            }
        }
        callback(null, response);
    });
};

module.exports.list = (event, context, callback) => {

    docClient.scan({
        TableName: TableName
    }, (error, result) => {
        if (error) {
            callback(new Error('Error'));
            return;
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Items),
        };
        callback(null, response);
    });
};