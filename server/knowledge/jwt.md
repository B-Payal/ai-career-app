JWT authentication is a token-based authentication mechanism.

When a user logs in successfully, the server can generate a JWT.
The client sends this token with subsequent requests.

A JWT commonly consists of three parts:
header, payload, and signature.

The signature allows the server to verify that the token
has not been modified.