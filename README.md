## How to

### Build docker image

#### Set sensitive data (such as JWT secret), and not sensitive data (such as node env)


## Issues and solutions

### Get error `Error: Method no longer accepts array arguments: valid`
The full error message:
````
node_modules\@hapi\hoek\lib\error.js:23
            Error.captureStackTrace(this, exports.assert);
                  ^
Error: Method no longer accepts array arguments: valid
````

When passing the array `Object.values(UserRole)` into `Joi.string().valid()`
````
export const UserRole = {
    ADMIN: 'admin',
    visitor: 'user',
    GUEST: 'guest'
} as const;

...

role: Joi.string().valid(Object.values(UserRole)),

...
````

##### Solution
- https://github.com/hapijs/joi/issues/2468

Use Spread syntax (...) to expand the array.

````
...

role: Joi.string().valid(...Object.values(UserRole)),

...
````