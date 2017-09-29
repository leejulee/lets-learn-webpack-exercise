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

