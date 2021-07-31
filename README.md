# Test Project

Project assignment

## Installation

Use the package manager npm to install the project.

```bash
npm i
```

## 1. API to store candidate data 

```javascript
POST : localhost:3000/api/save-candidate
Example request:-

{
    "name":"test name 2",
    "email":"testuser2@yopmail.com"
}

Example Output:-
{
    "status": 200,
    "message": "Successfully saved",
    "data": {
        "_id": "610509de6445f825e0cdb71f",
        "name": "test name 2",
        "email": "testuser2@yopmail.com",
        "__v": 0
    }
}
```

## 2. API to assign scores to a candidate.
```javascript
POST : localhost:3000/api/assign-score
Example request:-

{
    "user_id": "610509de6445f825e0cdb71f",
    "firstRound":"9",
    "secondRound":"8",
    "thirdRound":"8"
}

Example Output:-
{
    "status": 200,
    "message": "Successfully saved",
    "data": {
        "firstRound": 9,
        "secondRound": 8,
        "thirdRound": 8,
        "_id": "610509e96445f825e0cdb722",
        "user_id": "610509de6445f825e0cdb71f",
        "__v": 0
    }
}
```

## 3. API to get average scores, candidate with maximum scores and max scores
```javascript
GET : localhost:3000/api/max-average-score

Example Output:-
{
    "status": 200,
    "message": "Successfully fetched",
    "data": [
        {
            "_id": "",
            "firstRoundAvg": 8,
            "secondRoundAvg": 8,
            "thirdRoundAvg": 8,
            "maxScoreCandidate": {
                "_id": "610509de6445f825e0cdb71f",
                "name": "test name 2",
                "email": "testuser2@yopmail.com",
                "__v": 0
            },
            "maxScore": 25
        }
    ]
}
```
