# Uber Clone API Documentation

## User Endpoints

Base URL: `/api/v1/user`

---

## 1. Register User

### Endpoint

```
POST /api/v1/user/register
```

### Description

Creates a new user account with the provided credentials. The endpoint validates the input data and registers a new user if they don't already exist.

### Access

Public (No authentication required)

### Request Headers

```
Content-Type: application/json
```

### Request Body

| Field                | Type   | Required | Validation                             |
| -------------------- | ------ | -------- | -------------------------------------- |
| `fullname.firstname` | String | Yes      | Minimum 3 characters                   |
| `fullname.lastname`  | String | No       | -                                      |
| `email`              | String | Yes      | Valid email format, unique in database |
| `password`           | String | Yes      | Minimum 6 characters                   |

### Request Example

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "password123"
}
```

### Response Codes

| Status Code | Description                             |
| ----------- | --------------------------------------- |
| `201`       | User registered successfully            |
| `400`       | User already exists or validation error |
| `500`       | Server error                            |

### Success Response (201)

```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "createdAt": "2025-02-28T10:30:00Z",
    "updatedAt": "2025-02-28T10:30:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Response (400)

```json
{
  "message": "User already exist"
}
```

### Error Response (400) - Validation Error

```json
{
  "errors": [
    {
      "type": "field",
      "value": "ab",
      "msg": "Firstname must be at least 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

---

## 2. Login User

### Endpoint

```
POST /api/v1/user/login
```

### Description

Authenticates a user with email and password credentials. Returns a JWT token upon successful authentication.

### Access

Public (No authentication required)

### Request Headers

```
Content-Type: application/json
```

### Request Body

| Field      | Type   | Required |
| ---------- | ------ | -------- |
| `email`    | String | Yes      |
| `password` | String | Yes      |

### Request Example

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Response Codes

| Status Code | Description                 |
| ----------- | --------------------------- |
| `200`       | User logged in successfully |
| `401`       | Invalid email or password   |
| `500`       | Server error                |

### Success Response (200)

```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "createdAt": "2025-02-28T10:30:00Z",
    "updatedAt": "2025-02-28T10:30:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Response (401) - Invalid Credentials

```json
{
  "message": "Invalid email or password"
}
```

### Error Response (401) - Password Mismatch

```json
{
  "message": "Password does not match"
}
```

### Notes

- A JWT token is generated and set in cookies with key `token`
- Token expires in 24 hours
- The token should be included in subsequent requests requiring authentication

---

## 3. Get User Profile

### Endpoint

```
GET /api/v1/user/profile
```

### Description

Retrieves the profile information of the authenticated user.

### Access

Private (Authentication required)

### Request Headers

```
Authorization: Bearer <token>
```

OR

```
Cookie: token=<token>
```

### Query Parameters

None

### Request Body

None

### Response Codes

| Status Code | Description                             |
| ----------- | --------------------------------------- |
| `200`       | Profile retrieved successfully          |
| `401`       | Unauthorized - Invalid or missing token |
| `500`       | Server error                            |

### Success Response (200)

```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "createdAt": "2025-02-28T10:30:00Z",
    "updatedAt": "2025-02-28T10:30:00Z"
  }
}
```

### Error Response (401) - Unauthorized

```json
{
  "message": "Unauthorized"
}
```

### Notes

- Requires valid JWT token in Authorization header or cookies
- Returns the authenticated user's profile information

---

## 4. Logout User

### Endpoint

```
GET /api/v1/user/logout
```

### Description

Logs out the authenticated user by clearing the session token and adding it to a blacklist to prevent reuse.

### Access

Private (Authentication required)

### Request Headers

```
Authorization: Bearer <token>
```

OR

```
Cookie: token=<token>
```

### Query Parameters

None

### Request Body

None

### Response Codes

| Status Code | Description                             |
| ----------- | --------------------------------------- |
| `200`       | User logged out successfully            |
| `401`       | Unauthorized - Invalid or missing token |
| `500`       | Server error                            |

### Success Response (200)

```json
{
  "message": "Loggout Successfully"
}
```

### Error Response (401) - Unauthorized

```json
{
  "message": "Unauthorized"
}
```

### Notes

- Requires valid JWT token in Authorization header or cookies
- Token is cleared from cookies
- Token is added to blacklist to prevent further use
- Subsequent requests with the same token will be rejected

---

## Authentication Flow

1. **Register**: User creates an account with `/user/register`
2. **Login**: User logs in with `/user/login` to receive a JWT token
3. **Profile**: User can access their profile with `/user/profile` using the token
4. **Logout**: User logs out with `/user/logout` to invalidate their token

## Token Management

- Tokens are JWT-based and expire after 24 hours
- Tokens can be passed via:
  - `Authorization` header: `Authorization: Bearer <token>`
  - `Cookie`: Automatically set during login

## Error Handling

All endpoints return appropriate HTTP status codes:

- `2xx`: Successful requests
- `4xx`: Client errors (validation, authentication)
- `5xx`: Server errors

Validation errors return status `400` with an array of error messages.

---

## Example Usage with cURL

### Register

```bash
curl -X POST http://localhost:5000/api/v1/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/v1/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Profile

```bash
curl -X GET http://localhost:5000/api/v1/user/profile \
  -H "Authorization: Bearer <token>"
```

### Logout

```bash
curl -X GET http://localhost:5000/api/v1/user/logout \
  -H "Authorization: Bearer <token>"
```

---

## Environment Variables

Ensure the following environment variables are set:

- `JWT_SECRET`: Secret key for JWT token generation and verification

---

## Models

### User Schema

```json
{
  "_id": ObjectId,
  "fullname": {
    "firstname": String (required, min 3 chars),
    "lastname": String (optional)
  },
  "email": String (required, unique, valid email),
  "password": String (required, hashed, min 6 chars),
  "socketId": String (optional),
  "createdAt": Date,
  "updatedAt": Date
}
```

---

## Security Notes

- Passwords are hashed using bcryptjs before storage
- Tokens are JWT-based with 24-hour expiration
- Logout tokens are blacklisted to prevent reuse
- Email addresses must be unique in the system
