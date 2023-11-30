# Tournaments App

## Introduction

This project builds upon the existing React Native application with Typescript and Redux, aiming to fulfill the seven core requirements outlined in the challenge. In addition to addressing the primary objectives, the application introduces several notable enhancements to enrich the user experience and improve overall functionality.

## Enhancements and Technologies

- **React Navigation**: Implemented to introduce a `Tournament Details` screen, providing users with a detailed view and additional information pertaining to specific Tournaments.
- **React Native Reanimated**: Utilised to implement smooth and aesthetically pleasing animations within the FlatList component, contributing to a more dynamic and engaging user interface.
- **React Native Feather Icons**: Integrated to add visually appealing icons, enhancing the aesthetic appeal and user experience on the `Tournament Details` screen.

## Additional Dependencies

- **[Lodash](https://www.npmjs.com/package/lodash)**: A modern JavaScript utility library delivering modularity, performance & extras, employed for various helper functions.
- **[Date Fns](https://www.npmjs.com/package/date-fns)**: A comprehensive, yet simple and consistent toolset for manipulating JavaScript dates, utilized to enhance date and time manipulation capabilities.
- **[React Native Prompt](https://www.npmjs.com/package/react-native-prompt)**: Initially integrated for prompt dialog functionalities, though it was subsequently replaced with a custom prompt component tailored to the application’s specific needs.
- **[React Native Feather Icons](https://www.npmjs.com/package/react-native-feather)**: A collection of simply beautiful open-source icons from Feather, providing a wide range of icon options to enhance the visual experience across the application.

##

# Mobile Coding Challenge

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli) and has addtional libraries included:

- [Redux](https://redux.js.org/)
- [Redux Thunk](https://github.com/reduxjs/redux-thunk)
- [React Redux](https://react-redux.js.org/)
- [styled-components](https://styled-components.com/)
- [polished](https://polished.js.org/)

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Available Scripts

In the project directory, you can run:

### `yarn start:api`

```sh
yarn start:api
```

Starts the fake REST API server on [http://localhost:4000](http://localhost:4000).

#### Notes

- You can re-run the script to reset/regenerate the data.

## Fake REST API

Running on [http://localhost:4000](http://localhost:4000).

### `/tournaments`

#### GET

Get a list of tournaments.

##### Query Parameters

###### `q`

Type: `string`

Search tournaments by any value

###### `_page`

Type: `number`

Search tournaments by page

###### `_limit`

Type: `number` - _10 by default_

Set maximum number of items per page

##### Response Example

```json
[
  {
    "id": "79218e94-91fd-4420-8278-f453574b97c4",
    "name": "Veritatis Quam Facilis",
    "organizer": "Rerum Perspiciatis",
    "game": "Rocket League",
    "participants": {
      "current": 206,
      "max": 256
    },
    "startDate": "2020-02-27T11:28:02.233Z"
  },
  {
    "id": "042fddd8-882f-4dd3-9cf1-ff82a3c8be9f",
    "name": "Cum Eveniet Quibusdam",
    "organizer": "Id",
    "game": "Dota 2",
    "participants": {
      "current": 168,
      "max": 256
    },
    "startDate": "2020-02-27T11:28:02.233Z"
  },
  {
    "id": "2eb5d07a-8ce5-4b36-8c0f-76b55701d9cc",
    "name": "Numquam Fuga Totam",
    "organizer": "Quaerat Dolorem",
    "game": "Dota 2",
    "participants": {
      "current": 256,
      "max": 256
    },
    "startDate": "2020-02-27T11:28:02.233Z"
  }
]
```

#### POST

Create a tournament.

##### Request Example

```json
{
  "name": "Foo"
}
```

##### Response Example

```json
{
  "id": "2b86b928-a0b5-4dec-8b5a-5f3519790829",
  "name": "Foo",
  "organizer": "Voluptas",
  "game": "League of Legends",
  "participants": {
    "current": 204,
    "max": 256
  },
  "startDate": "2020-02-27T11:36:27.047Z"
}
```

### `/tournaments/:id`

#### PATCH

Edit a tournament.

##### Request Example

```json
{
  "name": "Bar"
}
```

##### Response Example

```json
{
  "id": "2b86b928-a0b5-4dec-8b5a-5f3519790829",
  "name": "Bar",
  "organizer": "Voluptas",
  "game": "League of Legends",
  "participants": {
    "current": 204,
    "max": 256
  },
  "startDate": "2020-02-27T11:36:27.047Z"
}
```

#### DELETE

Delete a tournament.

##### Response Example

```json
{}
```
