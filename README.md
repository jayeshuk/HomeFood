# Khamang - Home Food to Hostel

An Android app to serve the working professionals and students, home-made hygenic food from the local cooks where they live.

Built with React, React Native, Redux, JavaScript, and CSS.

## Technology
<h2 align="center">
  <a href="https://reactnative.dev/">
    React Native
  </a>
</h2>

<h3 align="center">
  <a href="https://reactnative.dev/docs/getting-started">Getting Started</a>
  <span> · </span>
  <a href="https://reactnative.dev/docs/tutorial">Learn the Basics</a>
  <span> · </span>
  <a href="https://reactnative.dev/showcase.html">Showcase</a>
  <span> · </span>
  <a href="https://reactnative.dev/docs/contributing">Contribute</a>
  <span> · </span>
  <a href="https://reactnative.dev/en/help">Community</a>
  <span> · </span>
  <a href="https://github.com/facebook/react-native/blob/master/.github/SUPPORT.md">Support</a>
</h3>

React Native brings [**React**'s][r] declarative UI framework to iOS and Android. With React Native, you use native UI controls and have full access to the native platform.

- **Declarative.** React makes it painless to create interactive UIs. Declarative views make your code more predictable and easier to debug.
- **Component-Based.** Build encapsulated components that manage their state, then compose them to make complex UIs.
- **Developer Velocity.** See local changes in seconds. Changes to JavaScript code can be live reloaded without rebuilding the native app.
- **Portability.** Reuse code across iOS, Android, and [other platforms][p].

React Native is developed and supported by many companies and individual core contributors. Find out more in our [ecosystem overview][e].

[r]: https://reactjs.org/
[p]: https://reactnative.dev/docs/out-of-tree-platforms
[e]: https://github.com/facebook/react-native/blob/master/ECOSYSTEM.md

<h2 align="center">
  <a href="https://akveo.github.io/react-native-ui-kitten/">
    Kitten UI
  </a>
</h2>

<h3 align="center">
  <a href="https://github.com/akveo/react-native-ui-kitten">Getting Started</a>
  <span> · </span>
  <a href="https://akveo.github.io/react-native-ui-kitten/docs">Learn the Basics</a>
  <span> · </span>
  <a href="https://eva.design/?utm_campaign=eva_design%20-%20home%20-%20ui_kitten%20docs&utm_source=ui_kitten&utm_medium=referral&utm_content=homepage_based_on_eva_link">Eva Design System</a>
  <span> · </span>
  <a href="https://github.com/akveo/kittenTricks">Kitten Tricks</a>
  <span> · </span>
</h3>

UI Kitten is a React Native implementation of Eva Design System. It contains a set of general purpose UI components styled in a similar way. You focus on business logic and the Kitten takes care of visual appearance. And the most awesome thing: the themes can be changed in the runtime, without any need of reloading the application.

100% native. Give Kitten UI a try!


## Updating to New Releases

You should only need to update the global installation of `create-react-native-app` very rarely, ideally never.

Updating the `react-native-scripts` dependency of your app should be as simple as bumping the version number in `package.json` and reinstalling your project's dependencies.

Upgrading to a new version of React Native requires updating the `react-native`, `react`, and `navigation` package versions, and setting the correct `sdkVersion` in `app.json`. See the [versioning guide](https://github.com/react-community/create-react-native-app/blob/master/VERSIONS.md) for up-to-date information about package version compatibility.

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

1. Installation:

    `npm install`    

2. Prerequisites to Run:
    
     - Connect Physical Android/iOS device in USB debugging mode  OR  Launch Emulator using AVD Manager [Android Studio].
     - Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

          ```
          npm start -- --reset-cache
          # or
          yarn start -- --reset-cache
          ```

3. To Start Android Application:

    * For Android users:
      `npx react-native run-android`

    * For iOS users:
      `npx react-native run-ios`

4. To Visit App: 
    
    App Launched in your Android/iOS Device
    
5. Login Details (Demo): 
    
    Role : Both User or Maker can be selected
    
    Email Id : adi@jonas.io
    
    Password : test1234
    
## Run tests
Unittests: `npm run mocha`

Unittests with coverage: `npm run coverage`

Linter: `npm run lint`
