import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store, { persistor } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from './components/ui/toaster.jsx'
import { ThemeProvider } from './components/theme-provider.jsx'

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
      <Toaster />
    </PersistGate>
  </Provider>
  ,
)
