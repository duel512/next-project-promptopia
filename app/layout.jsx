import '@styles/global.css';

export const metadata = {
    title: "Promptopia",
    description: "Discover & Share AI prompts"
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <body>
            <div className='main'>
                <div className='gradient' />

                <main className='app'>
                    {children}
                </main>
            </div>
        </body>
    </html>
  )
}

export default RootLayout;