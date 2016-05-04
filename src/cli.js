#!/usr/bin/env node
"use strict";

const os = require("os");
const path = require("path");

class Program {
    main() {
        const platform = os.platform();
        switch (platform) {
            case "win32": {
                this.win32();
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
            console.log("Display off.");
        });
    }
}

const program = new Program();
program.main();