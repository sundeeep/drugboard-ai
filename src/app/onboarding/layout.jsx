import "../globals.css";

export const metadata = {
    title: "Onboarding - drugboard.ai",
    description: "drugboard.ai - Display Science and Scientific Connect",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div>{children}</div>
            </body>
        </html>
    );
}
