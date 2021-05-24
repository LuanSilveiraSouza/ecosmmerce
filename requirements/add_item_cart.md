# Add Item Cart

> ## Success cases

1. :heavy_check_mark: User sends a **POST** request to route **/carts**
2. :heavy_check_mark: User sends in the **Body**: { ticket_id, qtd, origin }
3. :heavy_check_mark: [Get User Cart](./get_user_cart.md)
4. :heavy_check_mark: Server validate the existence of the ticket and the disposal of the quantity
5. :heavy_check_mark: Server creates a cart item and add it in the user cart
6. :heavy_check_mark: If informed, calculate the transport price and add it to the cart item
7. :heavy_check_mark: Server updates the total price of the cart
8. :heavy_check_mark: Returns **200** with the cart item

> ## Exceptions

1. :x: In case of user or ticket don't exists

    Returns **400** "User or ticket don't exists"


2. :x: In case of server error

    Returns **500** "Internal Server Error"