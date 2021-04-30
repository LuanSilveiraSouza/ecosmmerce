# Remove Item to Cart

> ## Success cases

1. :heavy_check_mark: User sends a **DELETE** request to route **/carts/:id**
2. :heavy_check_mark: User sends in the **Query**: id 
3. :heavy_check_mark: [Get User Cart](./get_user_cart.md)
4. :heavy_check_mark: Server gets the cart item of the specified id
5. :heavy_check_mark: Server updates the total price of the cart
6. :heavy_check_mark: Server deletes the cart item
7. :heavy_check_mark: Returns **200** with the cart

> ## Exceptions

1. :x: In case of cart or cart item don't exists

    Returns **400** "Cart or item don't exists"


2. :x: In case of server error

    Returns **500** "Internal Server Error"