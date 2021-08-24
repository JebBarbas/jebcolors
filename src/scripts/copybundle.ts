import { readFileSync, writeFileSync } from "fs";
import { info, success, error } from "../functions/logs";

try{
    info('Copying "bundle.js" from dist to test ...')

    const text = readFileSync('./dist/bundle.js')
    writeFileSync('./test/bundle.js', text)

    success('"bundle.js" Copied')
}
catch(err){
    error(`${err}`)
}
