import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { logout } from '../reducers/userReducer'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)

  const handleLogout = () => {
    dispatch(logout())
  }

  if (!user) return null

  const padding = {
    paddingRight: 5,
    textDecoration: 'none',
    color: 'white',
  }

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        {/* Left-aligned navigation links */}
        <Nav className='me-auto px-3'>
          <Nav.Link as='span'>
            <Link style={padding} to='/'>
              Blogs
            </Link>
          </Nav.Link>
          <Nav.Link as='span'>
            <Link style={padding} to='/users'>
              Users
            </Link>
          </Nav.Link>
        </Nav>

        {/* Right-aligned user info and logout button */}
        <Nav className='ms-auto px-3'>
          <Navbar.Text className='me-2'>
            <em>{user.name}</em> logged in
          </Navbar.Text>
          <Button variant='outline-light' size='sm' onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
