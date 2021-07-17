# JebColors
JebColors is a personal module I made to use easier colors in react-native, stores the hexadecimal values of a lot of colors, like bootstrap colors, console colors or the module own colors.

---

[![Build Status](https://app.travis-ci.com/JebBarbas/jebcolors.svg?branch=main)](https://app.travis-ci.com/JebBarbas/jebcolors)
[![dependencies Status](https://status.david-dm.org/gh/jebbarbas/jebcolors.svg)](https://david-dm.org/jebbarbas/jebcolors)

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
There are 57 colors divided in 6 sets.
- bootstrapMainColors (bootstrap's colors like "success", "primary" or "dark")
- bootstrapUnusedColors (bootstrap's unused colors like "purple", "orange" or "teal")
- bootstrapGrayColors (bootstrap's gray colors like "gray100" - "gray900")
- jebcMainColors (The colors that are from this module, like "magic", "juice" or "ocean")
- consoleColors (The colors that you can use in the Windows CMD, like "red", "blue" or "green")
- webColors (The web colors like "deepPink", "hotPink" or "pink", see "Web Colors" for more information)

## Web Colors
I know react-native supports web colors, but I decided to start to including them if you want to made something else with them, besides, I want to add some function to apply a shadow to the color or something similar in the future and I'll need them.
I know there are only few web colors of the total, you can help to completing them, just go to web-variables.js and enter to the link and help writing them.

**WEB_COLORS_WRITTEN = 6/137 (4.37%)**

## Test
If you write colors or/and want to see how many colors there are, you can run in you console `npm test`, if there are any error with a color, you will be able to see in what color and what's the error. If there are not errors, you'll can see a message saying "All ## colors are good" where ## is the number of colors.