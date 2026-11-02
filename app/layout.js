import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://comfi-store.vercel.app'),
  title: {
    default: "Comfi | Premium Ultra Thin Sanitary Pads",
    template: "%s | Comfi"
  },
  description: "Gynecologist-approved, 100% organic cotton sanitary pads engineered without bulkiness. Zero leaks. Zero irritation. Ultra-thin daytime and sleep protection.",
  keywords: ["sanitary pads", "organic cotton pads", "ultra-thin pads", "period care", "comfi", "rash-free pads"],
  authors: [{ name: "Comfi Care" }],
  creator: "Comfi",
  publisher: "Comfi",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' }
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/favicon.ico'
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://comfi-store.vercel.app',
    siteName: 'Comfi',
    title: 'Comfi | Premium Ultra Thin Sanitary Pads',
    description: 'Gynecologist-approved, 100% organic cotton sanitary pads engineered without bulkiness. Zero leaks, zero irritation.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Comfi - Premium Ultra-Thin Organic Sanitary Pads',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comfi | Premium Ultra Thin Sanitary Pads',
    description: 'Gynecologist-approved, 100% organic cotton sanitary pads engineered without bulkiness. Zero leaks, zero irritation.',
    images: ['/og-image.png'],
  },
  manifest: '/site.webmanifest',
};

import MainLayout from "./components/MainLayout";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-background-primary text-primaryText selection:bg-[#febac4] selection:text-[#7e0022]">
        <AppProvider>
          <Navbar />
          <MainLayout>
            {children}
          </MainLayout>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
