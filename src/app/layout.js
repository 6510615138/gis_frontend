import { Geist, Geist_Mono, PT_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const serif = PT_Serif({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: "Tcct GIS",
  description: "Trade Competition map",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${serif.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
