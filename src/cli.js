#!/usr/bin/env node
"use strict";

const os = require("os");
const path = require("path");

const offMessage = "Display off.";

class Program {
    main() {
        const platform = os.platform();
        switch (platform) {
            case "win32": {
                this.win32();
                break;
            }

            case "darwin": {
                this.darwin();
                break;
            }

            default: {
                console.log("Platform " + platform + " is not supported yet. Pull requests are welcome.");
                process.exit(1);
                break;
            }
        }
    }

    win32() {
        let edge;
        try {
            edge = require("edge");
        }
        catch (exception) {
            console.log("Could not find module edge:");
            console.log(exception);
            process.exit(1);
        }

        const runWithDotNet = edge.func(path.join(__dirname, "TurnOffDisplayViaWinAPI.cs"));
        runWithDotNet({}, error => {
            if (error) {
                throw error;
            }
            console.log(offMessage);
        });
    }

    darwin() {
        if (os.release() >= "13.0.0") {
            const execFile = require("child_process").execFile;
            execFile("pmset", ["displaysleepnow"], (error, stdout, stderr) => {
                if (error) {
                    throw error;
                }
                console.log(offMessage);
            });
        }
        else {
            console.log("OS X < 10.9 is not supported.");
            process.exit(1);
        }
    }
}

const program = new Program();
program.main();