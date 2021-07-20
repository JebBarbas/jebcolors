# JebColors
JebColors is a personal module I made to use easier colors in react-native, stores the hexadecimal values of a lot of colors, like bootstrap colors, console colors or the module own colors.

---

[![Build Status](https://app.travis-ci.com/JebBarbas/jebcolors.svg?branch=main)](https://app.travis-ci.com/JebBarbas/jebcolors)
[![dependencies Status](https://status.david-dm.org/gh/jebbarbas/jebcolors.svg)](https://david-dm.org/jebbarbas/jebcolors)
![npm](https://img.shields.io/npm/v/jebcolors)
![GitHub top language](https://img.shields.io/github/languages/top/jebbarbas/jebcolors)
![GitHub Repo stars](https://img.shields.io/github/stars/jebbarbas/jebcolors?style=social)

## Installation
```
npm install jebcolors
```

## Quick Start - Import
You can import the module either using `import` or `require`.
```javascript
import { jebcMainColors } from 'jebcolors'
// OR
const { jebcMainColors } = require('jebcolors')
```

## Quick Start - Usage
To use this module you only import the set of colors you prefer (see "Color Sets") and select the color you want. In this example I'm going to use the "dark" color of bootstrap and the "magic" color of jebc, and I'm going to use them in an example of a react-native Stylesheet.
```javascript
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { bootstrapMainColors, jebcMainColors } from 'jebcolors'

const App = () => (
    <View style={styles.container}>
        <Text style={styles.text}>Using jebcolors</Text>
    </View>
);

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
});

export default App;
```

## Color Sets
There are 413 colors divided in 14 sets.
- bootstrapMainColors (bootstrap's colors like "success", "primary" or "dark")
- bootstrapUnusedColors (bootstrap's unused colors like "purple", "orange" or "teal")
- bootstrapGrayColors (bootstrap's gray colors like "gray100" - "gray900")
- jebcMainColors (The colors that are from this module, like "magic", "juice" or "ocean")
- consoleColors (The colors that you can use in the Windows CMD, like "red", "blue" or "green")
- webColors (The web colors like "deepPink", "hotPink" or "pink", see "Web Colors" for more information)
- brandXColors (A lot of colors from the most famous brands, like "google", "facebook" and even "walmart", just change the x for one of the 8 brand variants: "Bank", "Car", "Food", "Market", "Patented", "Social", "Tech" or "WebAndBrand", for instance, one object can be "brandBankColors", "brandPatentedColors" or "brandSocialColors")
- languageMainColors (The main colors from some languages, like "jsYellow", "pyBlue" or "javaRed")

## Web Colors
I know react-native supports web colors, but I decided to start to including them if you want to made something else with them, besides, I want to add some function to apply a shadow to the color or something similar in the future and I'll need them.

## Test
If you write colors and you want to see if there are errors or/and you want to see how many colors there are, you can run in you console `npm test`, if there are any error with a color, you will be able to see in what color and what's the error. If there are not errors, you'll can see a message saying "All ## colors in module passed the test" where ## is the number of colors.

## Watchcolors
If you want to test that all the colors pass the test, and you want to see how the colors look, you can run `npm run watchcolors`, this will run `npm test && npx serve test`, this will create a server in the folder `test` and will create a `<div>` for each color in all the module.