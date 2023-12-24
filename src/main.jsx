import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import './index.css'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { theme as CustomTheme } from './theme.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PageNotFound } from './components/PageNotFound.jsx'
import { CurrentTodoPage } from './components/CurrentTodoPage.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <PageNotFound />
    },
    {
        path: '/404',
        element: <PageNotFound />
    },
    {
        path: 'todos/:id',
        element: <CurrentTodoPage />,
        errorElement: <PageNotFound />
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ColorModeScript
            initialColorMode={CustomTheme.config.initialColorMode}
        />
        <ChakraProvider theme={CustomTheme}>
            <RouterProvider router={router} />
        </ChakraProvider>
    </StrictMode>
)
