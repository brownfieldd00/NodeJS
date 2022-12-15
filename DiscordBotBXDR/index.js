import { readFile } from 'fs/promises'
async function readJSON(filename) {
    return JSON.parse(await readFile(new URL(`./${filename}.json`, import.meta.url)))
}
const config = readJSON('config')
