[![Build Status](https://travis-ci.com/NickolasBenakis/searchGifs.svg?token=qxst7gxQLWN7UYpYnuGV&branch=master)](https://travis-ci.com/NickolasBenakis/searchGifs)

# searchGifs

<p align="center">
  <img width="128" height="128" src="https://res.cloudinary.com/nickolasben/image/upload/v1579434804/searchGifs/xarqacyozabcvgcwc7la.png">
</p>

## Table of Contents

-   [Intro](#intro)
-   [Install](#install)
-   [Build](#build)
-   [Run](#run)
-   [Test](#test)
-   [CI](#continuousIntegration)
-   [Optimizations](#Optimizations)

## Intro

Production built is deployed -> https://searchgifs.surge.sh/.

SearchGifs is a single page application that consumes the [GIPHY API](https://developers.giphy.com/).
It displays, search and deletes GIFS. It is built in [React.js](https://reactjs.org/).
It is PWA ready and installable on mobile devices.

## Features

-   Built with bundler (create-react-app)
-   Mobile-first design
-   Delete images functionality
-   Persist results and search term on page refresh
-   Copy GIF URL to clipboard

## Install

To install, `cd` to project root and run:

```
$ npm install
```

## Build

To build for production, `cd` to project root and run:

```
$ npm run build
```

## Run

To run the app in development, `cd` to project root and run:

```
$ npm start
```

## Test

This application does rely on jest testing framework. Run this following command to test the whole coverage of the app:

```
$ npm test
```

This uses `jest` to test the whole coverage of the application.

## CI

This application is getting build in every commit/ PR with Travis.To ensure that the production build does not break.

### Optimizations

A few optimizations have been implemented to help improve the performance of the app, including:

-   Used CDN cloudinary for prefeching images in order to optimize image resolution, responsiveness depending on the viewport and the device [here](https://cloudinary.com/) see more at `src/utils/handleImageUrl.js`
-   Lazy loading of GIF images with [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) see more at `src/utils/lazyLoadImages.js`
-   Lazy load components with React.lazy
-   Handling refresh by saving on session storage gif results, searchTerm query
-   Register service worker, offline mode (Right now only works on localhost)
