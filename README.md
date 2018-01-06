# how to user dummy server for wherehows

1. npm install
2. npm run dev

## Description
1. db-1514784248487.json is Database
2. If input includes 'read', it will write to db. Otherwise, it fail.
GET: URL http://localhost:3000/
POST: URL http://localhost:3000/elements

BODY: {  
   "principal":"urn:li:userPrincipal:whereHows",
   "businessJustification":"grandfathered in read "
}

Response: {
    "principal": "urn:li:userPrincipal:whereHows",
    "businessJustification": "grandfathered in read ",
    "accessTypes": "READ",
    "tableItem": {
        "userName": "whereHows",
        "name": "Nathen Sauer",
        "idType": "USER",
        "source": "RJ",
        "modifiedTime": "2017-04-10T16:34:16.183Z",
        "ownerShip": "DataOwner"
    },
    "id": 2
}
