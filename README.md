## Issues and solutions

### Get error
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