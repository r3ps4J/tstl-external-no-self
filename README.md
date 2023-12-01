# TSTL External No Self

![npm](https://img.shields.io/npm/v/@r3ps4j/tstl-external-no-self)

Plugin for [TypeScriptToLua](https://github.com/TypeScriptToLua/TypeScriptToLua) which allows you to put the `@noSelfInFile` in external libraries.

## Installation

1. Install the package from npm:

    ```bash
    npm i -D @r3ps4j/tstl-external-no-self
    ```

2. Add the plugin to your `tsconfig.json`:
    ```json
    {
        "tstl": {
            "luaPlugins": [
                {
                    "name": "@r3ps4j/tstl-external-no-self"
                }
            ]
        }
    }
    ```
3. Define which libraries (or files) to add `@noSelfInFile` to:
    ```json
    {
        "tstl": {
            "luaPlugins": [
                {
                    "name": "@r3ps4j/tstl-external-no-self",
                    "targets": [
                        "@somescope/somelibrary", // Works
                        "somelibrary/file.d.ts" // Also works
                    ]
                }
            ]
        }
    }
    ```

## Credits

Credits go to [Perry van Wesel](https://github.com/Perryvw), most of the code from this package comes from [his comment](https://github.com/TypeScriptToLua/TypeScriptToLua/pull/1489#issuecomment-1732665862) within [issue #1489](https://github.com/TypeScriptToLua/TypeScriptToLua/pull/1489) on TypeScriptToLua's repository. I only added the logic for specifying libraries.

## Contributing

Pull requests are much appreciated! If you think you can improve this package, please open a pull request and I will look at it as soon as possible.
