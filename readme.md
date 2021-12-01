# Backend side for a timetable app.
  * [All methods](#user-methods)
    * [User](#user)
      * [GET /profile](#user-profile)
      * [POST /edit](#user-edit)
      * [GET /timetable](#user-timetable)
    * [Authorazation](#auth)
      * [POST /login](#auth-login)
      * [POST /logout](#auth-logout)
      * [POST /registration](#auth-register)
    * [API](#api)
      * [GET /getday](#api-getday)
      * [GET /getgroups](#api-getgroups)
      * [GET /getgroup](#api-getgroup)
    * [ADMIN](#admin)
      * [POST /createday](#admin-createday)
      * [POST /editday](#admin-editday)
      * [POST /createlesson](#admin-createlesson)
      * [POST /editlesson](#admin-editlesson)
      * [POST /creategroup](#admin-creategroup)
      * [POST /editgroup](#admin-editgroup)
  * [TODO](#todo)

# All methods

## User

### User profile

#### Description:<br>
Method: GET.<br>
User get's info about his profile.<br>
### ACTION 
```
/user/profile
```
If user is unauthorized, he will get an error.<br>
```json
{
 "status": "unauthorized",
 "message: "Вы не авторизованы"
}
```
#### Response example
```json
{
 "_id": "61a35f2726c45e943a3dc6d9",
 "email": "tester@mail.ru",
 "password": "$2a$07$SnIEsrxrbXpAPgGTD76syO.IFJOlqCXzfuXM5CpxpvNJhSap5PitO",
 "name": "Тестер",
 "group": "61a3b30ebe8403874c1c3f6c",
 "role": "ADMIN",
 "__v": 0
}
```

