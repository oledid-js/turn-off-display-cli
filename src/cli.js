#!/usr/bin/env node
"use strict";

const method = require("turn-off-display");
try {
	method();
	console.log("Display off.");
}
catch (err) {
	console.error(err);
	process.exit(1);
}
