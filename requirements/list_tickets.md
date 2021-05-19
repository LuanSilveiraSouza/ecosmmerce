# List Tickets

> ## Success cases

1. :heavy_check_mark: User sends a **GET** request to route **/tickets**
2. :heavy_check_mark: [User Auth](./user_auth.md)
3. :heavy_check_mark: Server get the tickets from database
4. :heavy_check_mark: Returns **200** with a list of tickets

> ## Exceptions

1. :x: In case of server error

    Returns **500** "Internal Server Error"