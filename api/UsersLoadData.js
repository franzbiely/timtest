var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var users = JSON.parse(fs.readFileSync('./api/users.json', 'utf8'));
users.forEach(function(user) {
    var params = {
        TableName: "Users",
        Item: {
            "email":  user.email,
            "password": user.password
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add user", user.email, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", user.email);
       }
    });
});