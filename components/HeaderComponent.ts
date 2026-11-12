import { type Locator, type Page } from "@playwright/test";

export class HeaderComponent {
  readonly signInLink: Locator;
  readonly userMenu: Locator;

  constructor(private page: Page) {
    this.signInLink = page.getByTestId("nav-sign-in");
    this.userMenu = page.getByTestId("nav-menu");
  }
}
