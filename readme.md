## Webpack configuration for Single or Multipage websites with Sass, Pug(Jade), PostCSS and Typescript support

**Features:**

The following are supported out of the box.

- Sass
- Pug (Jade)
- PostCSS (Included plugins: Font Magician and Sprite)
- JS and HTML minification
- Inline image conversion for small images
- Typescript support
- Webpack Dev Server
- Project.config file to manage configuration easily (No webpack.config.js edit is required)

## How to run

Clone respository and install packages using npm or yarn

```
yarn
```

Then start the development server using

```
yarn start
```

This will open the site in localhost:8080.

## Project Configuration

Your can edit the `project.config.js` file to add new templates.

```
module.exports = {
  srcPath: "./src",
  templatePath: "./src/pages",
  buildPath: "./dist",
  minifyHTML: true,
  minifyJS: true,
  minifyCSS: true,
  homePage: "index.html",
  templateFiles: ["./src/pages/index.html", "./src/pages/aboutus.pug"]
};

```

You can create any kind of folder structure. By default, template files are stored in `./src/pages/`. You are free to add or remove items from here.

## How to build

yarn or npm build command wlll buil the output under `dist` folder by default.

```
yarn build
```

## What if I don't need Pug or Typescript support

Well, you're not forced to use Pug or Typescript. You can use this config for building normal HTML and Javascript websites. It adds no extra baggage.

## Future Enhancements Planned

An option to generate webpack and post css config file interactively.
