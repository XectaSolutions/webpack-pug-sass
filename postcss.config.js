const sprites = require("postcss-sprites");
const spriteOptions = {
  stylesheetPath: "./src/styles",
  spritePath: "./src/images/sprites",
  filterBy: file => {
    console.log("Background ", file);
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
};

const fontMagician = require("postcss-font-magician")({
  variants: {
    Roboto: {
      "400": [],
      "500": []
    }
  },
  foundries: ["google"]
});

module.exports = {
  plugins: [require("autoprefixer"), sprites(spriteOptions), fontMagician]
};
