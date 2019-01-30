# tea-rest-with-mysql

MySQL & Sequlize as store, Base on tea-rest

## Node version
<pre> >= 8 </pre>

## tea-rest version
<pre> >= 8</pre>


## Installation
```bash
npm install tea-rest-plugin-mysql --save
```

## Usage
```js
const teaRest  = require('tea-rest');
const getter = require('tea-rest-helper-getter');
const assert = require('tea-rest-helper-assert');
const rest = require('tea-rest-helper-rest');
const params = require('tea-rest-helper-params');

teaRest
 .plugin(U.teaRestPluginMysql)
 .plugin(getter, assert, rest, params)
 .start(`${__dirname}/app`, (error) => {
   if (error) {
     console.error(error);
     process.exit();
   }
   console.info(`Service started at: ${new Date()}`);
 });

```

