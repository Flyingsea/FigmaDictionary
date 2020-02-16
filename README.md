#  Careem Figma Tokens

An automated design token generation from Figma.

Figma token library
https://www.figma.com/file/jVyKdFBIcpDrgcf687DjH5/Design-Tokens-API?node-id=1%3A31


## Getting Started

Some context on the Amazon Style Dictionary tool:

Style dictionary tutorials
https://amzn.github.io/style-dictionary/#/

Style dictionary examples
https://github.com/amzn/style-dictionary/tree/master/examples

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Project structure

```
├── client/ //web client to initate token generation
├── server/ //node server that handles generation
│   ├── index.js //tokens JSON and server response handling
│   ├── config.js // Style Dictionary config
│   ├── ...
├── tokens/ //server output files
│   ├── android/
│   ├── ios-swift/
│   ├── scss/

```

### Installing

To run the server:

```
cd server
node .  
```
You will need to restart the server each time you change the code

To run the client
```
cd client
npm install
npm run
```
