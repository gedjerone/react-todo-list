import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import './index.css'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { theme as CustomTheme } from './theme.js'

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ColorModeScript
            initialColorMode={CustomTheme.config.initialColorMode}
        />
        <ChakraProvider theme={CustomTheme}>
            <App />
        </ChakraProvider>
    </StrictMode>
)
