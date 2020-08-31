const getDate = require('../../util');

module.exports = [
    // Sample not found request - 15 minutes
    {
        "correlationId": "7a240f5f0e21555d2d343482",
        "processInfo": {
            "hostname": "api-env",
            "groupName": "QuickStart Group",
            "serviceName": "QuickStart Server",
            "version": "7.7.20200130",
            "groupId": "group-2",
            "domainId": "ed992442-c363-4d36-963a-9e6314b0f421",
            "serviceId": "instance-1"
        },
        "@timestamp": getDate('15m'),
        "logtype": "openlog",        
        "path": "/favicon.ico",
        "protocol": "https",
        "serviceContext": null,
        "protocolSrc": "8065",
        "status": "failure", 
        "statusText": "Not Found",
        "statusCode": 404,
        "method": "GET", 
        "bytesSent": 834, 
        "bytesReceived": 747,
        "localPort": 8065,
        "localAddr" : "192.168.65.129",
        "remoteName" : "192.168.65.1",
        "remotePort" : 59641,
        "finalStatus" : "Fail", 
        "wafStatus": 1,
        "vhost": "api.customer.com:443",
        "duration" : 55
    },
    // Find Pets by status on instance-2 - OPTIONS Call - 120 hours ago - Instance-2
    {
        "correlationId": "4e270f5f05224d71a5f24b78",
        "processInfo": {
            "hostname": "api-env",
            "groupName": "QuickStart Group",
            "serviceName": "QuickStart Server",
            "version": "7.7.20200130",
            "groupId": "group-2",
            "domainId": "ed992442-c363-4d36-963a-9e6314b0f421",
            "serviceId": "instance-2"
        },
        "@timestamp": getDate('120h'),
        "logtype": "openlog",
        "path": "/petstore/v2/pet/findByStatus",
        "protocol": "https",
        "serviceContext": null,
        "protocolSrc": "8065",
        "status": "success",

        "statusText": "OK",
        "statusCode": 200,
        "method": "OPTIONS", 
        "bytesSent": 357, 
        "bytesReceived": 441,
        "localPort": 8065,
        "localAddr" : "192.168.65.129",
        "remoteName" : "192.168.65.1",
        "remotePort" : 49586,
        "finalStatus" : "Pass",
        "duration" : 55,
        "wafStatus" : 0 
    },
    // Healthcheck call - 65 minutes 
    {
        "correlationId": "19250f5f4321b5ba2a4de364",
        "processInfo": {
            "hostname": "api-env",
            "groupName": "QuickStart Group",
            "serviceName": "QuickStart Server",
            "version": "7.7.20200130",
            "serviceId": "instance-1",
            "domainId": "ed992442-c363-4d36-963a-9e6314b0f421",
            "groupId": "group-2"
        },
        "@timestamp": getDate('65m'),
        "logtype": "openlog",
        "path": "/healthcheck",
        "protocol": "http",
        "serviceContext": null,
        "protocolSrc": "8080",
        "status": "success",

        "statusText": "OK",
        "statusCode": 200,
        "method": "GET", 
        "bytesSent": 661, 
        "bytesReceived": 563,
        "localPort": 8080,
        "authSubjectId" : "Chris-Test",
        "localAddr" : "1.1.1.1",
        "remoteName" : "TestHost",
        "remotePort" : 78786,
        "finalStatus" : "Error",
        "duration" : 22,
        "wafStatus" : 0
    },
    // Another healthcheck - 30000 hours ago
    {
        "correlationId": "b8250f5f7a2195dc1581d52c",
        "processInfo": {
            "hostname": "api-env",
            "groupName": "QuickStart Group",
            "version": "7.7.20200130",
            "serviceName": "QuickStart Server",
            "groupId": "group-2",
            "domainId": "ed992442-c363-4d36-963a-9e6314b0f421",
            "serviceId": "instance-1"
        },
        "@timestamp": getDate('3000h'),
        "logtype": "openlog",
        "path": "/healthcheck",
        "protocol": "http",
        "serviceContext": null,
        "protocolSrc": "8080",
        "status": "success",

        "statusText": "OK",
        "statusCode": 200,
        "method": "GET", 
        "bytesSent": 661, 
        "bytesReceived": 563,
        "localPort": 8080,
        "localAddr" : "192.168.65.129",
        "remoteName" : "192.168.65.1",
        "remotePort" : 65392,
        "finalStatus" : "Pass", 
        "duration" : 11,
        "wafStatus" : 0 
    },
    // Get Pet by ID GET Call - 8 minutes ago
    {

        "correlationId" : "682c0f5fbe23dc8e1d80efe2",
        "processInfo" : {
            "hostname" : "api-env",
            "groupName" : "QuickStart Group",
            "serviceName" : "QuickStart Server",
            "version" : "7.7.20200130",
            "groupId" : "group-2",
            "domainId" : "ed992442-c363-4d36-963a-9e6314b0f421",
            "serviceId" : "instance-1"
          },
        "@timestamp" : getDate('8m'),
        "logtype" : "openlog",

        "statusText": "OK",
        "statusCode": 200,
        "method": "GET", 
        "bytesSent": 47925, 
        "bytesReceived": 437,
        "localPort": 8065,
        "localAddr" : "192.168.65.129",
        "remoteName" : "192.168.65.1",
        "remotePort" : 50982,
        "finalStatus" : "Pass",
        "path" : "/petstore/v2/pet/findByStatus",
        "wafStatus" : 0,
        "protocol" : "https",
        "duration" : 102,
        "authSubjectId" : "4e8634ba-6762-45ca-bbe5-7ca4e99192ac",
        "serviceContext" : {
            "duration" : 897,
            "app" : "Client App",
            "method" : "findPetsByStatus",
            "org" : "API Development",
            "service" : "Petstore",
            "client" : "4e8634ba-6762-45ca-bbe5-7ca4e99192ac",
            "monitor" : true,
            "status" : "success",
            "apiOrg": "API Development", 
            "apiVersion": "1.0.5", 
            "apiDeprecated": false, 
            "apiState": "published"
        },
        "protocolSrc" : "8065",
        "status" : "success",
        "wafStatus" : 0 
      }
];