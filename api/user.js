'use strict';
var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});





module.exports.foo = (event, context, callback) => {
    console.log(event);
    const response = {
        statusCode: 200,
        headers: {
            "x-custom-header": "My Header Value"
        },
        body: JSON.stringify(event.queryStringParameters)
    };

    callback(null, response);
}

module.exports.create = (event, context, callback) => {

	var docClient = new AWS.DynamoDB.DocumentClient();
	
	const data = event.queryStringParameters;
	const params = {
	    TableName: "Users",
	    Item: {
	        email: data.email,
	        password: data.password
	    },
	};
	
	let response='';

	docClient.put(params, function(err, data) {
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