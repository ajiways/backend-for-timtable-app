# Backend side for a timetable app.
  * [All methods](#user-methods)
    * [User](#user)
      * [GET /profile](#user-profile)
      * [POST /edit](#user-edit)
      * [GET /timetable](#user-timetable)
    * [Authorazation](#authorization)
      * [POST /login](#authorization-login)
      * [POST /logout](#authorization-logout)
      * [POST /registration](#authorization-registration)
    * [API](#api)
      * [GET /getgroups](#api-get-groups)
    * [ADMIN](#admin)
      * [POST /createday](#admin-create-day)
      * [POST /editday](#admin-edit-day)
      * [POST /createlesson](#admin-create-lesson)
      * [POST /editlesson](#admin-edit-lesson)
      * [POST /creategroup](#admin-create-group)
      * [POST /editgroup](#admin-edit-group)
  * [TODO](#todo)

# All methods

## User

### User profile

#### Description:<br>
Method: GET.<br>
User get's info about his profile.<br>

### Action
```
/user/profile
```
If user is unauthorized, he will get an error.<br>
```json
{
 "status": "error",
 "message": "Вы не авторизованы"
}
```
#### Response example
```json
{
    "status": "done",
    "user": {
        "_id": "61a77d3158e84ebc98224ae1",
        "username": "Tester",
        "password": "$2a$07$SrlJkQgeLiqEO2aDu3dOb..UcLWbVDoDpJxEo4YQVwkLcPHBrBRWa",
        "name": "Tester",
        "group": "61a3b30ebe8403874c1c3f6c",
        "role": "USER",
        "__v": 0
    }
}
```
-----------------------------------------

### User edit

#### Description:<br>
Method: POST.<br>
User can edit his profile settings.<br>
Like name, email, etc... .<br>

### Action
```
/user/edit
```

If user is unauthorized, he will get an error.<br>
```json
{
 "status": "error",
 "message": "Вы не авторизованы"
}
```

#### Required inputs (at least one)
user, email, password, groupname <br>

#### Response example
```json
{
 "status": "done",
 "message": "Обновлено"
}
```
-----------------------------------------

### User timetable

#### Description:<br>
Method: GET.<br>
Whenever user open his timetable page <br>
he needs to get his timetable, this method <br>
will get it's for him. <br>

### Action
```
/user/timetable
```

If user is unauthorized, he will get an error.<br>
```json
{
 "status": "error",
 "message": "Вы не авторизованы"
}
```

#### Response example
```json
{
    "status": "done",
    "lessons": [
        {
            "_id": "61a758da79c2129a7e479cce",
            "name": "Test",
            "type": "Test",
            "teacherName": "Test",
            "startTime": "00-00",
            "endTime": "00-00",
            "__v": 0
        }
    ]
}
```
-----------------------------------------

## Authorization

### Authorization login

#### Description:<br>
Method: POST.<br>
User can log in using his login and password.<br>

### Action
```
/auth/login
```

#### Required inputs
username, password

#### Response expample
```json
{
 "status": "done",
 "message": "Успешный вход"
}
```
#### If errors
```json
{
 "status": "error",
 "errors": 
 [
  {
   "msg": "Пользователь с таким username не зарегистрирован",
   "param": "username",
   "location": "body"
   },
   {
   "msg": "Пароль должен быть от 6 до 56 символов",
   "param": "password",
   "location": "body"
  }
 ]
}
```
-----------------------------------------

### Authorization logout

#### Description:<br>
Method: GET.<br>
User can leave his session via logging out.<br>

### Action
```
/auth/logout
```

### Response example
```json
{
 "status": "done",
 "message": "Успешный выход"
}
```
-----------------------------------------

### Authorization registration

#### Description
Method: POST.<br>
User can register in our system using his data.<br>

### Action
```
/auth/registration
```

#### Required inputs
username, password, name

#### Response example
```json
{
 "status": "done",
 "message": "Успешная регистрация"
}
```
#### If errors
```json
{
 "status": "error",
 "errors": 
 [
  {
   "msg": "Пользователь с таким username уже зарегистрирован",
   "param": "username",
   "location": "body"
   },
   {
   "msg": "Пароль должен быть от 6 до 56 символов",
   "param": "password",
   "location": "body"
  }
 ]
}
```
-----------------------------------------

## API

### Api get groups

#### Description:<br>
Whoever can get list of all groups.<br>

### Action
```
/api/groups
```

#### Response example
```json
{
    "status": "done",
    "groups": [
        {
            "_id": "61a3b30ebe8403874c1c3f6c",
            "name": "DefaultGroup",
            "timetableEven": [
                "61a3b42a17f2fc77a78a29f4",
                "61a3b43b17f2fc77a78a29f9",
                "61a3b44017f2fc77a78a29fe",
                "61a3b44617f2fc77a78a2a03",
                "61a3b44c17f2fc77a78a2a08",
                "61a3b45117f2fc77a78a2a0d",
                "61a3b45a17f2fc77a78a2a12"
            ],
            "timetableOdd": [
                "61a3b46f17f2fc77a78a2a17",
                "61a3b47517f2fc77a78a2a1c",
                "61a3b49f17f2fc77a78a2a25",
                "61a3b4a217f2fc77a78a2a2a",
                "61a3b4a817f2fc77a78a2a2f",
                "61a3b4ac17f2fc77a78a2a34",
                "61a3b4b117f2fc77a78a2a39"
            ],
            "users": [],
            "__v": 0
        }
    ]
}
```
-----------------------------------------

## Admin

### Admin create day

#### Description:<br>
Method: POST.<br>
Admin can create day and put it inside of<br>
one group timetable(even or odd).<br>
If someone who is not an admin will try to add<br>
day, he will get an error.<br>

### Action
```
/admin/createday
```

#### Required inputs
dayname, weekstate, groupname

#### Response example
```json
{
 "status": "done",
 "message": "День %название_дня% для группы %название_группы% был создан"
}
```

#### If error
```json
{
 "status": "error",
 "message": "Вы не администратор"
}
```
-----------------------------------------

### Admin edit day

#### Description:<br>
Method: POST. <br> 
Admin can edit a single day via params.<br>

### Action
```
/admin/createday
```

#### Requiered inputs (at least one)
gropname, weekstate, daynumber, wipe(yes or not. It will delete all lessons from this day), dayname

#### Response example 
```json
{
 "status": "done",
 "message": "Обвнолено"
}
```

#### If error
```json
{
 "status": "error",
 "message": "Ошибка ..."
}
```
-----------------------------------------

### Admin create lesson

#### Description:<br>
Method: POST. <br>
Admin can create a single lesson and then<br>
put it into some week timetable(even/odd)<br>

### Action
```
/admin/createlesson
```

#### Requiered inputs
name, type, teachername, startTime, endTime, groupname, weekstate, daynumber

#### Response example
```json
{
 "status": "done",
 "message": "Пара %название_пары% для группы %название_группы% в %название_дня% создана"
}
```

#### If error
```json
{
 "status": "error",
 "message": "Ошибка ..."
}
```
-----------------------------------------

### Admin edit lesson (WIP)

### Admin create group

#### Description:<br>
Admin can create a single group via params.<br>

### Action
```
/admin/creategroup
```

#### Required inputs
groupname

#### Response example
```json
{
 "status": "done",
 "message": "Группа %название_группы% создана"
}
```

#### If error
```json
{
 "status": "error",
 "message": "Ошибка ..."
}
```
-----------------------------------------

### Admin edit group

#### Description:<br>
Method: POST. <br>
Admin can change properties of chosen group.<br>

### Action
```
/admin/editgroup
```

#### Requiered inputs
groupname, wipe(yes or not. It will delete all lessons from chosen timetable 0/1 ), timetablestate (0/1)
wipeusers(yes or not. It will delete all users from the group), 

#### Response example
```json
{
 "status": "done",
 "message": "Обновлено"
}
```

#### If error
```json
{
 "status": "error",
 "message": "Ошибка ..."
}
```
-----------------------------------------

## TODO

### A lot :D
