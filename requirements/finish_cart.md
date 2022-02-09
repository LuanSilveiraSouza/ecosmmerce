# Finish Cart

> ## Success cases

1. :heavy_check_mark: User sends a **POST** request to route **/carts/finish**
2. :heavy_check_mark: User sends in the **Body**: { user_id, payment_token }
3. :heavy_check_mark: [Get User Cart](./get_user_cart.md)
4. :heavy_check_mark: Server checks if the cart is eligible to finish and pay
5. :heavy_check_mark: Server handles with the payment
6. :heavy_check_mark: A order object is created containing the cart details
7. :heavy_check_mark: The tickets related to the other has its purchased count updated
8. :heavy_check_mark: The cart is emptied
9. :heavy_check_mark: Returns **200** with a message of success with the created order


> ## Exceptions

1. :x: In case of the cart is not eligible (empty)

    Returns **400** "Cart is empty!"

2. :x: In case of the user don't exists

    Returns **400** "User don't exists"

3. :x: In case of the payment fails

    Returns **400** "Invalid payment"

4. :x: In case of server error

    Returns **500** "Internal Server Error"