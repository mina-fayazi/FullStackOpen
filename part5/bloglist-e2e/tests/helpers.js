// Helper function to handle the login
const loginWith = async (page, username, password)  => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

// Helper function to handle creating a new blog
const createBlog = async (page, { title, author, url }) => {
  await page.getByRole('button', { name: 'New Blog' }).click()
  await page.getByTestId('title-input').fill(title)
  await page.getByTestId('author-input').fill(author)
  await page.getByTestId('url-input').fill(url)
  await page.getByRole('button', { name: 'Create' }).click()
}

export { loginWith, createBlog }