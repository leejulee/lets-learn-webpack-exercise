# install
- https://nodejs.org/en/
- https://doc.webpack-china.org/
- https://yarnpkg.com/zh-Hans/
    - 使用原因
        - 會快取檔案供下次安裝使用
        - 也是套件管理工具
    - mac install
        - homebrew
# github
- https://github.com/howtocodeio/lets-learn-webpack-2

# Project
- download github [Start Here](https://github.com/howtocodeio/lets-learn-webpack-2/releases/tag/1)
- open download folder 
- `npm init`
- `yarn add -D webpack`
    - [yarn add cli](https://yarnpkg.com/zh-Hans/docs/cli/add)
    - 用 --dev 或 -D 會在 devDependencies 裡安裝一個或多個包
- modify package.json add `"build": "webpack"` to **scripts**
- create file
    - src
        - index.js
    - dist
        - index.html
            - html tag
            - body end add `<script src="bundle.js"></script>`
    - webpack.config.js

    ```
    const path = require('path');

    module.exports = {
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        }
    }
    ```

    - build webpack `yarn run build`
    - add loader css
        - https://doc.webpack-china.org/guides/asset-management/#-css
        - yarn add -D style-loader css-loader
    - add file
        - css **css/main.css**
        ```
        body{
            background: green;
        }
        ```
    - modify file 
        - **webpack.config.js** add module

        ```
        const path = require('path');

        module.exports = {
            entry: './src/index.js',
            output: {
                filename: 'bundle.js',
                path: path.resolve(__dirname, 'dist')
            },
            module: {
                rules: [
                    {
                        test: /\.css$/,
                        use: [
                            'style-loader',
                            'css-loader'
                        ]
                    }
                ]
            }
        }
        ```
        - src **index.js** `import './css/main.css'`
        - build webpack `yarn run build`
        - add loader sass
            - [sass-loader](https://doc.webpack-china.org/loaders/sass-loader/)
            - `yarn add -D sass-loader node-sass`
            
        - add file **scss/main.scss**

        ```
        body{
            background: green;
        }
        ```
        - modify file
            - webpack.config.js add new **rule** to **module** 
            ```
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            }            
            ```
            - src **index.js** `import './scss/main.scss'`
            - build webpack `yarn run build`
    - add babel
        - [babel webpack](https://babeljs.io/docs/setup/#installation)
        - `yarn add -D babel-loader babel-core`
        - modify file 
            - webpack.config.js add new **rule** to **module** 
            ```
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
            ```
        - `yarn add -D babel-preset-env`
        - add **.babelrc**
        ```
        {
        "presets": ["env"]
        }
        ```  
        - build webpack `yarn run build`
        - add file **js/module.js**
        ```
        function hello() {
            console.log('hello module!')
        }

        function sub() {
            console.log('hello sub()!')
        }

        export { hello, sub }
        ```

        - modify file **src/index.js**

        ```
        import { hello, sub } from './js/module';

        hello();
        sub();
        ```

        - build webpack `yarn run build`
    - webpack watch 
        - modify package.json add `"watch": "webpack --watch"` to **scripts**
    - add [postcss-loader](https://doc.webpack-china.org/loaders/postcss-loader/)
        - [PostCSS plugins](https://www.postcss.parts/)
        - `yarn add -D postcss-loader`
        - add file `postcss.config.js`
        ```
        module.exports = {
            plugins: {
                'rucksack-css': {},
                'lost': {},
                'autoprefixer': {},
                'cssnano': {}
            }
        }        
        ```
        - `yarn add -D rucksack-css lost autoprefixer cssnano`
        - modify file **webpack.config.js** update postcss-loader to rules
        ```
        rules: [
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' },
                        { loader: 'postcss-loader' },
                        { loader: 'sass-loader' }
                    ]
                },
                ......
        ```
        - [Rucksack](https://www.rucksackcss.org/docs/#responsive-type)
        - modify file
            - **src/index.js** add `import './scss/main.scss'`
            - **src/main.scss** add `p {font-size: responsive;}`
            - build webpack `yarn run build`
    - add [browserslist](https://github.com/ai/browserslist#queries)
        - modify **package.json** add browserlist
        ```
        "browserlist": [
            "> 1%",
            "last 2 versions"
        ]
        ```
        - build webpack `yarn run build`
    - add [extract-text-webpack-plugin](https://doc.webpack-china.org/plugins/extract-text-webpack-plugin/)
        - `yarn add -D extract-text-webpack-plugin`
        -  modify file
            - **webpack.config.js** Use ExtractTextPlugin replace rulues.use & add plugins parameter
            ```
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            }
            ```
            ```
            ,
            plugins: [
                new ExtractTextPlugin('styles.css') // styles.css output file name
            ]
            ```
            - index.html
            ```
            <link rel="stylesheet" href="styles.css">
            ```
    - **enable sourcemaps** modify file
        - [using-source-maps](https://webpack.js.org/guides/development/#using-source-maps)
        - **webpack.config.js** add parameter `devtool: 'inline-source-map',`
        - add file 
            - hello.js
            ```
            function hello() {
                console.log('hello module!')
            }

            export { hello }            
            ```
            - typography.scss `p{font-size: responsive;}`
        - modify file
            - module.js

            ```
            import './scss/main.scss'
            import { sub } from './js/module';
            import { hello } from './js/hello';

            hello();
            sub();

            console.log('webpack watch!');
            ```

            - main.scss

            ```
            @import 'typography.scss';

            $blue : gray;
            body{
                background: $blue;
            }
            ```
            - webpack.config.js add options parameter to scss rule
            ```
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { sourceMap: true } },
                        { loader: 'postcss-loader', options: { sourceMap: true } },
                        { loader: 'sass-loader', options: { sourceMap: true } }
                    ]
                })
            }
            ```
        - build webpack `yarn run build`
    - multiple bundles
        - [Output Management](https://webpack.js.org/guides/output-management/)
        - modify file
            - webpack.config.js modify entry & bundle name (`[name]`maping entry key ex: app->app.bundle.js)
            ```
            entry:  {
                app: './src/index.js',
                about: './src/js/about.js',
            },            
            ```
            ```
            output: {
                filename: '[name]bundle.js',
                path: path.resolve(__dirname, 'dist')
            },
            ```
        - build webpack `yarn run build`
        - `yarn add -D html-webpack-plugin`
            - modify file **webpack.config.js** add **HtmlWebPackPlugin** to plugins
            `const HtmlWebPackPlugin = require('html-webpack-plugin');`
            ```
            plugins: [
                new ExtractTextPlugin('styles.css'),
                new HtmlWebPackPlugin({
                    title: 'Multiple Bundles!'
                })
            ]
            ```
            - delete index.html file
            - build webpack `yarn run build` (auto create index.html)
        - `yarn add -D clean-webpack-plugin`
            - modify file **webpack.config.js** add **CleanWebPackPlugin** to plugins
            `const CleanWebPackPlugin = require('clean-webpack-plugin');`
            ```
            plugins: [
                new CleanWebPackPlugin(['dist']),
                new ExtractTextPlugin('styles.css'),
                new HtmlWebPackPlugin({
                    title: 'Multiple Bundles!'
                })
            ]
            ```
    - webpack server
        - [webpack-dev-server](https://webpack.js.org/guides/development/#using-webpack-dev-server)
        - `yarn add -D webpack-dev-server`
        - modify file 
            - **webpack.config.js** add parameter `devServer: {contentBase: './dist'}`
            - **package.json** add `"start": "webpack-dev-server --open"` to scripts
        - yarn start
    - browsersync proxy
        - [browsersync](https://www.browsersync.io/)
        - [browser-sync-webpack-plugin](https://github.com/Va1/browser-sync-webpack-plugin)
        - `yarn add -D browser-sync browser-sync-webpack-plugin`
        - modify file 
            - webpack.config.js
            `const BrowserSyncPlugin = require('browser-sync-webpack-plugin');`
            ```
            plugins: [
                new BrowserSyncPlugin(
                // BrowserSync options
                {
                    // browse to http://localhost:3000/ during development
                    host: 'localhost',
                    port: 3000,
                    // proxy the Webpack Dev Server endpoint
                    // (which should be serving on http://localhost:3100/)
                    // through BrowserSync
                    proxy: 'http://localhost:3100/'
                },
                // plugin options
                {
                    // prevent BrowserSync from reloading the page
                    // and let Webpack Dev Server take care of this
                    reload: false
                }
                )
            ] 
            ```
            - package.json remove **--open** `"start": "webpack-dev-server"`
            - yarn start
            - <http://localhost:3001> browser sync setting
