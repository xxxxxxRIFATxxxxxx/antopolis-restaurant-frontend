import "./globals.css";

// Define static metadata for the entire application
export const metadata = {
    title: "Antopolis Restaurant",
    description: "Antopolis Restaurant",
};

// Root layout component that wraps the entire app
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head />
            <body>{children}</body>
        </html>
    );
}
