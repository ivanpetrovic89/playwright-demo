import { test, expect } from "@playwright/test";
import { getRequiredEnv } from "../utils/envUtil";
import { LoginPage } from "../pages/LoginPage";
import { HeaderComponent } from "../components/HeaderComponent";

test.describe("login page tests", () => {
  let loginPage: LoginPage;
  let headerComponent: HeaderComponent;

  const email = getRequiredEnv("CUSTOMER_EMAIL");
  const password = getRequiredEnv("CUSTOMER_PASSWORD");

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    headerComponent = new HeaderComponent(page);
    await loginPage.open();
  });

  test("successful login", async ({ page }) => {
    await loginPage.performLogin(email, password);

    await expect(page).toHaveURL(/\/account$/);
    await expect(headerComponent.userMenu).toHaveText("Jane Doe");
  });
});
