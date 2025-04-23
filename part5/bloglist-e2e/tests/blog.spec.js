const { test, expect, beforeEach, describe } = require('@playwright/test')
import { loginWith } from './helpers'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'testpassword'
      }
    })
	
	await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
  })
  
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      // Login with the correct credentials
	  await loginWith(page, 'testuser', 'testpassword')
      
      // Check the notification text and CSS styles
      const notifDiv = await page.locator('.notification')
      await expect(notifDiv).toContainText('Login successful!')
      await expect(notifDiv).toHaveCSS('border-style', 'solid') // Check the notification to have solid border around it
      await expect(notifDiv).toHaveCSS('color', 'rgb(0, 128, 0)') // Check the color of the notification to be green
      
      // Make sure that the failed login notification is not rendered  
      await expect(page.getByText('Wrong username or password')).not.toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      // Login with the wrong password
      await loginWith(page, 'testuser', 'wrongpassword')
      
      // Check the notification text and CSS styles
	  const notifDiv = await page.locator('.notification')
      await expect(notifDiv).toContainText('Wrong username or password')
      await expect(notifDiv).toHaveCSS('border-style', 'solid') // Check the notification to have solid border around it
      await expect(notifDiv).toHaveCSS('color', 'rgb(255, 0, 0)') // Check the color of the notification to be red
      
      // Make sure that the successful login notification is not rendered  
      await expect(page.getByText('Login successful!')).not.toBeVisible()
    })
  })
  
})