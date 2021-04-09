# User Login

> ## Success cases

1. :heavy_check_mark: User sends username and password
2. :heavy_check_mark: Receives a **POST** request in route **/login**
3. :heavy_check_mark: Credentials are validated
4. :heavy_check_mark: User exists in database
5. :heavy_check_mark: Password is correct
6. :heavy_check_mark: Server creates a **JWT**
7. :heavy_check_mark: Returns **201** with the JWT

> ## Exceptions

1. :x: In case of empty or invalid credentials
    
    Returns **400** "Invalid Credentials"

2. :x: In case of user don't exists or password is incorrect

    Returns **400** "Invalid Credentials"

3. :x: In case of server error

    Returns **500** "Internal Server Error"