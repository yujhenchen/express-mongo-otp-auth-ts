<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Project name</h3>

  <p align="center">
    project desc
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <!-- <li><a href="#prerequisites">Prerequisites</a></li> -->
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <!-- <li><a href="#usage">Usage</a></li> -->
    <li><a href="#issues-and-solutions">Issues and solutions</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

project desc

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Express.js]][Express.js-url]
- [![MongoDB]][MongoDB-url]
- [![TypeScript]][TypeScript-url]
- [Joi]
- [Mongoose]
- [jsonwebtoken]
- [module-alias]
- [Nodemailer]


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

some steps

<!-- ### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ``` -->

### Installation

Install packages

```sh
yarn
```

Launch at localhost in development mode

```sh
yarn dev
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
<!-- ## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- ISSUES AND SOLUTIONS -->

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express.js-url]: https://expressjs.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/products/platform/atlas-database
[TypeScript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Joi]: https://joi.dev/
[Mongoose]: https://mongoosejs.com/
[jsonwebtoken]: https://github.com/auth0/node-jsonwebtoken
[module-alias]: https://github.com/ilearnio/module-alias
[Nodemailer]: https://nodemailer.com/
