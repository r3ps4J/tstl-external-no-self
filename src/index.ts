import path from "path";
import * as ts from "typescript";
import * as tstl from "typescript-to-lua";

declare module "typescript" {
    interface Statement {
        jsDoc?: ts.JSDoc[];
    }
}

function shouldAddNoSelfToFile(fileName: string, targets: string[]): boolean {
    fileName = fileName.replace(
        path
            .dirname(path.resolve("../"))
            .replace(/^\\\\\?\\/, "")
            .replace(/\\/g, "/")
            .replace(/\/\/+/g, "/"),
        ""
    );

    for (const value of targets) {
        if (fileName.includes(value)) {
            return true;
        }
    }

    return false;
}

class Plugin implements tstl.Plugin {
    public beforeTransform(program: ts.Program, options: tstl.CompilerOptions, emitHost: tstl.EmitHost) {
        const luaPlugin = options.luaPlugins!.find((value) => {
            return value.name == "@r3ps4j/tstl-force-no-self";
        });

        if (luaPlugin?.targets != undefined) {
            for (const file of program.getSourceFiles()) {
                if (
                    file.isDeclarationFile &&
                    file.statements.length &&
                    shouldAddNoSelfToFile(file.fileName, luaPlugin.targets)
                ) {
                    if (!file.statements[0].jsDoc) {
                        file.statements[0].jsDoc = [];
                    }

                    const noSelfInFile = ts.factory.createJSDocComment(undefined, [
                        ts.factory.createJSDocUnknownTag(ts.factory.createIdentifier("noSelfInFile")),
                    ]);
                    file.statements[0].jsDoc.unshift(noSelfInFile);
                }
            }
        }
    }
}

const plugin = new Plugin();
export default plugin;
