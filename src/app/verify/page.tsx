"use client"

import ProtectedRoute from "@/components/Routes/ProtectedRoute"
import VerifySection from "@/components/sections/space/verifySection/verifySection"
import { Suspense } from "react"

export default function VerifyPage() {
  return (
    <ProtectedRoute>
      <Suspense>
        <VerifySection />
      </Suspense>
    </ProtectedRoute>
  )
}
