const server = require('server');
const express = require('express');
const cors = require('cors')
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
var crypto = require('crypto');

const {get,post} = server.router;
const app = express();


// Path where we store the download sessions
const DL_SESSION_FOLDER = '/var/download_sessions';

/* Creates a download session */
function createDownload(filePath, callback) {
  // Check the existence of DL_SESSION_FOLDER
  if (!fs.existsSync(DL_SESSION_FOLDER)) return callback(new Error('Session directory does not exist'));

  // Check the existence of the file
  if (!fs.existsSync(filePath)) return callback(new Error('File doest not exist'));

  // Generate the download sid (session id)
  var downloadSid = crypto.createHash('md5').update(Math.random().toString()).digest('hex');

  // Generate the download session filename
  var dlSessionFileName = path.join(DL_SESSION_FOLDER, downloadSid + '.download');

  // Write the link of the file to the download session file
  fs.writeFile(dlSessionFileName, filePath, function(err) {
    if (err) return callback(err);

    // If succeeded, return the new download sid
    callback(null, downloadSid);
  });
}

/* Gets the download file path related to a download sid */
function getDownloadFilePath(downloadSid, callback) {
  // Get the download session file name
  var dlSessionFileName = path.join(DL_SESSION_FOLDER, downloadSid + '.download');

  // Check if the download session exists
  if (!fs.existsSync(dlSessionFileName)) return callback(new Error('Download does not exist'));

  // Get the file path
  fs.readFile(dlSessionFileName, function(err, data) {
    if (err) return callback(err);

    // Return the file path
    callback(null, data);
  });
}

/* Deletes a download session */
function deleteDownload(downloadSid, callback) {
  // Get the download session file name
  var dlSessionFileName = path.join(DL_SESSION_FOLDER, downloadSid + '.download');

  // Check if the download session exists
  if (!fs.existsSync(dlSessionFileName)) return callback(new Error('Download does not exist'));

  // Delete the download session
  fs.unlink(dlSessionFileName, function(err) {
    if (err) return callback(err);

    // Return success (no error)
    callback();
  });
}

//Startup
app.get('/api/build', cors(), (req, res) => {
  getStylesArtboard(
    "29441-121e495c-c18b-48b8-8d82-1fb9b285032d",
    "jVyKdFBIcpDrgcf687DjH5"
  );
  var downloadSid = req.query.sid;

  // Get the download file path
  getDownloadFilePath(downloadSid, function(err, path) {
  if (err) return res.end('Error');

  // Read and send the file here...

  // Finally, delete the download session to invalidate the link
  deleteDownload(downloadSid, function(err) {
    // ...
  });
});
});


app.listen(3001, () => {
  console.log('Express server is running on localhost:3001');
  getStylesArtboard(
    "29441-121e495c-c18b-48b8-8d82-1fb9b285032d",
    "jVyKdFBIcpDrgcf687DjH5"
  );}
);

//Creating token
function createStyles(){
  const styleDictionary = require('style-dictionary').extend('config.js');
  styleDictionary.buildAllPlatforms();
}

//Cleaning tokenss
function cleanStyles(){
  const styleDictionary = require('style-dictionary').extend('config.js');
  styleDictionary.cleanAllPlatforms();
  delete styleDictionary;
}



//Color JSON
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

