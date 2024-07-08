[![npm version](https://badge.fury.io/js/react-native-iphone-screen-helper.svg)](https://badge.fury.io/js/react-native-iphone-screen-helper)

# react-native-iphone-screen-helper
A library to help you design your react-native app for notched iPhones.


I forked this project to continue working on it.
This project is a fork of https://www.npmjs.com/package/react-native-iphone-x-helper .
The original repository is not maintained anymore.

The project will be continued in this repository. react-native-iphone-screen-helper is fully compatible.
If you want to support the project feel free to contact me or create a pull request with your feature.

기존 개발자가 업데이트를 해주지않아 PR을 fork 해서 업데이트를 진행하였고, npm 에도 배포하였습니다.

## Installing ##
`yarn add react-native-iphone-screen-helper`

or

`npm i react-native-iphone-screen-helper --save`

## API ##

### ifIphoneX(iphoneXStyle, \[regularStyle\]) ###
this method it for creating stylesheets with the iPhone X in mind

#### Parameters ####
**iphoneXStyle** - the style to apply if you're on iPhone X

**regularStyle (*optional*)** - the style to apply if you're not on iPhone X

#### Example ####
```js
// in style.js

import { StyleSheet } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-screen-helper'

export default StyleSheet.create({
    header:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding:10,
        height: 60,
        backgroundColor: 'transparent',
        ...ifIphoneX({
            paddingTop: 50
        }, {
            paddingTop: 20
        })
    },
});
```

### isIphoneX() ###

**returns** - `true` if you running on an iPhone X.

#### Example ####
```js
import { isIphoneX } from 'react-native-iphone-screen-helper'

// ...

if (isIphoneX()) {
    // do this...
} else {
    // do that...
}
```

### getStatusBarHeight([safe]) ###

#### Parameters ####
**safe** - whether you want for get safe area height or not

**returns** - the height of the status bar:
`59` for safe iPhone 14 Pro, 14 Pro Max
`50` for safe iPhone 12 Mini and 13 Mini
`47` for safe iPhone 12, 13, 14 and 12 Pro, 13 Pro and 12 Pro Max, 13 Pro Max and 14 Plus
`44` for safe iPhone X
`20` for other devices
`StatusBar.currentHeight` for Android.

#### Example ####

```js
// in style.js

import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-screen-helper'

export default StyleSheet.create({
    header:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding:10,
        height: 60,
        backgroundColor: 'transparent',
        paddingTop: getStatusBarHeight()
    },
});
```

***NOTE:*** If your using the the unsafe statusbar height, make sure to add 14dp of padding to your content, otherwise it's going to be flush against the notch

### getBottomSpace ###

**returns** - the height of the bottom to fit the safe area: `34` for iPhone X and `0` for other devices.

#### Example ####

```js
// in style.js

import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-screen-helper'

export default StyleSheet.create({
    totalview: {
        flex: 1,
        backgroundColor: 'transparent',
        marginBottom: getBottomSpace()
    },
});
```

## Licence ##
**MIT**
