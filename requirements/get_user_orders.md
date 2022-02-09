# Get User Orders

> ## Success cases

1. :heavy_check_mark: User sends a **GET** request to route **/orders**
2. :heavy_check_mark: [User Auth](./user_auth.md)
3. :heavy_check_mark: Server get the user id from the request object
4. :heavy_check_mark: Server get the orders from database
5. :heavy_check_mark: Returns **200** with the orders


> ## Exceptions

1. :x: In case of the user don't exists

    Returns **400** "User don't exists"

3. :x: In case of server error

    Returns **500** "Internal Server Error"