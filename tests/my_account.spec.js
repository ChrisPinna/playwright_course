import { test } from "@playwright/test";
import { MyAccountPage } from "../page-objects/MyAccountPage.js";
import { getLoginToken } from "../api-calls/getLoginToken.js";
import { adminDetails } from "../data/adminDetails.js";

test("My Account using cookie injection and mocking network request", async ({ page }) => {

  const loginToken = await getLoginToken(adminDetails.username, adminDetails.password);

  await page.route("**/api/user**", async (route, request) => {
    route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({message: "PLAYWRIGHT ERROR FROM MOCKING"}),
    })
  })

  const myAccountPage = new MyAccountPage(page);
  await myAccountPage.visit();
  await page.evaluate(([loginTokenInsideBrowserCode]) => {
    document.cookie = "token=" + loginTokenInsideBrowserCode;
  }, [loginToken]);
  await myAccountPage.visit();
  await myAccountPage.waitForPageHeading();
  await myAccountPage.waitForErrorMessage();
});