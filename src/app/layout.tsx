import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import PageTransitions from "@/components/layout/PageTransitions";

export const metadata: Metadata = {
  title: "QuantFun Technologies",
  description: "Independent research and software engineering",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PageTransitions />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
