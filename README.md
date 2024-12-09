# Digital Learning App

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
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This app is a program management platform that allows users to create and manage programs with associated modules. Built with Next.js, Material-UI, and Axios, it includes authentication, dynamic forms, and modular components.

### Built With

Below are frameworks/ libraries used to bootstrap this project.

- ![NextJs](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)
- ![Strapi](https://img.shields.io/badge/-strapi-%230170FE?style=for-the-badge&logo=strapi&logoColor=white)
- ![Material](https://img.shields.io/badge/-Material-%230170FE?style=for-the-badge&logo=Material&logoColor=white)
- ![Pnpm](https://img.shields.io/badge/pnpm-%232C8EBB.svg?style=for-the-badge&logo=pnpm&logoColor=white)
- ![Playwright](https://img.shields.io/badge/playwright-%23C63D14.svg?style=for-the-badge&logo=playwright&logoColor=%23FFFFFF)

## Getting Started

Below are instructions on setting up your project locally.

### Prerequisites

- Node 21
- Pnpm 9.14.4
- Typescript: ~5.5.2
- NextJs: ^15.0.4
- MaterialUI: ^6.1.10
- StrapiJs: 5.5.0

### Installation

1. Clone the repo
   ```sh
    git clone https://github.com/dnyaneshwargiri/digital-learning-app.git
    git checkout feature
   ```
2. Go to backend directory
   ```sh
   cd backend
   ```
3. Install NPM packages
   ```sh
    pnpm install/ yarn install
   ```
4. Run Strapi CMS
   ```sh
   pnpm start
   ```
5. Go to frontend directory
   ```sh
   cd frontend
   ```
6. Go to frontend directory
   ```sh
   pnpm build
   ```
7. Install NPM packages
   ```sh
    pnpm install/ yarn install
   ```
8. Run the NextJs app
   ```sh
   pnpm dev /* dev mode */
   pnpm build /* compile for production */
   ```

## Test and Lint

Run test cases

```sh
pnpm test
```

Check for linting Warnings, Error

```sh
pnpm lint
```

Please be informed commits are intentionly not squashed.

## Open issues

1. Grid from material UI is deprecated and Grid2 have one open compile time issue.
2. Blocked aria-hidden on an element because its descendant retained focus.
