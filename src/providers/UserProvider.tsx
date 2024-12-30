"use client"

import { getAuthenticatedUser } from "@/clientApi/auth"
import { LOCAL_STORAGE_AUTH_KEY } from "@/constants/app"
import { loginUser } from "@/controller"
import { connectWallet } from "@/service/ether"
import { CONNECT_WALLET_TYPES } from "@/types"
import { IUser } from "@/types/user"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

interface UserContextType {
  user: IUser | null
  isAuthenticated: boolean
  handleAuthentication: any
  status: string // "idle"| "loading" | "authenticated" | "failed";
}

const UserContext = createContext<UserContextType>({
  user: null,
  isAuthenticated: false,
  handleAuthentication: null,
  status: "idle",
})

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("sessionId")
  const pathname = usePathname()
  const [user, setUser] = useState(null)
  const hasRun = useRef(false)
  const [status, setStatus] = useState("idle")
  const handleAuthentication = async () => {
    const user = await getAuthenticatedUser()
    if (user) {
      setUser(user)
      setStatus("authenticated")
    }

    return user
  }

  const updateBalance = (balance: number) => {
    setUser((prevUser: any) => ({
      ...prevUser,
      balance,
    }))
  }

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    const authenticateUser = async () => {
      try {
        if (pathname === "/login") {
          const res = await loginUser(CONNECT_WALLET_TYPES.METAMASK)
          if (res.token) {
            localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, res.token)
            await handleAuthentication()
            updateBalance(res.balance)
            if (sessionId) router.push(`/verify?sessionId=${sessionId}`)
            else router.push("/")
          }
        } else {
          const res = await connectWallet("metamask")
          await handleAuthentication()
          updateBalance(res.balance)
        }
      } catch (err) {
        handleAuthenticationError(err)
      }
    }

    const handleAuthenticationError = (error: any) => {
      setStatus("failed")
      localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY)
      console.error("Authentication error:", error)
    }

    authenticateUser()
  }, [])

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated: !!user, handleAuthentication, status }}
    >
      {children}
    </UserContext.Provider>
  )
}
