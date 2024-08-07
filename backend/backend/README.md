# Doodle shark backend api

API : https://doodle-fish-api-dot-hongwang-gcp.de.r.appspot.com/

### User info init
https://doodle-fish-api-dot-hongwang-gcp.de.r.appspot.com/createuser

raw : 
    {
        "address":`<address>`,
        "id":`<id>`,
        "bestScore":`<bestScore>`,
        "token":`<token>`
    }


---
### User data update
https://doodle-fish-api-dot-hongwang-gcp.de.r.appspot.com/update

raw : 
    {
        "id":`<id>`,
        "bestScore":`<bestScore>`,
        "token":`<token>`
    }
    
---
### Find user by id
https://doodle-fish-api-dot-hongwang-gcp.de.r.appspot.com/finduser

raw:
    {
    id:`<id>`
    }

send : firestore UID

---
### Leaderboard
https://doodle-fish-api-dot-hongwang-gcp.de.r.appspot.com/leaderboard

send : leaderboard & UID