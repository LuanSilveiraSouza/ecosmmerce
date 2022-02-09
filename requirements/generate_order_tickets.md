# Generate Order Tickets

> ## Success cases

1. :heavy_check_mark: User sends a **PATCH** request to route **/orders/:id**
2. :heavy_check_mark: [User Auth](./user_auth.md)
3. :heavy_check_mark: Server get the user id from the request object
4. :heavy_check_mark: Server get the respective order from database
5. :heavy_check_mark: Server generates unique codes to each of the tickets of the order
5. :heavy_check_mark: Returns **200** with the updated order containing the ticket codes


> ## Exceptions

1. :x: In case of the user don't exists

    Returns **400** "User don't exists"

2. :x: In case of the order don't exists

    Returns **400** "Order don't exists"

3. :x: In case of server error

    Returns **500** "Internal Server Error"