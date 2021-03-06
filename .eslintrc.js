module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    },

    "globals": {
        "$": true,
        "process": true,
        "rm": true,
        "mkdir": true,
        "cp": true,
        "_": true,
        "Backbone": true,
        "__dirname": true
    }
};