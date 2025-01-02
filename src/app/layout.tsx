import Header from "@/app/components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import {
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
// import Theme from "@radix-ui/themes";
import { Providers } from "@/context/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HiringNexus",
  description: "HiringNexus",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>HiringNexus</title>
        <link rel="icon" href="/assets/hiringnexus.png" />

        <meta
          name="description"
          content="HiringNexus: Your gateway to innovative hiring solutions."
        />
        <meta
          name="keywords"
          content="hiring, recruitment, employment, jobs, HiringNexus"
        />
        <meta name="author" content="HiringNexus Team" />

        <meta property="og:title" content="HiringNexus" />
        <meta
          property="og:description"
          content="HiringNexus: Your gateway to innovative hiring solutions."
        />
        <meta property="og:image" content="/assets/hiringnexus.png" />
        <meta property="og:url" content="https://hiringnexus.in" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HiringNexus" />
        <meta
          name="twitter:description"
          content="HiringNexus: Your gateway to innovative hiring solutions."
        />
        <meta name="twitter:image" content="/assets/hiringnexus.png" />
      </head>
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <footer className="bg-gradient-to-r from-indigo-400 to-purple-400 text-gray-900 py-12 mt-12 shadow-lg">
            <div className="container mx-auto text-center">
              <p className="mb-6 text-xl font-semibold text-gray-800">
                HiringNexus &copy; {new Date().getFullYear()} - All rights
                reserved
              </p>
              <div className="flex justify-center space-x-8 mb-6">
                <a
                  href="https://chat.whatsapp.com/JJfEoGqP5nJEUetQZwOQKc"
                  target="_blank"
                  className="transition duration-300 transform hover:scale-110 hover:text-gray-600"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={28} />
                </a>
                <a
                  href="https://www.linkedin.com/company/hiringnexus/"
                  target="_blank"
                  className="transition duration-300 transform hover:scale-110 hover:text-gray-600"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin size={28} />
                </a>
                <a
                  href="https://t.me/hiringnexus_team"
                  target="_blank"
                  className="transition duration-300 transform hover:scale-110 hover:text-gray-600"
                  rel="noopener noreferrer"
                >
                  <FaTelegram size={28} />
                </a>
                <a
                  href="https://chat.whatsapp.com/JJfEoGqP5nJEUetQZwOQKc"
                  target="_blank"
                  className="transition duration-300 transform hover:scale-110 hover:text-gray-600"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp size={28} />
                </a>
              </div>
              <div className="flex justify-center space-x-8">
                <a
                  href="/"
                  className="text-sm hover:text-gray-600 transition duration-300"
                >
                  Privacy Policy
                </a>
                <a
                  href="/"
                  className="text-sm hover:text-gray-600 transition duration-300"
                >
                  Terms of Service
                </a>
                <a
                  href="/"
                  className="text-sm hover:text-gray-600 transition duration-300"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
