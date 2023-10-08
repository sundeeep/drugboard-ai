import './globals.css'

export const metadata = {
  title: 'drugboard - Home',
  description: 'drugboard.ai - Display Science and Scientific Connect',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
