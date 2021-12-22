module.exports = {
  moduleNameMapper: {
    "^.+.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "identity-obj-proxy",
    "^@/components(.*)$": "<rootDir>/components$1",
    "^utils(.*)$": "<rootDir>/utils$1",
    "^redux/actions": "<rootDir>/redux/actions",
    "^'redux-devtools-extension'": "<rootDir>/node_modules$1",
    "^'react-redux'": "<rootDir>/node_modules$1",
    "^'redux-thunk'": "<rootDir>/node_modules$1",
    "^'redux'": "<rootDir>/node_modules$1",
    "^validation(.*)$": "<rootDir>/validation$1",
    "^hooks(.*)$": "<rootDir>/hooks$1",
    "^networking(.*)$": "<rootDir>/networking$1",
    "^public(.*)$": "<rootDir>/public$1",
    "^lib(.*)$": "<rootDir>/libs$1",
    "^component(.*)$": "<rootDir>/component$1",

    // handle image imports
    "^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$": "<rootDir>/utils$1",
  },
  clearMocks: true,
  moduleDirectories: ["node_modules", "components", "pages", "utils"],
  setupFiles: ["<rootDir>/setup.js"],
  testEnvironment: "jsdom",
};
