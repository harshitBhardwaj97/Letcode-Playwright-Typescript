import { expect, test } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("/table")
})

test.describe("Table page tests", () => {
  test("Table page has correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Table/)
  })

  test("Total price is correct", async ({ page }) => {
    const prices = await page.$$("//table[@id='shopping']//tbody//tr//td[2]")
    let totalPrice = 0
    for (const price of prices) {
      // @ts-ignore
      totalPrice += parseInt(await price.textContent())
    }

    // @ts-ignore
    const expectedTotalPrice = parseInt(
      await page.locator("//table[@id='shopping']//tfoot//td[2]").textContent(),
    )
    expect(totalPrice).toEqual(expectedTotalPrice)
  })

  test("Can select Raj", async ({ page }) => {
    const locator = page.locator("//tr//td[.='Raj']//parent::tr//td//input")
    await expect(locator).not.toBeChecked()

    await locator.check()
    await expect(locator).toBeChecked()
    await page.waitForTimeout(4000)
  })
})
