import ReactDOM from 'react-dom/client'
import App from './App'

// Uncomment to use Redux for state management:
/*
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
*/
//////////

// Uncomment to use React Query and Context for state management:
import {
  NotificationContextProvider,
  useNotification,
} from './contexts/NotificationContext'
import { UserContextProvider, useUserValue } from './contexts/UserContext'
import { BlogContextProvider } from './contexts/BlogContext'
import { QueryClientProvider, queryClient } from './contexts/BlogContext'

const Root = () => {
  return (
    <NotificationContextProvider>
      <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          <BlogContextWrapper />
        </QueryClientProvider>
      </UserContextProvider>
    </NotificationContextProvider>
  )
}

const BlogContextWrapper = () => {
  const notify = useNotification()
  const { user } = useUserValue()

  return (
    <BlogContextProvider user={user} notify={notify}>
      <App />
    </BlogContextProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />)
//////////
