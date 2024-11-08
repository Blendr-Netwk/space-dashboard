import { ModalProvider } from "@/providers/ModalProvider"
import { UserProvider } from "@/providers/UserProvider"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Blendr Space",
  description: "Blendr Space will you lend and rent gpu power",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <ModalProvider>{children}</ModalProvider>
        </UserProvider>
      </body>
    </html>
  )
}
