# JebColors
JebColors is a personal module I made to use colors in a easier mode in react-native, stores the hexadecimal values of a lot of colors, like bootstrap colors, console colors or the module own colors.

Now, in version 2.0.0+ it also stores some arrays with colors from [Grabient](https://www.grabient.com/) and [uiGradients](https://uigradients.com/) (see "Gradients" to more information).

Now, in version 2.0.0+ it also stores some functions to use with colors (see "Functions" to more information).

---

[![Build Status](https://app.travis-ci.com/JebBarbas/jebcolors.svg?branch=main)](https://app.travis-ci.com/JebBarbas/jebcolors)
[![dependencies Status](https://status.david-dm.org/gh/jebbarbas/jebcolors.svg)](https://david-dm.org/jebbarbas/jebcolors)
![npm](https://img.shields.io/npm/v/jebcolors)
![npm](https://img.shields.io/npm/dt/jebcolors)
![GitHub top language](https://img.shields.io/github/languages/top/jebbarbas/jebcolors)
![GitHub Repo stars](https://img.shields.io/github/stars/jebbarbas/jebcolors?style=social)

## Installation
```
npm install jebcolors
```

## Quick Start - Import Colors
You can import the module either using `import` or `require`.
```javascript
import { jebcMainColors } from 'jebcolors'
// OR
const { jebcMainColors } = require('jebcolors')
```

## Quick Start - Usage
To use this module you only import the group of colors that you prefer (see "ColorGroups") and select the color you want. In this example I'm going to use the "light" color of bootstrap and the "magic" color of jebc, and I'm going to use them in an example of a react-native Stylesheet.
```jsx
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { bootstrapMainColors, jebcMainColors } from 'jebcolors'

const App = () => (
    <View style={styles.container}>
        <Text style={styles.text}>Using jebcolors</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: jebcMainColors.magic
    },
    title: {
        color: bootstrapMainColors.light,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
    }
})

export default App;
```

## ColorGroups
There are 269 colors divided in 8 Color Groups.
- bootstrapMainColors (bootstrap's colors like "success", "primary" or "dark")
- bootstrapUnusedColors (bootstrap's unused colors like "purple", "orange" or "teal")
- bootstrapGrayColors (bootstrap's gray colors like "gray100" - "gray900")
- jebcMainColors (The colors that are from this module, like "magic", "juice" or "ocean")
- jebcUnusedColors (This colors are some that aren't exported before, like "silver2", "roseGold" and "spaceGrey")
- consoleColors (The colors that you can use in the Windows CMD, like "red", "blue" or "green")
- webColors (The web colors like "deepPink", "hotPink" or "pink")
- socialMainColors (The colors of social media, like "facebook", "github" or "google")
- languageMainColors (The main colors from some languages, like "jsYellow", "pyBlue" or "javaRed")

## Gradients
In version 2.0.0+ you can use also gradients, importing `jebcolors/dist/gradients`.
In this example I'm going to apply two different gradients (one from grabient and one from uigradients) to 2 different LinearGradient components imported from `expo-linear-gradient`.
```jsx
import React from 'react'
import { Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { grabientMainGradients, getUi } from 'jebcolors/dist/gradients'

const App = () => (
    <View>
        <LinearGradient
            colors={grabientMainGradients.sweetBlue}
        />
        <LinearGradient
            colors={getUi("JShine")}
        />
    </View>
)

export default App
```

## Functions
In version 2.0.0+ you can use also some color-relationated functions, importing `jebcolors/dist/functions`.
In this example, I'g going to show the rgb, hsl and light functions.
```javascript
import {rgb, hsl, light} from 'jebcolors/dist/functions'

const primaryColor = rgb(100, 200, 250)
const secondaryColor = hsl(1,0.5,0.5)
const theme = {
    primary: primaryColor,
    secondary: secondaryColor,
    hover: light(primaryColor, 0.8),
    disabled: light(secondaryColor, 1.2)
}
```

## Scripts (dev-zone)
### npm test
If you write colors and you want to see if there are errors or/and you want to see how many colors there are, you can run in you console `npm test`, if there are any error with a color, you will be able to see in what color and what's the error. If there are not errors, you'll can see a message saying "All ## colors in module passed the test" where ## is the number of colors.

### npm run generatejson
If you want to generate a JSON with all the colors you can run `npm run generatejson`. It will test all the colors and then generate the JSON file in './test/colors.json'.

### npm run watchcolors
If you want to test that all the colors pass the test, and you want to see how the colors look, you can run `npm run watchcolors`, this will test the colors, generate the json, create a server in the folder `test` and create a `<div>` for each color in all the module (only colors, not gradients yet).

### npm run getgradients
The gradients from uiGradients are stored in a file in './gradients/uigradients-gradients.ts', but this colors are from the [official uiGradients repository](https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json), to avoid using async functions when you use this module, the gradients are fetched in dev-time running `npm run getgradients`, this script fetches all the gradients and saves the result in a file that is going to be compiled and where are going to be the gradients.

### npm run compile
Is used to compile all the TypeScript files.

### npm run compileall
- First, compiles all the files (this is to update the getfiles.ts files)
- Then, fetches the gradients (with the compiled file getfiles.js) and creates "uigradients-gradients.js" in dist.
- Then generates the json of colors and creates "colors.json" in test.
- Compiles all the TypeScript again in the project.

### npm run release
Changes the package.json in base of the last git commit (see standard-version) and pushes the git repository.