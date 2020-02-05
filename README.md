# MusthacheBeardAR
![Background image](http://pngimg.com/uploads/moustache/moustache_PNG18.png)
## Purpose

This project has two important functions:
1. determine the future location of the mustache
2. mustache / beard render

you can select predefined photo, or load from device

## Limitations


## Prerequisites

### Node.js and Tools

Download link:
[NodeJS](https://nodejs.org/en/download/).

Version not below than v.6.12.1 is required.

After NodeJS installation please check that everything is installed correctly (for example, PATH ), using command:
```
node --version
```
Stdout should be
v6.12.1 (or higher).

### Install all node packages

```
npm install
```

After this command you will see **node_modules** folder

## Command interface

### Run application on the local host

```
npm run start
```

After this command you can open Chrome browser and enter url *localhost:3000*

### Check project source syntax

```
npm run lint
```

You should see no warnings and no errors, if project

### Run project unit-tests

```
npm run test
```

You should see no errors, if all tests are passed

### Build project doc
```
npm run doc
```
You can try index.html in 'esdoc' folder

### Build project bundle to upload app on server
```
npm run build
```
You will see 'build' folder and can try 'index.html' to start live demo
