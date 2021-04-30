# Get User Cart

> ## Success cases

1. :heavy_check_mark: User sends a **GET** request to route **/carts**
2. :heavy_check_mark: [User Auth](./user_auth.md)
3. :heavy_check_mark: Server get the user id from the request object
4. :heavy_check_mark: Server get the cart from database
5. :heavy_check_mark: Returns **200** with the cart and its items

> ## Exceptions

1. :x: In case of the user don't exists

    Returns **400** "User don't exists"

2. :x: In case of the user don't have a cart yet

    Creates a blank cart

    Assign the cart to the user

    Returns **200** with the cart and it empty item list

3. :x: In case of server error

    Returns **500** "Internal Server Error"