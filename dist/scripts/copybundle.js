"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var logs_1 = require("../functions/logs");
try {
    logs_1.info('Copying "bundle.js" from dist to test ...');
    var text = fs_1.readFileSync('./dist/bundle.js');
    fs_1.writeFileSync('./test/bundle.js', text);
    logs_1.success('"bundle.js" Copied');
}
catch (err) {
    logs_1.error("" + err);
}
//# sourceMappingURL=copybundle.js.map