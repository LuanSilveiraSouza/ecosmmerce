# User Login

> ## Success cases

1. :heavy_check_mark: User sends requests with Bearer token header
2. :heavy_check_mark: Server validates the header
3. :heavy_check_mark: Server pass foward to the requested resource 

> ## Exceptions

1. :x: In case of empty header
    
    Returns **401** "Header not included"

2. :x: In case of invalid token

    Returns **401** "Invalid token"

3. :x: In case of server error

    Returns **500** "Internal Server Error"