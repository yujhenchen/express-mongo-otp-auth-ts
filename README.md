<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="https://github.com/yujhenchen/express-mongo-otp-auth-ts">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

<h3 align="center">Project name</h3>

  <p align="center">
    project desc
    <br />
    <a href="https://github.com/yujhenchen/express-mongo-otp-auth-ts"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://jen-restaurant-ordering.netlify.app" target=”_blank”>View Demo</a>
    ·
    <a href="https://github.com/yujhenchen/express-mongo-otp-auth-ts/issues">Report Bug</a>
    ·
    <a href="https://github.com/yujhenchen/express-mongo-otp-auth-ts/issues">Request Feature</a>
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
    <li><a href="#roadmap">Roadmap</a></li>
    <!-- <li><a href="#contributing">Contributing</a></li> -->
    <li><a href="#issues-and-solutions">Issues and solutions</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

project desc

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

<!-- - [![React][React.js]][React-url]-->


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

<!-- ROADMAP -->

## Roadmap

- [x] xxx


See the [open issues](https://github.com/yujhenchen/express-mongo-otp-auth-ts/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ISSUES AND SOLUTIONS -->

## Issues and solutions

### Issue

#### Solution



<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Project Link: [https://github.com/yujhenchen/express-mongo-otp-auth-ts](https://github.com/yujhenchen/express-mongo-otp-auth-ts)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [XXX](https://url.com/)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/yujhenchen/express-mongo-otp-auth-ts.svg?style=for-the-badge
[contributors-url]: https://github.com/yujhenchen/express-mongo-otp-auth-ts/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/yujhenchen/express-mongo-otp-auth-ts.svg?style=for-the-badge
[forks-url]: https://github.com/yujhenchen/express-mongo-otp-auth-ts/network/members
[stars-shield]: https://img.shields.io/github/stars/yujhenchen/express-mongo-otp-auth-ts.svg?style=for-the-badge
[stars-url]: https://github.com/yujhenchen/express-mongo-otp-auth-ts/stargazers
[issues-shield]: https://img.shields.io/github/issues/yujhenchen/express-mongo-otp-auth-ts.svg?style=for-the-badge
[issues-url]: https://github.com/yujhenchen/express-mongo-otp-auth-ts/issues
[license-shield]: https://img.shields.io/github/license/yujhenchen/express-mongo-otp-auth-ts.svg?style=for-the-badge
[license-url]: https://github.com/yujhenchen/express-mongo-otp-auth-ts/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/





## How to

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