//Color Aliases JSON
function getColorAliases(stylesArtboard) {
  // empty "colors obj" wheree we will store all colors
  const colors = {};
  // get "colors" artboard
  const colorsAtrboard = stylesArtboard.filter(item => {
    return item.name === "ColorsAliases";
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

//Spacings JSON
function getSpacing(stylesArtboard) {
  // empty object
  const spacing = {
        spacing: {}
  };
  // get the artboard
  const spacingAtrboard = stylesArtboard.filter(item => {
    return item.name === "Spacing";
  })[0].children;

  spacingAtrboard.map(item => {
    if (item.name.startsWith("@")) {
      const spacerObj = {
        [item.name.substring(1)]: {
          value: `${item.absoluteBoundingBox.height}px`,
        }
      };

      Object.assign(spacing.spacing, spacerObj);
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
        }
      };

      Object.assign(durations, durationsObj);
    }
  });

  return durations;
}

function getRoundness(stylesArtboard) {
  // empty object
  const roundness = {
    roundness: {}
  };
  // get the artboard
  const roundnessAtrboard = stylesArtboard.filter(item => {
    return item.name === "Roundness";
  })[0].children;

  roundnessAtrboard.map(item => {
    if (item.name.startsWith("@")) {
      const roundnessObj = {
        [item.name.substring(1)]: {
          value: item.cornerRadius || 0,
        }
      };

      Object.assign(roundness.roundness, roundnessObj);
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
            value: `rgba(${item.effects[0].color.r*255}, ${item.effects[0].color.g*255}, ${item.effects[0].color.b*255}, ${item.effects[0].color.a})`,
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


//Basic typography scale JSON
function getScale(stylesArtboard) {
  // empty object
  const typography = {};
  // get the artboard
  var typographyAtrboard = stylesArtboard.filter(item => {
    return item.name === "Typography";
  })[0].children;
  typographyAtrboard.map((fontItem, i) => {
    if (fontItem.name.startsWith("@")) {
      let fontObj = {
        [fontItem.name.substring(1)]: {

          //setting font family
          "font-family": {
            value: `${fontItem.style.fontFamily}, ${
                        fontItem.style.fontPostScriptName
                    }`,
          },

          //setting font size
          "font-size": {
            value: fontItem.style.fontSize,
          },

          //setting font weight
          "font-weight": {
            value: fontItem.style.fontWeight,
          },

          //setting lineheight
          "font-lineheight": {
            value: fontItem.style.lineHeightPx,
          },

          //setting letterspacing
          "font-letterspacing": {
            value: fontItem.style.letterSpacing !== 0 ?
              `${fontItem.style.letterSpacing}` : 0,
          }
        }
      };

      Object.assign(typography, fontObj);

    }
  });

  return typography;
}


//Font styles JSON
function getFontStyles(stylesArtboard) {
  // empty object
  const typography = {};
  // get the artboard
  var typographyAtrboard = stylesArtboard.filter(item => {
    return item.name === "Styles Day";
  })[0].children;
  typographyAtrboard.map((fontItem, i) => {
    if (fontItem.name.startsWith("@")) {

      console.log(fontItem.fills[0]);
      let fontObj = {
        [fontItem.name.substring(1)]: {

          //setting font family
          "font-family": {
            value: `${fontItem.style.fontFamily}, ${
                        fontItem.style.fontPostScriptName
                    }`,
          },

          //setting font size
          "font-size": {
            value: fontItem.style.fontSize,
          },

          //setting font weight
          "font-weight": {
            value: fontItem.style.fontWeight,
          },

          //setting lineheight
          "font-lineheight": {
            value: fontItem.style.lineHeightPx,
          },

          //setting letterspacing
          "font-letterspacing": {
            value: fontItem.style.letterSpacing !== 0 ?
              `${fontItem.style.letterSpacing}` : 0,
          },
          //setting color
          "font-color": {
          value: `rgba(${fontItem.fills[0].color.r*255}, ${fontItem.fills[0].color.g*255}, ${fontItem.fills[0].color.b*255}, ${fontItem.fills[0].color.a})`,
          }
        }
      };

      Object.assign(typography, fontObj);


    }
  });

  //Getting night colors
  typographyAtrboard = stylesArtboard.filter(item => {
    return item.name === "Styles Night";
  })[0].children[0].children;
  console.log(typographyAtrboard);
  typographyAtrboard.map((fontItem, i) => {
    if (fontItem.name.startsWith("@")) {
      let fontObj = {
        "font-color-night": {
        value: `rgba(${fontItem.fills[0].color.r*255}, ${fontItem.fills[0].color.g*255}, ${fontItem.fills[0].color.b*255}, ${fontItem.fills[0].color.a})`,
        }
      };
      Object.assign(typography[fontItem.name.substring(1)], fontObj);
    }
  });
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

  const stylesArtboard = figmaTreeStructure.document.children.filter(item => {
    return item.name === "Tokens";
  })[0].children;

  //Json structure
  var baseTokensJSON = {
    CoreFonts: {},
    color: {},
    FontStyles: {},
    time: {},
    size: {},
  };

  Object.assign(baseTokensJSON.time, getDurations(stylesArtboard));
  Object.assign(baseTokensJSON.size, getRoundness(stylesArtboard));
  Object.assign(baseTokensJSON.size, getSpacing(stylesArtboard));
  Object.assign(baseTokensJSON.CoreFonts, getScale(stylesArtboard));
  Object.assign(baseTokensJSON.color, getColors(stylesArtboard));
  Object.assign(baseTokensJSON.color, getColorAliases(stylesArtboard));
  Object.assign(baseTokensJSON.FontStyles, getFontStyles(stylesArtboard));


  const directory = 'properties/';

  //Cleaning the properties directory
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlinkSync(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });
  await console.log("deleted");


  //Writing new properties JSON
  fs.writeFileSync("properties/"+Date.now()+".json", JSON.stringify(baseTokensJSON, null, 4), function(err) {
      if(err) {
          return console.log(err);
      }
      else{
          console.log("bbb")
      }
  });

  //Cleaning and creating new styles
  await cleanStyles();
  await console.log("cleared");
  await createStyles();
  await console.log("✅done"+Date.now());

}
