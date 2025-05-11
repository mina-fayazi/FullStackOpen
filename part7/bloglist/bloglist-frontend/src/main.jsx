import ReactDOM from 'react-dom/client'
import App from './App'

// Uncomment to use Redux for managing the notifications:
/*
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
*/

// Uncomment to use React Query and Context for managing the notifications:
import { NotificationContextProvider } from './NotificationContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationContextProvider>
    <App />
  </NotificationContextProvider>
)
