# User Register

> ## Success cases

1. :heavy_check_mark: User sends username and password
2. :heavy_check_mark: Receives a **POST** request in route **/user**
3. :heavy_check_mark: Credentials are validated
4. :heavy_check_mark: User don't exists in database
6. :heavy_check_mark: User is created in database
7. :heavy_check_mark: Returns **201** with a success message

> ## Exceptions

1. :x: In case of empty or invalid credentials
    
    Returns **400** "Invalid Credentials"

2. :x: In case of user already exists

    Returns **400** "User already exists"

3. :x: In case of server error

    Returns **500** "Internal Server Error"