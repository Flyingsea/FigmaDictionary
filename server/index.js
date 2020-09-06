const server = require('server');
const express = require('express');
const cors = require('cors')
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
var crypto = require('crypto');

const {get,post} = server.router;
const app = express();



//Startup
app.get('/api/build', cors(), (req, res) => {
  getStylesArtboard(
    "58002-b1a0d4fe-0bb9-45ee-94e5-1e040fed423f",
    "TiIeuJJHc08AJ30JVVCx8qR1"
  );
});


app.listen(3001, () => {
  console.log('Express server is running on localhost:3001');
  getStylesArtboard(
    "58002-b1a0d4fe-0bb9-45ee-94e5-1e040fed423f",
    "TiIeuJJHc08AJ30JVVCx8qR1"
  );}
);

//Creating tokens
function createStyles(){
  const styleDictionary = require('style-dictionary').extend('config.js');
  styleDictionary.buildAllPlatforms();
}

//Cleaning tokens
function cleanStyles(){
  const styleDictionary = require('style-dictionary').extend('config.js');
  styleDictionary.cleanAllPlatforms();
  delete styleDictionary;
}

const rgbToHex = (r, g, b) => [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('')

//Color JSON
function getColorsBase(artboards, globalStyles) {
  // empty "colors obj" wheree we will store all colors
  const colors = {};

  // get "colors" artboard
  const colorsArtboard = artboards.filter(item => {
    return item.name === "colorsBase";
  })[0].children;
  var itemOpacity = ""

  // get colors from each children
  colorsArtboard.map(item => {
    if (item.name.startsWith("@")) {

      function rbaObj(obj) {
        return Math.round(item.fills[0].color[obj]*255);
      }
      if (item.fills[0].opacity){
        var itemOpacity = (item.fills[0].opacity.toFixed(2)*100).toString(16)
      }
      else {
        var itemOpacity = ""
      }
      const colorObj = {
        [getStyleName(item.styles.fill, globalStyles).replace('/','')]: "#"+itemOpacity+rgbToHex(rbaObj('r'),rbaObj('g'),rbaObj('b'))
      };

      Object.assign(colors, colorObj);
    }
  });

  return colors;
}

//Color Aliases JSON
function getColorsAliases(artboards, globalStyles) {
  // empty "colors obj" wheree we will store all colors
  const colors = {};
  // get "colors" artboard
  const colorsArtboard = artboards.filter(item => {
    return item.name === "colorsAliases";
  })[0].children;


  // get colors from each children
    colorsArtboard.filter(item => {
      return item.name === "AliasComponent";}).map(item => {
    if (item.children[2].name.startsWith("@")) {
      if (item.children[2].opacity){
        var itemOpacity = item.children[2].opacity.toFixed(2)
      }
      else {
        var itemOpacity = ""
      }
      const colorObj = {
        [item.children[1].characters]: {
          "color": getStyleName(item.children[2].styles.fill, globalStyles).replace('/',''),
          "opacity": Number(itemOpacity) || 1
        }
      };

      Object.assign(colors, colorObj);
    }
  });

  return colors;
}


//Spacings JSON
function getSpacingBase(artboards, globalStyles) {
  // empty object
  const spacing = {};
  // get the artboard
  const spacingArtboard = artboards.filter(item => {
    return item.name === "spacingBase";
  })[0].children;

  spacingArtboard.filter(item => {
    return item.type === "COMPONENT";}).map(item => {
    if (item.children[0].name.startsWith("@")) {
      const spacerObj = {
        [item.children[0].name.substring(1)]: item.children[0].absoluteBoundingBox.height
      };

      Object.assign(spacing, spacerObj);
    }
  });

  return spacing;
}

function getSpacingAliases(artboards, globalStyles) {
  // empty object
  const spacing = {};

  // get the artboard
  const spacingArtboard = artboards.filter(item => {
    return item.name === "spacingAliases";
  })[0].children;

  spacingArtboard.filter(item => {
    return item.name === "SpacingAliasComponent";}).map(item => {
    if (item.children[2].children[0].name.startsWith("@")) {
      const spacerObj = {
        [item.children[1].characters]: item.children[2].name
      };

      Object.assign(spacing, spacerObj);
    }
  });

  return spacing;
}


//Durations JSON
function getDurations(artboards) {
  // empty object
  const durations = {};
  // get the artboard
  const durationsAtrboard = artboards.filter(item => {
    return item.name === "duration";
  })[0].children;

  durationsAtrboard.map(item => {
    if (item.name.startsWith("@")) {
      const durationsObj = {
        [item.name.substring(1)]: Number(item.characters),
      };

      Object.assign(durations, durationsObj);
    }
  });

  return durations;
}

//Roundness JSON
function getRoundness(artboards) {
  // empty object
  const roundness = {};
  // get the artboard
  const roundnessAtrboard = artboards.filter(item => {
    return item.name === "roundness";
  })[0].children;

  roundnessAtrboard.filter(item => {
      return item.name === "AliasComponent";}).map(item => {
    if (item.children[2].name.startsWith("@")) {
      const roundnessObj = {
        [item.children[1].characters]: item.children[2].cornerRadius || 0,

      };

      Object.assign(roundness, roundnessObj);
    }
  });
  return roundness;
}

//Shadows JSON
function getElevationBase(artboards, globalStyles) {
  // empty object
  const shadows = {};
  // get the artboard
  const elevationsArtboard = artboards.filter(item => {
    return item.name === "elevationBase";
  })[0].children;


  elevationsArtboard.map(item => {
    if (item.name.startsWith("@")) {

      function rbaObj(obj) {
        return Math.round(item.fills[0].color[obj]*255);
      }
      const shadowsObj = {
        [getStyleName(item.styles.effect, globalStyles).replace('/','')]: {
          //name: rgbToHex(rbaObj('r'),rbaObj('g'),rbaObj('b')),
          name: 'greyscale100', // HARDCODE!!!!
          alpha: Number(item.effects[0].color.a.toPrecision(2)),
          offsetX: item.effects[0].offset.x,
          offsetY: item.effects[0].offset.y,
          radius: item.effects[0].radius,
        }
      };

      Object.assign(shadows, shadowsObj);
    }
  });

  return shadows;
}

function getElevationAliasesiOS(artboards, globalStyles) {
  // empty "colors obj" wheree we will store all colors
  const shadows = {};
  // get "shadows" artboard
  var elevationsArtboard = artboards.filter(item => {
    return item.name === "elevationsAliasesiOS";
  })[0].children;
  // get shadows from each children
    elevationsArtboard.filter(item => {
      return item.name === "AliasComponent";}).map(item => {
    if (item.children[2].name.startsWith("@")) {

      const shadowObj = {
        [item.children[1].characters]: getStyleName(item.children[2].styles.effect, globalStyles).replace('/',''),
      };

      Object.assign(shadows, shadowObj);
    }
  });

  return shadows;
}

function getElevationAliasesAndroid(artboards, globalStyles) {
  // empty "colors obj" wheree we will store all colors
  const shadows = {};
  // get "shadows" artboard
  var elevationsArtboard = artboards.filter(item => {
    return item.name === "elevationsAliasesAndroid";
  })[0].children[0].children;
  // get shadows from each children
    elevationsArtboard.filter(item => {
      return item.name === "AliasComponent";}).map(item =>   {
    if (item.children[2].name.startsWith("@")) {

      const shadowObj = {
        [item.children[1].characters]: getStyleName(item.children[2].styles.effect, globalStyles).replace('/',''),
      };

      Object.assign(shadows, shadowObj);
    }
  });

  return shadows;
}


// function getGlobalStyles(stylesArtboard) {
//
// }
function getStyleName(styleCode, globalStyles) {
  if (globalStyles[styleCode].name.includes("white")) {
    return "white"
  }
  else {
    return globalStyles[styleCode].name
  }
}


//Basic typography scale JSON
function getTypographyBase(artboards, globalStyles) {
  // empty object
  const typography = {};
  // get the artboard
  var typographyArtboard = artboards.filter(item => {
    return item.name === "typographyBase";
  })[0].children;

  typographyArtboard.map((fontItem, i) => {
    if (fontItem.name.startsWith("@")) {

      let fontObj = {
        [getStyleName(fontItem.styles.text, globalStyles).split('/').pop().split(' ')[0]]: {

          //setting font family
          "family": `${fontItem.style.fontFamily}, ${fontItem.style.fontPostScriptName}`,

          //setting font size
          "size": fontItem.style.fontSize,

          //setting font weight
          "weight": fontItem.style.fontWeight,

          //setting lineheight
          "lineheight": fontItem.style.lineHeightPx,

          //setting letterspacing
          "letterspacing": fontItem.style.letterSpacing !== 0 ? `${fontItem.style.letterSpacing}` : 0,
        }
      };

      Object.assign(typography, fontObj);

    }
  });

  return typography;
}

//Font styles JSON
function getTypographyStyles(artboards, globalStyles) {
  // empty object
  const typography = {};
  // get the artboard
  var typographyArtboard = artboards.filter(item => {
    return item.name === "typographyStylesDay";
  })[0].children;
  typographyArtboard.map((fontItem, i) => {
    if (fontItem.name.startsWith("@")) {

      let fontObj = {
        [fontItem.name.substring(1)]: {
          base: getStyleName(fontItem.styles.text, globalStyles).split('/').pop().split(' ')[0],
          color: getStyleName(fontItem.styles.fill, globalStyles).replace('/',''),
        }
      };

      Object.assign(typography, fontObj);


    }
  });

  // //Getting night colors
  // typographyArtboard = artboards.filter(item => {
  //   return item.name === "typographyStylesNight";
  // })[0].children[0].children;
  // typographyArtboard.map((fontItem, i) => {
  //   if (fontItem.name.startsWith("@")) {
  //     let fontObj = {
  //       "colorNight":  getStyleName(fontItem.styles.fill, globalStyles).replace('/',''),
  //     };
  //     Object.assign(typography[fontItem.name.substring(1)], fontObj);
  //   }
  // });
  return typography;
}

// main function
async function getStylesArtboard(figmaApiKey, figmaId) {
  const result = await fetch("https://api.figma.com/v1/files/" + figmaId, {
    method: "GET",
    headers: {
      "X-Figma-Token": figmaApiKey
    }
  });
  const figmaTreeStructure = await result.json();

  const artboards = figmaTreeStructure.document.children.filter(item => {
    return item.name === "Tokens";
  })[0].children;

  const globalStyles = figmaTreeStructure.styles;

  //Json structure
  var baseTokensJSON = {
    roundness: {},
    durations: {},
    elevationBase: {},
    elevationAliasesiOS: {},
    elevationAliasesAndroid: {},
    colorsBase: {},
    colorsAliases: {},
    typographyBase: {},
    typographyStyles: {},
    spacingBase: {},
    spacingAliases: {},

  };

  Object.assign(baseTokensJSON.durations, getDurations(artboards));
  Object.assign(baseTokensJSON.roundness, getRoundness(artboards));
  Object.assign(baseTokensJSON.elevationBase, getElevationBase(artboards, globalStyles));
  Object.assign(baseTokensJSON.elevationAliasesiOS, getElevationAliasesiOS(artboards, globalStyles));
  Object.assign(baseTokensJSON.elevationAliasesAndroid, getElevationAliasesAndroid(artboards, globalStyles));
  Object.assign(baseTokensJSON.spacingBase, getSpacingBase(artboards, globalStyles));
  Object.assign(baseTokensJSON.spacingAliases, getSpacingAliases(artboards, globalStyles));
  Object.assign(baseTokensJSON.colorsAliases, getColorsAliases(artboards, globalStyles));
  Object.assign(baseTokensJSON.colorsBase, getColorsBase(artboards, globalStyles));
  Object.assign(baseTokensJSON.typographyBase, getTypographyBase(artboards, globalStyles));
  Object.assign(baseTokensJSON.typographyStyles, getTypographyStyles(artboards, globalStyles));


  const directory = 'properties/';




  //Writing new properties JSON
  fs.writeFileSync("properties/DesignTokens.json", JSON.stringify(baseTokensJSON, null, 4), function(err) {
      if(err) {
          return console.log(err);
      }
      else{
          console.log("bbb")
      }
  });

  console.log("✅done")


}
