# Get Ticket

> ## Success cases

1. :heavy_check_mark: User sends a **GET** request to route **/tickets/:id**
2. :heavy_check_mark: [User Auth](./user_auth.md)
3. :heavy_check_mark: Server get the ticket from database
4. :heavy_check_mark: If provided a origin **query param**, calculate the transport cost
5. :heavy_check_mark: Returns **200** with the specified ticket 

> ## Exceptions

1. :x: In case of the ticket id don't match to any ticket 

    Returns **400** "Ticket don't exists"

2. :x: In case of server error

    Returns **500** "Internal Server Error"