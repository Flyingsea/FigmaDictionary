const server = require('server');
const express = require('express');
const cors = require('cors')
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const {
  get,
  post
} = server.router;

// Handle requests to the url "/" ( http://localhost:3000/ )


const app = express();
app.get('/api/build', cors(), (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    greeting: `Hello ${name}!`
  }));
  getStylesArtboard(
    "29441-121e495c-c18b-48b8-8d82-1fb9b285032d",
    "klLtlH02wB1UDeAEyNeUJ9"
  );

  console.log("GET done!");

});


app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);



////////////////////////////////////////////////

function getColors(stylesArtboard) {
  // empty "colors obj" wheree we will store all colors
  const colors = {};
  // get "colors" artboard
  const colorsAtrboard = stylesArtboard.filter(item => {
    return item.name === "Colors";
  })[0].children;

  // get colors from each children
  colorsAtrboard.map(item => {
    if (item.name.startsWith("@")) {

      function rbaObj(obj) {
        return item.fills[0].color[obj] * 255;
      }

      const colorObj = {
        [item.name.substring(1)]: {
          value: `rgba(${rbaObj("r")}, ${rbaObj("g")}, ${rbaObj("b")}, ${
                      item.fills[0].color.a
                  })`,
          type: "color"
        }
      };

      Object.assign(colors, colorObj);
    }
  });

  return colors;
}

function getSpacing(stylesArtboard) {
  // empty object
  const spacing = {};
  // get the artboard
  const spacingAtrboard = stylesArtboard.filter(item => {
    return item.name === "Spacing";
  })[0].children;

  spacingAtrboard.map(item => {
    if (item.name.startsWith("@")) {
      const spacerObj = {
        [item.name.substring(1)]: {
          value: `${item.absoluteBoundingBox.height}px`,
          type: "spacing"
        }
      };

      Object.assign(spacing, spacerObj);
    }
  });

  return spacing;
}

function getDurations(stylesArtboard) {
  // empty object
  const durations = {};
  // get the artboard
  const durationsAtrboard = stylesArtboard.filter(item => {
    return item.name === "Durations";
  })[0].children;

  durationsAtrboard.map(item => {
    if (item.name.startsWith("@")) {
      const durationsObj = {
        [item.name.substring(1)]: {
          value: item.characters,

          type: "time"
        }
      };

      Object.assign(durations, durationsObj);
    }
  });

  return durations;
}

function getRoundness(stylesArtboard) {
  // empty object
  const roundness = {};
  // get the artboard
  const roundnessAtrboard = stylesArtboard.filter(item => {
    return item.name === "Roundness";
  })[0].children;

  roundnessAtrboard.map(item => {
    if (item.name.startsWith("@")) {
      const roundnessObj = {
        [item.name.substring(1)]: {
          value: item.cornerRadius || 0,

          type: "roundness"
        }
      };

      Object.assign(roundness, roundnessObj);
    }
  });

  return roundness;
}

function getShadows(stylesArtboard) {
  // empty object
  const shadows = {};
  // get the artboard
  const shadowsAtrboard = stylesArtboard.filter(item => {
    return item.name === "Shadows";
  })[0].children;

  shadowsAtrboard.map(item => {
    if (item.name.startsWith("@")) {
      const shadowsObj = {
        [item.name.substring(1)]: {
         color: {
            value: `rgba(${item.effects[0].color.r*255}, ${item.effects[0].color.g*255}, ${item.effects[0].color.b*255}, ${
                        item.effects[0].color.a
                    })`,
            type: "shadow"
          },
          offset: {
            x: item.effects[0].offset.x,
            y: item.effects[0].offset.y,
            type: "shadow"
          },
          radius: {
            value: item.effects[0].radius,
            type: "shadow"
          },
          blendMode: {
            value: item.effects[0].blendMode,
            type: "shadow"
          }
        }
      };

      Object.assign(shadows, shadowsObj);
    }
  });

  return shadows;
}

function getTypography(stylesArtboard) {
  // empty object
  const typography = {};
  // get the artboard
  const typographyAtrboard = stylesArtboard.filter(item => {
    return item.name === "Typography";
  })[0].children;
  typographyAtrboard.map((fontItem, i) => {
    if (fontItem.name.startsWith("@")) {
      let fontObj = {
        [fontItem.name.substring(1)]: {
          family: {
            value: `${fontItem.style.fontFamily}, ${
                        fontItem.style.fontPostScriptName
                    }`,
            type: "typography"
          },
          size: {
            value: fontItem.style.fontSize,
            type: "typography"
          },
          weight: {
            value: fontItem.style.fontWeight,
            type: "typography"
          },
          lineheight: {
            value: fontItem.style.lineHeightPx,
            type: "typography"
          },
          spacing: {
            value: fontItem.style.letterSpacing !== 0 ?
              `${fontItem.style.letterSpacing}px` : "normal",
            type: "typography"
          }
        }
      };

      Object.assign(typography, fontObj);

    }
  });

  return typography;
}

