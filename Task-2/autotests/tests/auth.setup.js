import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('https://www.avito.ru/avito-care/eco-impact#login');
  await page.getByPlaceholder('Телефон или почта').fill(process.env.AVITO_USER_NAME);
  await page.getByPlaceholder('Пароль').fill(process.env.AVITO_PASSWORD);
  await page.getByRole('button', { name: 'Войти' }).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://www.avito.ru/avito-care/eco-impact');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
 // await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});