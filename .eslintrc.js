module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "plugins": [
      "react-native-globals"
    ],
    "env": {
      "react-native-globals/all": true
    },
    "rules" : {
      "react/destructuring-assignment": 0,
      "prefer-destructuring": 0,
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
    }
    
};