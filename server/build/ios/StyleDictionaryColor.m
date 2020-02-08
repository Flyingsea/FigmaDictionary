
//
// StyleDictionaryColor.m
//
// Do not edit directly
// Generated on Tue, 04 Feb 2020 14:09:14 GMT
//

#import "StyleDictionaryColor.h"


@implementation StyleDictionaryColor

+ (UIColor *)color:(StyleDictionaryColorName)colorEnum{
  return [[self values] objectAtIndex:colorEnum];
}

+ (NSArray *)values {
  static NSArray* colorArray;
  static dispatch_once_t onceToken;

  dispatch_once(&onceToken, ^{
    colorArray = @[
[UIColor colorWithRed:0.906f green:0.965f blue:0.918f alpha:1.000f],
[UIColor colorWithRed:0.765f green:0.914f blue:0.792f alpha:1.000f],
[UIColor colorWithRed:0.608f green:0.855f blue:0.655f alpha:1.000f],
[UIColor colorWithRed:0.451f green:0.796f blue:0.514f alpha:1.000f],
[UIColor colorWithRed:0.216f green:0.706f blue:0.306f alpha:1.000f],
[UIColor colorWithRed:0.137f green:0.612f blue:0.208f alpha:1.000f],
[UIColor colorWithRed:0.078f green:0.502f blue:0.133f alpha:1.000f],
[UIColor colorWithRed:1.000f green:1.000f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.969f blue:0.910f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.925f blue:0.773f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.875f blue:0.624f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.824f blue:0.475f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.749f blue:0.247f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.663f blue:0.161f alpha:1.000f],
[UIColor colorWithRed:0.898f green:0.545f blue:0.094f alpha:1.000f],
[UIColor colorWithRed:0.976f green:0.980f blue:0.984f alpha:1.000f],
[UIColor colorWithRed:0.949f green:0.961f blue:0.973f alpha:1.000f],
[UIColor colorWithRed:0.890f green:0.910f blue:0.925f alpha:1.000f],
[UIColor colorWithRed:0.765f green:0.800f blue:0.824f alpha:1.000f],
[UIColor colorWithRed:0.525f green:0.592f blue:0.643f alpha:1.000f],
[UIColor colorWithRed:0.376f green:0.424f blue:0.455f alpha:1.000f],
[UIColor colorWithRed:0.322f green:0.000f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.953f green:0.894f blue:0.953f alpha:1.000f],
[UIColor colorWithRed:0.878f green:0.733f blue:0.878f alpha:1.000f],
[UIColor colorWithRed:0.800f green:0.557f blue:0.796f alpha:1.000f],
[UIColor colorWithRed:0.718f green:0.380f blue:0.714f alpha:1.000f],
[UIColor colorWithRed:0.596f green:0.114f blue:0.592f alpha:1.000f],
[UIColor colorWithRed:0.482f green:0.067f blue:0.478f alpha:1.000f],
[UIColor colorWithRed:0.400f green:0.039f blue:0.396f alpha:1.000f],
[UIColor colorWithRed:0.878f green:0.973f blue:0.965f alpha:1.000f],
[UIColor colorWithRed:0.702f green:0.933f blue:0.910f alpha:1.000f],
[UIColor colorWithRed:0.502f green:0.890f blue:0.847f alpha:1.000f],
[UIColor colorWithRed:0.302f green:0.847f blue:0.784f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.780f blue:0.694f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.702f blue:0.596f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.490f blue:0.400f alpha:1.000f],
[UIColor colorWithRed:0.941f green:0.922f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.855f green:0.804f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.761f green:0.675f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.663f green:0.545f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.518f green:0.349f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.404f green:0.243f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.298f green:0.161f blue:0.898f alpha:1.000f],
[UIColor colorWithRed:0.878f green:0.961f blue:0.984f alpha:1.000f],
[UIColor colorWithRed:0.702f green:0.898f blue:0.965f alpha:1.000f],
[UIColor colorWithRed:0.502f green:0.831f blue:0.941f alpha:1.000f],
[UIColor colorWithRed:0.302f green:0.765f blue:0.914f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.663f blue:0.878f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.561f blue:0.827f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.435f blue:0.698f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.922f blue:0.925f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.804f blue:0.808f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.675f blue:0.682f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.541f blue:0.557f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.345f blue:0.365f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.239f blue:0.255f alpha:1.000f],
[UIColor colorWithRed:0.812f green:0.141f blue:0.153f alpha:1.000f],
[UIColor colorWithRed:0.996f green:0.957f blue:0.902f alpha:1.000f],
[UIColor colorWithRed:0.992f green:0.890f blue:0.757f alpha:1.000f],
[UIColor colorWithRed:0.988f green:0.816f blue:0.596f alpha:1.000f],
[UIColor colorWithRed:0.980f green:0.741f blue:0.435f alpha:1.000f],
[UIColor colorWithRed:0.973f green:0.627f blue:0.192f alpha:1.000f],
[UIColor colorWithRed:0.961f green:0.518f blue:0.122f alpha:1.000f],
[UIColor colorWithRed:0.890f green:0.412f blue:0.055f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.910f blue:0.925f alpha:1.000f],
[UIColor colorWithRed:0.965f green:0.706f blue:0.749f alpha:1.000f],
[UIColor colorWithRed:0.945f green:0.510f blue:0.584f alpha:1.000f],
[UIColor colorWithRed:0.922f green:0.310f blue:0.420f alpha:1.000f],
[UIColor colorWithRed:0.886f green:0.016f blue:0.169f alpha:1.000f],
[UIColor colorWithRed:0.839f green:0.008f blue:0.102f alpha:1.000f],
[UIColor colorWithRed:0.749f green:0.012f blue:0.067f alpha:1.000f],
[UIColor colorWithRed:0.882f green:0.925f blue:0.988f alpha:1.000f],
[UIColor colorWithRed:0.710f green:0.808f blue:0.973f alpha:1.000f],
[UIColor colorWithRed:0.514f green:0.682f blue:0.953f alpha:1.000f],
[UIColor colorWithRed:0.318f green:0.557f blue:0.933f alpha:1.000f],
[UIColor colorWithRed:0.027f green:0.365f blue:0.906f alpha:1.000f],
[UIColor colorWithRed:0.016f green:0.255f blue:0.867f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.153f blue:0.698f alpha:1.000f],
[UIColor colorWithRed:0.980f green:0.957f blue:0.906f alpha:1.000f],
[UIColor colorWithRed:0.953f green:0.890f blue:0.765f alpha:1.000f],
[UIColor colorWithRed:0.922f green:0.816f blue:0.608f alpha:1.000f],
[UIColor colorWithRed:0.886f green:0.741f blue:0.451f alpha:1.000f],
[UIColor colorWithRed:0.839f green:0.631f blue:0.216f alpha:1.000f],
[UIColor colorWithRed:0.776f green:0.522f blue:0.137f alpha:1.000f],
[UIColor colorWithRed:0.612f green:0.376f blue:0.071f alpha:1.000f]
    ];
  });

  return colorArray;
}

@end
