import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)
await db.read()
db.data ||= { users: [] }
const { users } = db.data

async function userAlreadyExists(id) {
    await db.read()
    for(let user in users) {
        let User = users[user]
        if(User.userid == id) {
            return true, 'User exists in the database.'
        }
    }
    return false, 'User does not exist in the database.'
}
async function newUser(id) {
    await db.read()
    users.push({
        'userid': id,
        'balance': 100
    })
    await db.write()
    return true, 'Successfully created a new user.'
}
async function getUser(id) {
    await db.read()
    for(let user in users) {
        let User = users[user]
        if(User.userid == id) {
            return User, 'Found user.'
        }
    }
    return newUser(id), 'Created new user.'
}
async function wipeUser(id) {
    await db.read()
    for(let user in users) {
        let User = users[user]
        if(User.userid == id) {
            users[user] = null
            await db.write()
            return true, 'Successfully wiped.'
        }
    }
    return false, 'User was not found in database.'
}

