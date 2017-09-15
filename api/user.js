'use strict';

const uuid = require('uuid');
const dynamodb = require('./dynamodb');

module.exports.create = (event, context, callback) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      email: data.email,
      password: data.password,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  dynamodb.put(params, (error) => {
    let response;

    if (error) {
        response = {
	      status : "failed"
	    };
    }
    else {
	  	response = {
	      status : "success"
	    };	
    } 
    callback(null, response);
  });
};