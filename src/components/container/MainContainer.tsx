"use client"

import ProtectedRoute from "../Routes/ProtectedRoute"
import SpaceSidebar from "../spaceSidebar/spaceSidebar"

export const MainContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ProtectedRoute>
      <div className=" bg h-full flex flex-row items-start justify-start gap-5 min-h-screen">
        <SpaceSidebar />
        {children}
      </div>
    </ProtectedRoute>
  )
}
