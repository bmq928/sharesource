<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center">
  <h3 align="center">Sharesource</h3>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#run">Run</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## About The Project

This project build with these technology and frameworks:

- Nodejs
- Express/Nestjs
- Reactjs/Nextjs
- MUI
- RTK

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites

These tools should be installed:

- Nodejs
- Npm

### Installation

1. Install NPM packages
   ```sh
   npm install
   ```
2. (optional) Create an local.env for each step in each project and change value

   ```sh
   # Create custom env
   cat apps/backend/.env > apps/backend/.local.env
   cat apps/frontend/.env > apps/frontend/.local.env

    # change values of that env
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Run

1. Run frontend
   ```sh
   npx nx dev frontend
   ```
2. Run backend
   ```sh
   npx nx serve backend
   ```
   <p align="right">(<a href="#readme-top">back to top</a>)</p>
3. Go to UI in browser:

- Frontend: http://localhost:3000
- Backend (API): http://localhost:3001/api
- Backend (Swagger): http://localhost:3001/swagger
