import { expect, test } from "@playwright/test"
import path from "path"
import fs from "fs"
import { logger } from "../setup/custom-logger"

test.beforeEach(async ({ page }) => {
  await page.goto("/edit")
})

test.describe("Edit page tests", () => {
  test("Edit page has correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Edit/)
    logger.info("In edit page test")
  })

  test("Can enter details and confirm other information", async ({ page }) => {
    await page.locator("#fullName").fill("Harshit Bhadwaj")
    const appendTextLocator = page.locator("#join")
    let currentTextInJoin = await appendTextLocator.inputValue()

    console.log(`Current text in join box is :- ${currentTextInJoin}`)
    await appendTextLocator.fill(currentTextInJoin + " Human")
    currentTextInJoin = await appendTextLocator.inputValue()
    console.log(`Appended text in join box is :- ${currentTextInJoin}`)

    const textInGetMeBox = await page.locator("#getMe").inputValue()
    console.log(`Text inside getMe box is - ${textInGetMeBox}`)

    await page.locator("#clearMe").clear()

    await expect(page.locator("#noEdit")).toBeDisabled()
    await expect(page.locator("#dontwrite")).toHaveAttribute("readonly")

    const screenshotPath = path.join(__dirname, "../screenshots", "edit.png")
    if (!fs.existsSync(screenshotPath)) {
      await page.screenshot({ path: screenshotPath })
      console.log(`Screenshot saved at: ${screenshotPath}`)
    }
  })
})
