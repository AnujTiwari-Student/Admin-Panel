import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen overflow-x-hidden bg-[#F8F8FF]">

          <header>
            <Header />
          </header>

          <div>
            <main>
            {children}
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
