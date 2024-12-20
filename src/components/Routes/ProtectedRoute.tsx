import { useUser } from "@/providers/UserProvider"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, status } = useUser()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("sessionId")

  useEffect(() => {
    if (status === "failed") {
      const path = `/login${sessionId ? `?sessionId=${sessionId}` : ""}`
      window.location.href = path
    }
  }, [status, sessionId])

  if (!isAuthenticated) {
    return <div>Loading..</div>
  }

  return <>{children}</>
}

export default ProtectedRoute
