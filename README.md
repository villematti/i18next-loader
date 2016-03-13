# i18next loader for webpack
this is a webpack loader that can translate your code and generate bundle per each language
### installation:
```bash
npm install --save-dev i18next-loader
```
### usage:
1. install `i18next1`:
    ```bash
    npm install --save-dev i18next
    ```
2. call `i18next.init({})` in the begining of your `webpack.config.js`:
    ```js
    var i18next = require('i18next');

    i18next.init({
      lng: 'pl',
      fallbackLng: false,
      keySeparator: false,
      nsSeparator: false,
      saveMissing: true,
      resources: {
        'Hello World!': 'Siema Świecie!'
      }
    });
    ```
3. Use loader in your application:
* using `require`:
    ```js
    var exportsOfFile = require("i18next!./file.js");
    ```
* using webpack config:
    ```js
    {
        test: /\.(js|jsx)$/,
        loader: 'i18next-loader!react-hot!babel-loader'
    }
    ```
### query params:
- `funcName`: change default function name (default is `__()`)
- `quotes`: choose how to generates translated strings in code (default is `''`)
