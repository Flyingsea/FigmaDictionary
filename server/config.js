const StyleDictionary = require('style-dictionary');
var Color = require('tinycolor2');
const fs = require('fs');
const _ = require('lodash');
const Handlebars = require('handlebars');

const CustomcolorsSwift = Handlebars.compile(fs.readFileSync(__dirname + '/customcolors-swift.hbs', 'utf8'));



const propertiesToCTI = {
  'width':                {category: 'size',      type: 'dimension'},
  'min-width':            {category: 'size',      type: 'dimension'},
  'max-width':            {category: 'size',      type: 'dimension'},
  'height':               {category: 'size',      type: 'dimension'},
  'min-height':           {category: 'size',      type: 'dimension'},
  'max-height':           {category: 'size',      type: 'dimension'},
  'border-width':         {category: 'size',      type: 'border',           item: 'width'},
  'border-radius':        {category: 'size',      type: 'border',           item: 'width' },
  'border-color':         {category: 'color',     type: 'border'},
  'background-color':     {category: 'color',     type: 'background'},
  'color':                {category: 'color',     type: 'font'},
  'text-color':           {category: 'color',     type: 'font' },
  'padding':              {category: 'size',      type: 'padding'},
  'padding-vertical':     {category: 'size',      type: 'padding'},
  'padding-horziontal':   {category: 'size',      type: 'padding'},
  'icon':                 {category: 'content',   type: 'icon'},
  'font-size':            {category: 'size',      type: 'font',             item: 'font-size'},
  'font-lineheight':      {category: 'size',      type: 'font',             item: 'lineheight'},
  'font-letterspacing':   {category: 'size',      type: 'font',             item: 'letterspacing'},
  'font-weight':          {category: 'size',      type: 'font'},
  'font-family':          {category: 'content',   type: 'font'},
  'font-color':           {category: 'color',     type: 'font'},
  'font-color-night':     {category: 'color',     type: 'font'},
  'spacing':            {category: 'dimension',      type: 'dimension'},
  'roundness':            {category: 'size',      type: 'dimension'},
  'time':                 {category: 'time',      type: 'time'},
  'size':                 {category: 'size',      type: 'icon'}
}

//Custom transform for CGFLoat
const CGFloat = {
  type: 'value',
  matcher: function(prop) {
    return (prop.attributes.category === 'size') || (prop.attributes.category === 'time');
  },
  transformer: function(prop) {
    return `CGFloat(${(parseFloat(prop.value, 10))})`;
  }
}

//Custom transform for FontSP
const FontSP = {
  type: 'value',
  matcher: function(prop) {
    return (prop.attributes.item === 'letterspacing') || (prop.attributes.item === 'lineheight') || (prop.attributes.item === 'font-size');
  },
  transformer: function(prop) {
    return `${prop.value}sp`;
  }
}

//Custom transform for UIColor with comments
const CustomUIColorSwift = {
  type: 'value',
  matcher: function(prop) {
    return (prop.attributes.category === 'color');
  },
  transformer: function(prop) {

    const {r,g,b,a} = Color(prop.value).toRgb();
    prop.comment = `R:${r}, G:${g}, B:${b}, Alpha:${a}`;
    const rFixed = (r / 255.0).toFixed(3);
    const gFixed = (g / 255.0).toFixed(3);
    const bFixed = (b / 255.0).toFixed(3);
    return `UIColor(red: ${rFixed}, green: ${gFixed}, blue: ${bFixed}, alpha:${a})`;
  }
}

const CTITransform = {
  transformer: (prop) => {
    // Only do this custom functionality in the 'component' top-level namespace.
    if (prop.path[0] === 'component' || prop.path[0] === 'CoreFonts' || prop.path[0] === 'FontStyles' || prop.path[0] === 'sizes') {
      // When defining component tokens, the key of the token is the relevant CSS property
      // The key of the token is the last element in the path array
      return propertiesToCTI[prop.path[prop.path.length - 1]];
    } else {
      // Fallback to the original 'attribute/cti' transformer
      return StyleDictionary.transform['attribute/cti'].transformer(prop);
    }
  }
}

module.exports = {
  // Rather than calling .registerTransform() we can apply the new transform
  // directly in our configuration. Using .registerTransform() with the same
  // transform name, 'attribute/cti', would work as well.

  format: {
    'custom/format/SwiftColors': (dictionary, platform) => {
      //  console.log(dictionary.allProperties);
      return CustomcolorsSwift({
        // this is to show that the formatter function only takes a "dictionary" and "platform" parameters
        // (and dictionary has a "properties" and "allProperties" attributes)
        // and returns a string. for more details about the "formatter" function refer to the documentation
        allProperties: dictionary.allProperties,
        properties: dictionary.properties,
        options: platform
      });
    }
  },
  filter: {
    'Dimentions': function(prop) {
      return (prop.attributes.category === 'size') &&	!(prop.attributes.type === 'font');
    }
  },
  transform: {
    // Override the attribute/cti transform
    'attribute/cti': CTITransform,
    'size/swift/CGFloat': CGFloat,
    'CustomUIColorSwift': CustomUIColorSwift,
    'size/FontSP': FontSP

  },
  source: ['properties/*.json'],
  platforms: {
    scss: {
      transforms: ["attribute/cti", "name/cti/kebab", "time/seconds", "content/icon", "color/css"],
      buildPath: "../tokens/scss/",
      files: [{
        destination: "_variables.scss",
        format: "scss/variables"
      }, {
        destination: "../../../client/src/_variables.scss",
        format: "scss/variables"
      }, ]
    },
    android: {
      transforms: ["attribute/cti", "name/cti/snake", "color/hex8android", "size/FontSP"],
      buildPath: "../tokens/android/",
      files: [{
        destination: "dimens.xml",
        format: "android/dimens",
        filter: "Dimentions"
      }, {
        destination: "time.xml",
        format: "android/integers"
      }, {
        destination: "colors.xml",
        format: "android/colors"
      }, {
        destination: "fontDimens.xml",
        format: "android/fontDimens"
      },{
        destination: "strings.xml",
        format: "android/strings",
        filter: {
          attributes: {
            category: "content"
          }
        }
      }]
    },
    'ios-swift-separate-enums': {
      transforms: ["attribute/cti", "name/cti/camel", "CustomUIColorSwift", "content/swift/literal", "asset/swift/literal", "size/swift/CGFloat", "font/swift/literal"],
      buildPath: "../tokens/ios-swift/",
      files: [{
        transforms: ["CustomUIColorSwift"],
        destination: "CareemColors.swift",
        format: "custom/format/SwiftColors",
        className: "CareemColors",
        filter: {
          attributes: {
            category: "color"
          }
        }
      }, {
        destination: "CareemFonts.swift",
        format: "ios-swift/enum.swift",
        className: "CareemFonts",
        type: "float",
        filter: {
          attributes: {
            category: "size",
            type: "font"
          }
        }
      }, {
        destination: "CareemTime.swift",
        format: "ios-swift/enum.swift",
        className: "CareemTime",
        type: "float",
        filter: {
          attributes: {
            category: "time"
          }
        }
      }, {
        destination: "CareemStrings.swift",
        format: "ios-swift/enum.swift",
        className: "CareemStrings",
        filter: {
          attributes: {
            category: "content"
          }
        }

      }, {
        destination: "CareemDimens.swift",
        format: "ios-swift/enum.swift",
        className: "CareemDimens",
        filter: "Dimentions"
      }]
    }
  }
}