function createStyles(){

  var styleDictionary = require('style-dictionary').extend({
    source: ["properties/*.json"],
      platforms: {
        scss: {
          transformGroup: "scss",
          buildPath: "build/scss/",
          files: [{
            destination: "_variables.scss",
            format: "scss/variables"
          },{
            destination: "../../../client/src/_variables.scss",
            format: "scss/variables"
          },]
        },
        android: {
          transformGroup: "android",
          buildPath: "build/android/",
          files: [{
            destination: "font_dimens.xml",
            format: "android/fontDimens"
          }, {
            destination: "colors.xml",
            format: "android/colors"
          }]
        },
        ios: {
          transformGroup: "ios",
          buildPath: "build/ios/",
          files: [{
            destination: "StyleDictionaryColor.h",
            format: "ios/colors.h",
            className: "StyleDictionaryColor",
            type: "StyleDictionaryColorName",
            filter: {
              attributes: {
                category: "color"
              }
            }
          }, {
            destination: "StyleDictionaryColor.m",
            format: "ios/colors.m",
            className: "StyleDictionaryColor",
            type: "StyleDictionaryColorName",
            filter: {
              attributes: {
                category: "color"
              }
            }
          }, {
            destination: "StyleDictionarySize.h",
            format: "ios/static.h",
            className: "StyleDictionarySize",
            type: "float",
            filter: {
              "attributes": {
                "category": "size"
              }
            }
          }, {
            destination: "StyleDictionarySize.m",
            format: "ios/static.m",
            className: "StyleDictionarySize",
            type: "float",
            filter: {
              attributes: {
                category: "size"
              }
            }
          }]
        },
        'ios-swift': {
          transformGroup: "ios-swift",
          buildPath: "build/ios-swift/",
          files: [{
            destination: "StyleDictionary.swift",
            format: "ios-swift/class.swift",
            className: "StyleDictionary",
            filter: {}
          }]
        },
        'ios-swift-separate-enums': {
          transformGroup: "ios-swift-separate",
          buildPath: "build/ios-swift/",
          files: [{
            destination: "StyleDictionaryColor.swift",
            format: "ios-swift/enum.swift",
            className: "StyleDictionaryColor",
            filter: {
              attributes: {
                category: "color"
              }
            }
          }, {
            destination: "StyleDictionarySize.swift",
            format: "ios-swift/enum.swift",
            className: "StyleDictionarySize",
            type: "float",
            filter: {
              attributes: {
                category: "size"
              }
            }
          }]
        }
      }


  });

  styleDictionary.buildAllPlatforms();
}

function cleanStyles(){


  var styleDictionary = require('style-dictionary').extend({
    source: ["properties/*.json"],
      platforms: {
        scss: {
          transformGroup: "scss",
          buildPath: "build/scss/",
          files: [{
            destination: "_variables.scss",
            format: "scss/variables"
          },{
            destination: "../../../client/src/_variables.scss",
            format: "scss/variables"
          },]
        },
        android: {
          transformGroup: "android",
          buildPath: "build/android/",
          files: [{
            destination: "font_dimens.xml",
            format: "android/fontDimens"
          }, {
            destination: "colors.xml",
            format: "android/colors"
          }]
        },
        ios: {
          transformGroup: "ios",
          buildPath: "build/ios/",
          files: [{
            destination: "StyleDictionaryColor.h",
            format: "ios/colors.h",
            className: "StyleDictionaryColor",
            type: "StyleDictionaryColorName",
            filter: {
              attributes: {
                category: "color"
              }
            }
          }, {
            destination: "StyleDictionaryColor.m",
            format: "ios/colors.m",
            className: "StyleDictionaryColor",
            type: "StyleDictionaryColorName",
            filter: {
              attributes: {
                category: "color"
              }
            }
          }, {
            destination: "StyleDictionarySize.h",
            format: "ios/static.h",
            className: "StyleDictionarySize",
            type: "float",
            filter: {
              "attributes": {
                "category": "size"
              }
            }
          }, {
            destination: "StyleDictionarySize.m",
            format: "ios/static.m",
            className: "StyleDictionarySize",
            type: "float",
            filter: {
              attributes: {
                category: "size"
              }
            }
          }]
        },
        'ios-swift': {
          transformGroup: "ios-swift",
          buildPath: "build/ios-swift/",
          files: [{
            destination: "StyleDictionary.swift",
            format: "ios-swift/class.swift",
            className: "StyleDictionary",
            filter: {}
          }]
        },
        'ios-swift-separate-enums': {
          transformGroup: "ios-swift-separate",
          buildPath: "build/ios-swift/",
          files: [{
            destination: "StyleDictionaryColor.swift",
            format: "ios-swift/enum.swift",
            className: "StyleDictionaryColor",
            filter: {
              attributes: {
                category: "color"
              }
            }
          }, {
            destination: "StyleDictionarySize.swift",
            format: "ios-swift/enum.swift",
            className: "StyleDictionarySize",
            type: "float",
            filter: {
              attributes: {
                category: "size"
              }
            }
          }]
        }
      }


  });

  styleDictionary.cleanAllPlatforms();
  delete styleDictionary;
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

  const stylesArtboard = figmaTreeStructure.document.children.filter(item => {
    return item.name === "Tokens";
  })[0].children;

  var baseTokensJSON = {
    font: {},
    dimens: {},
    color: {},
    roundness: {},
    time: {},
    shadow: {}

  };

  Object.assign(baseTokensJSON.time, getDurations(stylesArtboard));
  Object.assign(baseTokensJSON.roundness, getRoundness(stylesArtboard));
  Object.assign(baseTokensJSON.shadow, getShadows(stylesArtboard));
  Object.assign(baseTokensJSON.dimens, getSpacing(stylesArtboard));
  Object.assign(baseTokensJSON.color, getColors(stylesArtboard));
  Object.assign(baseTokensJSON.font, getTypography(stylesArtboard));

  const directory = 'properties/';

  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlinkSync(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });

  await console.log("deleted");
  fs.writeFileSync("properties/"+Date.now()+".json", JSON.stringify(baseTokensJSON, null, 4), function(err) {
      if(err) {
          return console.log(err);
      }
      else{
          console.log("bbb")
      }
  });
  await cleanStyles();

  await console.log("cleared");
  await createStyles();

  await console.log("getStylesArtboard fn done");


}
