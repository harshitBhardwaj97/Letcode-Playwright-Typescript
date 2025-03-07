import { expect, test } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("/button")
})

test.describe("Button page tests", () => {
  test("Button page has correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Buttons/)
  })

  test("Get button color", async ({ page }) => {
    const button = page.locator("#color")
    const backgroundColor = await button.evaluate(el => {
      return window.getComputedStyle(el).getPropertyValue("background-color")
    })
    console.log(`Background color is ${backgroundColor}`)
  })

  test("Navigation test", async ({ page }) => {
    const goToButton = page.locator("#home")
    let currentUrl = page.url()
    console.log(`Current URL is:- ${currentUrl}`)
    await goToButton.click()

    await page.getByRole("heading", { name: "LetCode with Koushik" }).waitFor()
    currentUrl = page.url()
    expect(currentUrl).not.toContain("button")

    console.log(`Current URL after navigation is:- ${currentUrl}`)

    await page.goBack()
    currentUrl = page.url()
    expect(currentUrl).toContain("button")
    console.log(`Current URL after navigating back is:- ${page.url()}`)
  })

  test("Can get X and Y Coordinates", async ({ page }) => {
    const box = await page.locator("#position").boundingBox()
    if (box) {
      const { x, y } = box
      console.log("Button's coordinates are -")
      console.log({ x, y })
      expect(box).not.toBeNull()
    } else {
      console.log("The element is not visible or cannot be found")
    }
  })

  test("Can get Height and Width", async ({ page }) => {
    const box = await page.locator("#property").boundingBox()
    if (box) {
      const { height, width } = box
      console.log("Button's height and width are -")
      console.log({ height, width })
      expect(box).not.toBeNull()
    } else {
      console.log("The element is not visible or cannot be found")
    }
  })

  test("Confirm button is disabled", async ({ page }) => {
    const disabledButton = page.getByRole("button", { name: "Disabled" })
    await expect(disabledButton).toBeDisabled()
  })

  test("Click and hold button", async ({ page }) => {
    const holdButton = page.locator("//label[.='Click and Hold Button']//following::div//button")
    let currentButtonText = await holdButton.textContent()

    console.log(`Current text of hold button is - ${currentButtonText}`)
    expect(currentButtonText).toContain("Button Hold!")

    await holdButton.click({
      delay: 5000,
    })

    currentButtonText = await holdButton.textContent()
    console.log(`Current text of hold button is - ${currentButtonText}`)
    expect(currentButtonText).toContain("long pressed")
  })
})
