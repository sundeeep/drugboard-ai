import { StyledEngineProvider } from '@mui/material'
import './globals.css'
import { ToastContainer } from 'react-toastify'

export const metadata = {
  title: 'drugboard - Home',
  description: 'drugboard.ai - Display Science and Scientific Connect',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledEngineProvider injectFirst>
          {children}
          <ToastContainer />
        </StyledEngineProvider>
      </body>
    </html>
  )
}
