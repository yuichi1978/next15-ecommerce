import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "E-Commerce Store",
    template: "%s | E-Commerce Store"
  },
  description: "A simple e-commerce store built with Next.js and Tailwind CSS",
  openGraph: {
    title: "E-Commerce Store",
    description:
      "A simple e-commerce store built with Next.js and Tailwind CSS",
    url: process.env.NEXT_PUBLIC_URL,
    siteName: "E-Commerce Store",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <html lang="en" suppressContentEditableWarning suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="min-h-screen flex flex-col">
                <header>
                  <Navbar />
                </header>
                {children}
                <Footer />
              </div>
            </ThemeProvider>
          </SessionProvider>
        </body>
      </html>
    </Suspense>
  );
}
