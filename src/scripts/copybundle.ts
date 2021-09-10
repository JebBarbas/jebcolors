import { readFileSync, writeFileSync } from "fs";
import { info, success, error } from "../functions/logs";

try{
    info('Copying "bundle.js" from dist to docs ...')

    const text = readFileSync('./dist/bundle.js')
    writeFileSync('./docs/bundle.js', text)

    success('"bundle.js" Copied')
}
catch(err){
    error(`${err}`)
}
