# JebColors
jebcolors is a module that provides a lot of colors, like the bootstrap colors, the web colors or a lot of colors 
that I personally wrote, like my own colors, social media colors and some languages colors. It also provides 
gradients from grabient, instagram and uigradients.

This module was originally written by me to use it with react-native, but you can use it with a lot of another node
modules like react. You can also use the "bundle.js" file and use it in the browser in `window.jebcolors` (contains 
colors, gradients and classes).

---

![Travis (.com)](https://img.shields.io/travis/com/jebbarbas/jebcolors)
![David](https://img.shields.io/david/jebbarbas/jebcolors)
![npm](https://img.shields.io/npm/dt/jebcolors)
![NPM](https://img.shields.io/npm/l/jebcolors)
![npm](https://img.shields.io/npm/v/jebcolors)
![GitHub top language](https://img.shields.io/github/languages/top/jebbarbas/jebcolors)

## News - PLEASE READ
- In version 3.0.0, the functions are removed and remplaced with the Color and Gradient classes that 
contains this functions either in static or as an instance, so, if you are using functions like
`fixHexCode()`, `getRedValue()` or `isDark()` in your code, either don't update `jebcolors` or replace with
their equivalent (see "Functions Equivalents in Supercolors" below).
- You can see the colors working [here](https://jebbarbas.github.io/jebcolors).

## Installation & Use - Node
To install just run in your console:
```
npm i jebcolors
```

Now you can import the module either using ES2015 `import` or commonJS `require`. (In this and bellow examples
I'm going to use ES2015 syntax).

```js
import { jebcMainColors, uiMainGradients, supercolor } from 'jebcolors'
// OR
const { jebcMainColors, uiMainGradients, supercolor } = require('jebcolors')
```

Here is a little example of how to usege in a `.jsx` file for `react-native`:

```jsx
import React from "react"
import { Text, View } from "react-native"
import { bootstrapMainColors, jebcMainColors } from 'jebcolors'

const Background = ({hexcode}) => {
    const {code, text} = supercolor(hexcode)

    return (
        <View 
            style={{
                flex: 1,
                padding: 24,
                backgroundColor: code
            }}
        >
            <Text 
                style={{
                    color: text,
                    textAlign: "center",
                    fontSize: 30,
                    fontWeight: "bold"
                }}
            >
                Background: {code}; Text: {text}
            </Text>
        </View>
    )
}

const App = () => (
    <View>
        <Background hexcode={jebcMainColors.magic}/>
        <Background hexcode={jebcMainColors.blood}/>
        <Background hexcode={bootstrapMainColors.primary}/>
        <Background hexcode={bootstrapMainColors.success}/>
        <Background hexcode="hotpink"/>
    </View>
)

export default App;
```

And here is another example, but here I used a `react-native-paper` component:

```jsx
import { bootstrapMainColors } from 'jebcolors'
import Profile from './Profile' // Imaginary component where we show a profile
import { useProfile } from './hooks/useProfile' // Imaginary hook to get functions that affect the profile
import { View } from 'react-native'
import { Button } from 'react-native-paper'

const App = () => {
    const {
        editProfile,
        deleteProfile,
        sendFriendRequest,
    } = useProfile() // Imaginary functions that affect the profile

    const { danger, warning, success } = bootstrapMainColors

    return (
        <View>
            <Profile />
            <Button icon="account-edit" type="contained" color={warning} onPress={editProfile}>Edit</Button>
            <Button icon="account-remove" type="contained" color={danger} onPress={deleteProfile}>Delete</Button>

            <Button 
                icon="account-plus" 
                type="contained" 
                color={success} 
                onPress={sendFriendRequest}
            >
                Send Friend Request
            </Button>
        </View>
    )
}

export default App
```

## Instalation & Use - Browser
You can use the [jsDelivr](https://cdn.jsdelivr.net/npm/jebcolors@3.0.0/dist/bundle.js) cdn to import the bundle.
```html
<script src="https://cdn.jsdelivr.net/npm/jebcolors@3.0.0/dist/bundle.js"></script>
```
Now jebcolors is available in `window.jebcolors` (or only `jebcolors`, because `window` is global).

- To access to the colors use `jebcolors.colors`. Ex: `jebcolors.colors.bootstrapMainColors.primary`
- To access to the gradients use `jebcolors.gradients`. Ex: `jebcolors.gradients.uiMainGradients.jShine`
- To access to the classes like `Gradient`, `Color` or the superx functions use `jebcolors.superclasses`.
Ex: `jebcolors.superclasses.Color.rgb([100,80,0])`, `jebcolors.superclasses.supercolor("#ff8000")`.

Here is a little example of usage in a part of an HTML file:

```html
<script src="path/to/jebcolors/bundle.js"></script>
<script>
    const { colors, superclasses } = jebcolors
    const divElement = document.querySelector('#divElement')
    const anotherDiv = document.querySelector('#anotherDiv')

    const superPrimary = superclasses.supercolor(colors.bootstrapMainColors.primary)

    divElement.style.background = superPrimary.code
    divElement.style.color = superPrimary.text

    const linearGradient = (stringArray) => `linear-gradient(135deg, ${colorArray.join()})`
    const megaPrimary = superclasses.upgradecolor(superPrimary)

    anotherDiv.style.background = linearGradient(megaPrimary.gradientWithAnalogous.codes)
    anotherDiv.style.color = megaPrimary.averageColor.text
</script>
```

## ColorGroups
There are 273 colors divided in 8 Color Groups.
- bootstrapMainColors (bootstrap's colors like "success", "primary" or "dark") (8 colors)
- bootstrapUnusedColors (bootstrap's unused colors like "purple", "orange" or "teal") (7 colors)
- bootstrapGrayColors (bootstrap's gray colors like "gray100" - "gray900") (9 colors)
- jebcMainColors (The colors that are from this module, like "magic", "juice" or "ocean") (18 colors)
- jebcUnusedColors (This colors are some that aren't exported before, like "silver2", "roseGold" and "spaceGrey") (14 colors)
- consoleColors (The colors that you can use in the Windows CMD, like "red", "blue" or "green") (16 colors)
- webColors (The web colors like "deepPink", "hotPink" or "pink") (141 colors)
- socialMainColors (The colors of social media, like "facebook", "github" or "google") (34 colors)
- languageMainColors (The main colors from some languages, like "jsYellow", "pyBlue" or "javaRed") (26 colors)

## Gradients
In version 2.0.0+ you can use also gradients.

There are 401 gradients in 3 Gradient Groups.
- grabientMainGradients (grabient's gradients, like "sweetOrange", "strongRed" or "magicThree") (14 gradients)
- uiMainGradients (all the gradients from uiGradients at the date that the code was compiled, like "jshine", "flare" or "byDesign") (381 gradients)
- instagramMainGradients (Instagram gradients, like "instagram", "red", and "green") (6 gradients)

In this example I'm going to apply two different gradients (one from grabient and one from uigradients) to 2 different LinearGradient components imported from `expo-linear-gradient`.

```jsx
import React from 'react'
import { Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { grabientMainGradients, uiMainGradients } from 'jebcolors'

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

## Supercolors
In version 3.0.0+ the functions are deleted and now the Color class is introduced, is based in the module `colors` 
but contains more features like: support css colors, directly provide the best color for a text when the supercolor
is the background color.

To make a color a supercolor, just use the `supercolor()` function or create one from the Class `Color`.

```js
import { Color, supercolor, bootstrapMainColors } from 'jebcolors'

const redFromCSS = supercolor('red')
const redFromCode = supercolor('#ff0000')
const randomColor = Color.random()
const randomColorFromSeed = Color.seed('jebcolors')
const greenFromRGB = Color.rgb([0,255,0])
const greenFromHSL = Color.hsl([120,100,50])

const superPrimary = supercolor(bootstrapMainColors.primary)

// Now you can use functions in a supercolor
const darkerRed = redFromCSS.darken(1.2)
const lighterRed = redFromCode.lighten(1.2)
const halfTransparentRandomColor = randomColor.alpha(50)
const colorTextFromGreenBackground = greenFromRGB.text

const hoverPrimary = superPrimary.darken(1.2)

// If you want to get again the code (string like #aabbcc) from the supercolor, just use code
const cssGoldHexcode = supercolor('gold').code
const randomHexCode = Color.random().code
const againRedButHexCode = redFromCode.code

const primary = superPrimary.code
```

## Megacolors
The supercolors have the basic functions of the colors, but, if you want to create a supergradient (see
supergradients below) you'll need to make your supercolor a megacolor. These are the ways to make a
megacolor:

- Create the megacolor from the beggining
```js
import {megacolor, jebcMainColors} from 'jebcolors'

const megaMagic = megacolor(jebcMainColors.magic)
```
- Create the megacolor using the code of a supercolor
```js
import {megacolor, supercolor, jebcMainColors} from 'jebcolors'
const superMagic = supercolor(jebcMainColors.magic)
const megaMagic = megacolor(superMagic.code)
```
- Use `upgradecolor()` with a supercolor
```js
import {supercolor, upgradecolor, jebcMainColors} from 'jebcolors'

const superMagic = supercolor(jebcMainColors.magic)
const megaMagic = upgradecolor(superMagic)
```

Once you have a megacolor youu can access to the gradients with the properties `gradientWithXXX`.
```js
const magicAndComplementary = megaMagic.gradientWithComplementary
```

## Supergradients
In versions 3.0.0+ there are also supergradients, that are array of supercolors that represents a gradient
To make one, just use the `supergradient()` function (you can pass as an array of codes or an array of supercolors), use the `Gradient` class, or use a megacolor.

```js
import {Gradient, supergradient, supercolor, megacolor, uiMainGradients} from 'jebcolors'

const red = supercolor('#ff0000')
const magenta = supercolor('#ff00ff')

const superEdges = supergradient(red, magenta)
const superRainbow = supergradient('#ff0000','#ff8000','#ffff00','#00ff00','#00ffff','#0000ff','#ff00ff')
const superRandom = Gradient.random()
const superSeed = Gradient.seed('jebcolors')
const superRed = megacolor('red').gradientWithAnalogous
```

Now you can use the functions of the gradients

```js
const arrayColors = superEdges.codes // An array of strings
const negativeOfFirst = superEdges.colors[0].negative

const textColorForGradient = superEdges.averageColor.text
```

## Functions Equivalents in Supercolors
In 3.0.0+ the functions are removed and now are replaced by the Color class. Here are some functions and
their correct replacement in the new version:

- `normalize(value)`, `clean(value)`, `percentage(value)`, `deg(value)`: 
Install module `helpscript` and use their functions.
- `normalizeColorValue(value)`: (Normalize a number to the range [0,255]) Use helpscript `normalize(value,0,255)`.
- `normalizeHSLValue(value)`: (Normalize a number to the range [0,255]) Use helpscript `normalize(value,0,1)`.

The next methods normally return a `supercolor`, but once this supercolor is created you can access to its
properties like `code` or `hsl`, `rgb`.

- `rgb(red, green, blue)`: (Get hex code from rgb) Use `Color.rgb([red,green,blue]).code`.
- `hsl(hue, saturation, lightness)`: (Get hex code from hsl) Use `Color.hsl([hue, saturation, lightness]).code`
- `hslToRgb(hue, saturation, lightness)`: (Convert hsl to rgb) 
Use `Color.hsl([hue, saturation, lightness]).rgb`.
- `rgbToHsl(red, green, blue)`: (Convert rgb to hsl)
Use `Color.rgb([red, green, blue]).hsl`.

To make the contrast test, now you need 2 `supercolors`:

```js
const hex1 = "#000000"
const hex2 = "#ffffff"

// Before
constrastTest(hex1, hex2) // Returned
/*
 *  {
 *      minimumContrastWithNormalText,
 *      perfectContrastWithNormalText,
 *      minimumContrastWithBoldText,
 *      perfectContrastWithBoldText
 *  }
*/

// Now
Color.contrast(supercolor(hex1), supercolor(hex2)) // Returns
/*
 * {
 *      passes: {
 *          normal: {
 *              minimal,
 *              perfect
 *          },
 *          bold: {
 *              minimal,
 *              perfect
 *          }
 *      }
 * }
*/
```

For the next functions you'll need to make a `supercolor`.

```js
const newColor = supercolor('#aabbcc')
```

- `fixHexCode(code)`: (Get a 7 digits long hexcode or throw error) Use `newColor.code`.
- `getRedValue(code)`, `getGreenValue(code)` and `getBlueValue(code)`: (Get the red, green or blue value of the color)
Use `newColor.red`, `newColor.green` and `newColor.blue`.
- `getRGB(code)`: (Get an array [red, green, blue] of a color) Use `newColor.rgb` (there is also a property if you
want to get the hsl, use `newColor.hsl`).
- `light(code, factor)`: (Make a color ligther or darker) Use `newColor.lighten(factor).code`, 
`newColor.darken(factor).code` (this equals to `newColor.lighten(-factor).code`), 
or if you want predefined lighten and darken colors, use `newColor.disabled.code` (lighter) or `newColor.hover.code`
(darker).
- `getRelativeLuminance(code)`: (Get the color luminance) Use `newColor.luminance`.
- `isDarkColor(code)`: (true of false depending if the color is dark or not) Use `newColor.isDark` or 
`newColor.isLight` (this maybe will return something different from the last version, because in this new version this
functions uses YIQ color model to check this and stores the "YIQ CONSTANT" in `newColor.jeb`, intead of use the
luminance and contrast test used in the last version). Alternatively, if you used this function to check if to your
background is better use white or black to the color text, you can use `newColor.text`, see this example:

```js
const backgroundColor = '#ff69bf'
background.style.background = backgroundColor

// Before
background.style.color = isDarkColor(backgroundColor) ? 'white' : 'black'

// Now
background.style.color = supercolor(backgroundColor).text
```

The last function is averageColor, used to get the middle color of a gradient, now you'll use the
Gradient class. The `averageColor` is a `supercolor`, so you can get any property of this type, like:
`code`, `isDark`, `text`, etc.

```js
supergradient(uiMainGradients.jShine).averageColor
```