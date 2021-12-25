'use strict';

const options = {
    swaggerDefinition: {
        "description": "It is a small application that fetches data in JSON format from an external API. The data is handled internally by a rest full api NodeJS and Express framework and SQL in the cloud with MySQL database and front is Angular-13 app.",
        "contact": {
            name: "Hamada",
            github: "https://github.com/hamada-j/revenueLabs"
        },
        
        "info": {
            "title": "revenueLabs" ,
            "version": "1.0.0"
        },
        servers: [process.env.URL],
        responses: {
            '404': {
                description: "Not Found."
            },
            '200': {
                description: "Success response."
            },
            '202': {
                description: "Success response. Status: 204. No more data."
            },
            '206': {
                description: "Success response. Partial data."
            },
            '400': {
                description: "Information is missing or invalid. Incorrect URL"
            },
            '500': {
                description: "Fail to get data from DB or Server"
            },
            '501': {
                description: "Could not get data from DB or Server"
            }

        }
    },

    "apis": ['./routes/index.js'] // Path to the API docs

};

module.exports = options