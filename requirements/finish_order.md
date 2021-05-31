# Finish Order

> ## Success cases

1. :heavy_check_mark: User sends a **POST** request to route **/carts/finish**
2. :heavy_check_mark: User sends in the **Body**: { user_id, payment_token }
3. :heavy_check_mark: [Get User Cart](./get_user_cart.md)
4. :heavy_check_mark: Server checks if the cart is eligible to finish and pay
5. :heavy_check_mark: Server sends a message to the payment module handle the payment
6. :heavy_check_mark: Returns **200** with a message of success

> ## Exceptions

1. :x: In case of the cart is not eligible (empty)

    Returns **400** "Cart is empty!"

2. :x: In case of server error

    Returns **500** "Internal Server Error"