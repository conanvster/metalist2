const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { NoEmitOnErrorsPlugin, EnvironmentPlugin, HashedModuleIdsPlugin } = require('webpack');
const { BaseHrefWebpackPlugin, SuppressExtractedTextChunksWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { PurifyPlugin } = require('@angular-devkit/build-optimizer');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

const { CommonsChunkPlugin, ModuleConcatenationPlugin } = require('webpack').optimize;
const { LicenseWebpackPlugin } = require('license-webpack-plugin');


// const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');
const customProperties = require('postcss-custom-properties');

const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];
const baseHref = "";
const deployUrl = "";


const minimizeCss = true;

const postcssPlugins = function () {
  // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
  const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
  const minimizeOptions = {
    autoprefixer: false,
    safe: true,
    mergeLonghand: false,
    discardComments: { remove: (comment) => !importantCommentRe.test(comment) }
};
  return [
    postcssUrl({
      url: (URL) => {
      // Only convert root relative URLs, which CSS-Loader won't process into require().
      if (!URL.startsWith('/') || URL.startsWith('//')) {
    return URL;
  }
  if (deployUrl.match(/:\/\//)) {
    // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
    return `${deployUrl.replace(/\/$/, '')}${URL}`;
  }
  else if (baseHref.match(/:\/\//)) {
    // If baseHref contains a scheme, include it as is.
    return baseHref.replace(/\/$/, '') +
      `/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
  }
  else {
    // Join together base-href, deploy-url and the original URL.
    // Also dedupe multiple slashes into single ones.
    return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
  }
}
}),
  autoprefixer(),
    customProperties({ preserve: true })
].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
};


module.exports = webpackMerge(commonConfig, {
  "output": {
    "path": path.join(process.cwd(), "dist/client"),
    "filename": "[name].[chunkhash:20].bundle.js",
    "chunkFilename": "[id].[chunkhash:20].chunk.js",
    "crossOriginLoading": false
  },
  "module": {
    "rules": [
      {
        "test": /\.html$/,
        "loader": "raw-loader"
      },
      {
        "test": /\.(eot|svg|cur)$/,
        "loader": "file-loader",
        "options": {
          "name": "[name].[hash:20].[ext]",
          "limit": 10000
        }
      },
      {
        "test": /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
        "loader": "url-loader",
        "options": {
          "name": "[name].[hash:20].[ext]",
          "limit": 10000
        }
      },
      {
        "test": /\.js$/,
        "use": [
          {
            "loader": "@angular-devkit/build-optimizer/webpack-loader",
            "options": {
              "sourceMap": false
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "client/styles.css")
        ],
        "test": /\.css$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "client/styles.css")
        ],
        "test": /\.scss$|\.sass$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "sass-loader",
            "options": {
              "sourceMap": false,
              "precision": 8,
              "includePaths": []
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "client/styles.css")
        ],
        "test": /\.less$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "less-loader",
            "options": {
              "sourceMap": false
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "client/styles.css")
        ],
        "test": /\.styl$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "stylus-loader",
            "options": {
              "sourceMap": false,
              "paths": []
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "client/styles.css")
        ],
        "test": /\.css$/,
        "loaders": ExtractTextPlugin.extract({
          "use": [
            {
              "loader": "css-loader",
              "options": {
                "sourceMap": false,
                "importLoaders": 1
              }
            },
            {
              "loader": "postcss-loader",
              "options": {
                "ident": "postcss",
                "plugins": postcssPlugins
              }
            }
          ],
          "publicPath": ""
        })
      },
      {
        "include": [
          path.join(process.cwd(), "client/styles.css")
        ],
        "test": /\.scss$|\.sass$/,
        "loaders": ExtractTextPlugin.extract({
          "use": [
            {
              "loader": "css-loader",
              "options": {
                "sourceMap": false,
                "importLoaders": 1
              }
            },
            {
              "loader": "postcss-loader",
              "options": {
                "ident": "postcss",
                "plugins": postcssPlugins
              }
            },
            {
              "loader": "sass-loader",
              "options": {
                "sourceMap": false,
                "precision": 8,
                "includePaths": []
              }
            }
          ],
          "publicPath": ""
        })
      },
      {
        "include": [
          path.join(process.cwd(), "client/styles.css")
        ],
        "test": /\.less$/,
        "loaders": ExtractTextPlugin.extract({
          "use": [
            {
              "loader": "css-loader",
              "options": {
                "sourceMap": false,
                "importLoaders": 1
              }
            },
            {
              "loader": "postcss-loader",
              "options": {
                "ident": "postcss",
                "plugins": postcssPlugins
              }
            },
            {
              "loader": "less-loader",
              "options": {
                "sourceMap": false
              }
            }
          ],
          "publicPath": ""
        })
      },
      {
        "include": [
          path.join(process.cwd(), "client/styles.css")
        ],
        "test": /\.styl$/,
        "loaders": ExtractTextPlugin.extract({
          "use": [
            {
              "loader": "css-loader",
              "options": {
                "sourceMap": false,
                "importLoaders": 1
              }
            },
            {
              "loader": "postcss-loader",
              "options": {
                "ident": "postcss",
                "plugins": postcssPlugins
              }
            },
            {
              "loader": "stylus-loader",
              "options": {
                "sourceMap": false,
                "paths": []
              }
            }
          ],
          "publicPath": ""
        })
      },
      {
        "test": /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        "use": [
          {
            "loader": "@angular-devkit/build-optimizer/webpack-loader",
            "options": {
              "sourceMap": false
            }
          },
          "@ngtools/webpack"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      "template": "./client/index.html",
      "filename": "./index.html",
      "hash": false,
      "inject": true,
      "compile": true,
      "favicon": false,
      "minify": {
        "caseSensitive": true,
        "collapseWhitespace": true,
        "keepClosingSlash": true
      },
      "cache": true,
      "showErrors": true,
      "chunks": "all",
      "excludeChunks": [],
      "title": "Webpack App",
      "xhtml": true,
      "chunksSortMode": function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightindex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
          return 1;
        }
        else if (leftIndex < rightindex) {
          return -1;
        }
        else {
          return 0;
        }
      }
    }),
    new ExtractTextPlugin({
      "filename": "[name].[contenthash:20].bundle.css"
    }),
    new SuppressExtractedTextChunksWebpackPlugin(),
    new EnvironmentPlugin({
      "NODE_ENV": "production"
    }),
    new HashedModuleIdsPlugin({
      "hashFunction": "md5",
      "hashDigest": "base64",
      "hashDigestLength": 4
    }),
    new ModuleConcatenationPlugin({}),
    new UglifyJsPlugin({
      "test": /\.js$/i,
      "extractComments": false,
      "sourceMap": false,
      "cache": false,
      "parallel": false,
      "uglifyOptions": {
        "output": {
          "ascii_only": true,
          "comments": false
        },
        "ecma": 5,
        "warnings": false,
        "ie8": false,
        "mangle": true,
        "compress": {
          "pure_getters": true,
          "passes": 3
        }
      }
    }),
    // new LicenseWebpackPlugin({
    //   "licenseFilenames": [
    //     "LICENSE",
    //     "LICENSE.md",
    //     "LICENSE.txt",
    //     "license",
    //     "license.md",
    //     "license.txt"
    //   ],
    //   "perChunkOutput": false,
    //   "outputTemplate": "/home/alex2/projects/client/node_modules/license-webpack-plugin/output.template.ejs",
    //   "outputFilename": "3rdpartylicenses.txt",
    //   "suppressErrors": true,
    //   "includePackagesWithoutLicense": false,
    //   "abortOnUnacceptableLicense": false,
    //   "addBanner": false,
    //   "bannerTemplate": "/*! 3rd party license information is available at <%- filename %> */",
    //   "includedChunks": [],
    //   "excludedChunks": [],
    //   "additionalPackages": [],
    //   "pattern": /^(MIT|ISC|BSD.*)$/
    // }),
    new PurifyPlugin(),
    new AngularCompilerPlugin({
      "mainPath": "main.ts",
      "platform": 0,
      "hostReplacementPaths": {
        "environments/environment.ts": "environments/environment.prod.ts"
      },
      "sourceMap": false,
      "tsConfigPath": "client/tsconfig.app.json",
      "compilerOptions": {}
    })

  ]
});
