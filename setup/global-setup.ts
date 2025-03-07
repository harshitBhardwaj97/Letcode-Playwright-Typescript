import fs from 'fs'
import path from 'path'

const screenshotsDir = path.join(__dirname, '../screenshots')

export default async function globalSetup() {
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir)
        console.log("Created 'screenshots' directory")
    }
}
