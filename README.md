# JebColors
jebcolors is a module that provides a lot of colors, like the bootstrap colors, the web colors or a lot of colors that I personally wrote, like my own colors, social media colors and some languages colors. It also provides gradients from grabient, instagram and uigradients. And functions to use with the colors, like rgb() or light(). This module was originally written by me to use it with react-native, but you can use it with a lot of another node modules like react.

---

[![Build Status](https://app.travis-ci.com/JebBarbas/jebcolors.svg?branch=main)](https://app.travis-ci.com/JebBarbas/jebcolors)
[![dependencies Status](https://status.david-dm.org/gh/jebbarbas/jebcolors.svg)](https://david-dm.org/jebbarbas/jebcolors)
![npm](https://img.shields.io/npm/v/jebcolors)
![npm](https://img.shields.io/npm/dt/jebcolors)
![GitHub top language](https://img.shields.io/github/languages/top/jebbarbas/jebcolors)
![GitHub Repo stars](https://img.shields.io/github/stars/jebbarbas/jebcolors?style=social)

## Installation
```
npm i jebcolors
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
There are 272 colors divided in 8 Color Groups.
- bootstrapMainColors (bootstrap's colors like "success", "primary" or "dark") (8 colors)
- bootstrapUnusedColors (bootstrap's unused colors like "purple", "orange" or "teal") (7 colors)
- bootstrapGrayColors (bootstrap's gray colors like "gray100" - "gray900") (9 colors)
- jebcMainColors (The colors that are from this module, like "magic", "juice" or "ocean") (17 colors)
- jebcUnusedColors (This colors are some that aren't exported before, like "silver2", "roseGold" and "spaceGrey") (14 colors)
- consoleColors (The colors that you can use in the Windows CMD, like "red", "blue" or "green") (16 colors)
- webColors (The web colors like "deepPink", "hotPink" or "pink") (141 colors)
- socialMainColors (The colors of social media, like "facebook", "github" or "google") (34 colors)
- languageMainColors (The main colors from some languages, like "jsYellow", "pyBlue" or "javaRed") (26 colors)

## Gradients
In version 2.0.0+ you can use also gradients, importing `jebcolors/dist/gradients`.

There are 401 gradients in 3 Gradient Groups.
- grabientMainGradients (grabient's gradients, like "sweetOrange", "strongRed" or "magicThree") (14 gradients)
- uiMainGradients (all the gradients from uiGradients at the date that the code was compiled, like "jshine", "flare" or "byDesign") (381 gradients)
- instagramMainGradients (Instagram gradients, like "instagram", "red", and "green") (6 gradients)

In this example I'm going to apply two different gradients (one from grabient and one from uigradients) to 2 different LinearGradient components imported from `expo-linear-gradient`.
```jsx
import React from 'react'
import { Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { grabientMainGradients, uiMainGradients } from 'jebcolors/dist/gradients'

const App = () => (
    <View>
        <LinearGradient
            colors={grabientMainGradients.sweetBlue}
        />
        <LinearGradient
            colors={uiMainGradients.jshine}
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

## Scripts (collaborators-zone)
### npm test
If you write colors and you want to see if there are errors or/and you want to see how many colors there are, you can run in you console `npm test`, if there are any error with a color, you will be able to see in what color and what's the error. If there are not errors, you'll can see a message saying "All ## colors in module passed the test" where ## is the number of colors.

### npm run generatejson
If you want to generate a JSON with all the colors and another one with all the gradients, you can run `npm run generatejson`. 
It will run the test script and then generate the JSON files in './test/colors.json' and './test/gradients.json'.

### npm run watchcolors
If you want to test that all the colors pass the test, and you want to see how the colors look, you can run `npm run watchcolors`, this will test the colors, generate the json, and create a server in the folder `test`.

For each color you will see an `<h1>` with the name, an `<h3>` with the number of colors and a `<div>` with the color of background, and white and black text with the name of the color (you can see which text looks better with the background).

In version 2.3.0+, it also works with gradients, makes the same as colors, but the background is a linear-gradient with the colors.

### npm run getgradients
The gradients from uiGradients are stored in a file in './gradients/uigradients-variables', but this colors are from the [official uiGradients repository](https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json), to avoid using async functions when you use this module, the gradients are fetched in dev-time running `npm run getgradients`, this script fetches all the gradients and saves the result in a file that is going to be compiled and where are going to be the gradients.

### npm run compile
Is used to compile all the TypeScript files.

### npm run compileall
- First, compiles all the files (this is to update the getfiles.ts files)
- Then, fetches the gradients (with the compiled file getfiles.js) and creates "uigradients-variables.ts" in src.
- Compiles all the TypeScript again in the project (principally, the new generated "uigradients-variables.ts" file).
- Then generates the json and creates "colors.json" & "gradients.json" in test.

### npm run release
Changes the package.json in base of the last git commit (see standard-version).

### npm run compartir
Pushes the git repository and publishes the package to npm.

### npm run history
Shows in console a git log.