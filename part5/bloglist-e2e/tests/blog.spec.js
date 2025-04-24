const { test, expect, beforeEach, describe } = require('@playwright/test')
import { loginWith, createBlog } from './helpers'

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
      
      // Ensure that the user has logged in successfully
      await expect(page.getByText('Test User logged-in')).toBeVisible()
      
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
      await expect(page.getByText('Test User logged-in')).not.toBeVisible()
    })
  })
  
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      // Login to the application
      await loginWith(page, 'testuser', 'testpassword')
    })
    
    test('a new blog can be created', async ({ page }) => {
      // Create a new blog
      await createBlog(page, {
        title: 'A blog created by playwright testing',
        author: 'Playwright Author',
        url: 'http://e2etesting.com'
      })
      
      // Make sure that the created blog is displayed in the list of blogs
      const blogItems = page.locator('.blog-summary')
      await expect(blogItems.filter({ hasText: 'A blog created by playwright testing' })).toBeVisible()
    })
	
	test('user can like a blog', async ({ page }) => {
      await createBlog(page, {
        title: 'Blog to Like',
        author: 'Author',
        url: 'http://like.com'
      })
    
      // Find the created blog and click on the "View" button to show the "Like" button
	  const blog = page.locator('[data-testid="blog"]').filter({ hasText: 'Blog to Like' })
      await blog.getByRole('button', { name: 'View' }).click()
      
      // Check the number of likes to be 0
	  const likeCount = blog.getByText(/Likes:/)
      await expect(likeCount).toContainText('0')
    
      // Click on the "Like" button and check if the number of likes has increased by one
	  await blog.getByTestId('like-button').click()
      await expect(likeCount).toContainText('1')
    })

  })
  
})