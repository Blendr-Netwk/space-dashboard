"use client"

import { Toaster } from "react-hot-toast"

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
