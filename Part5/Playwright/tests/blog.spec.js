const { test, expect, beforeEach } = require('@playwright/test');

beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')})


test('Front page', async ( { page }) => {

    await page.getByTestId('login-form').isVisible();

})

test('Login succes', async ({ page }) => {
    
    await page.getByRole('textbox').first().fill('Test');
    await page.getByRole('textbox').last().fill('Test');
    await page.getByRole('button', { name: 'Login'}).click();
    await expect(page.getByText('Logged in as Test')).toBeVisible();
})

test('Login failure', async ({ page }) => {
    
    await page.getByRole('textbox').first().fill('Wrong username');
    await page.getByRole('textbox').last().fill('Wrong password');
    await page.getByRole('button', { name: 'Login'}).click();
    await expect(page.getByText('Login failed')).toBeVisible();
})

test('Create blog', async ({ page }) => {
    await page.getByRole('textbox').first().fill('Test');
    await page.getByRole('textbox').last().fill('Test');
    await page.getByRole('button', { name: 'Login'}).click();
    await page.getByRole('button', { name: 'New blog'}).click();

    await page.getByTestId('title-input').fill('Playwright test')
    await page.getByTestId('author-input').fill('Playwright author')
    await page.getByTestId('url-input').fill('Playwrighturl.com')
    await page.getByTestId('likes-input').fill('3')
    await page.getByRole('button', { name: 'Add blog'}).click();
    await expect(page.getByText('New blog created: Playwright test by Playwright author')).toBeVisible();
})

test('Like', async ({ page }) => {
    await page.getByRole('textbox').first().fill('Test');
    await page.getByRole('textbox').last().fill('Test');
    await page.getByRole('button', { name: 'Login'}).click();
    const buttons = await page.getByRole('button', { name: 'View'}).all();
    await buttons[0].click();
    await page.getByRole('button', { name: 'Like'}).isVisible();
})


test('Delete', async ({ page }) => {
    await page.getByRole('textbox').first().fill('Test');
    await page.getByRole('textbox').last().fill('Test');
    await page.getByRole('button', { name: 'Login'}).click();
    await page.getByRole('button', { name: 'New blog'}).click();

    await page.getByTestId('title-input').fill('Playwright test')
    await page.getByTestId('author-input').fill('Playwright author')
    await page.getByTestId('url-input').fill('Playwrighturl.com')
    await page.getByTestId('likes-input').fill('3')
    await page.getByRole('button', { name: 'Add blog'}).click();
    const buttons = await page.getByRole('button', { name: 'View'}).all();
    await buttons[buttons.length - 1].click();
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Delete'}).click();
    const newButtons = await page.getByRole('button', { name: 'View'}).all();
    expect(buttons.length - 1).toEqual(newButtons.length);

})