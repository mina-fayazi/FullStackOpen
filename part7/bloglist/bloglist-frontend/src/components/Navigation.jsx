import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)

  const handleLogout = () => {
    dispatch(logout())
  }

  if (!user) return null

  return (
    <div
      style={{
        background: 'lightgray',
        padding: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <div>
        <Link to='/' style={{ marginRight: 10 }}>
          Blogs
        </Link>
        <Link to='/users'>Users</Link>
      </div>
      <div>
        {user.name} logged-in <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Navigation
