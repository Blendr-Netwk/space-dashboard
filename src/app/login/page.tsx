"use client"

import { getAuthenticatedUser } from "@/clientApi/auth"
import { LOCAL_STORAGE_AUTH_KEY } from "@/constants/app"
import { loginUser } from "@/controller"
import { useUser } from "@/providers/UserProvider"
import { setAxiosJwtToken } from "@/service/axios"
import { CONNECT_WALLET_TYPES } from "@/types"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"

const Login = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("sessionId")
  const { handleAuthentication } = useUser()
  const hasRun = useRef(false)

  const handleLoginWithMetamask = async () => {
    try {
      const res = await loginUser(CONNECT_WALLET_TYPES.METAMASK)
      if (res) {
        localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, res)
        await handleAuthentication()
        if (sessionId) router.push(`/verify?sessionId=${sessionId}`)
        else router.push("/")
      }
    } catch (err: any) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    const handleMetamaskLogin = async () => {
      try {
        const token = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
        if (token) {
          setAxiosJwtToken(token)
          const user = await getAuthenticatedUser()
          if (!user) return

          if (sessionId) router.push(`/verify?sessionId=${sessionId}`)
          else router.push("/")
        }
      } catch (err) {
        localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY)
      }
    }

    handleMetamaskLogin()
  }, [])

  return (
    <div className=" min-h-screen h-screen bg-[#000] flex lg:items-stretch flex-col items-center justify-start lg:flex-row">
      <div className=" w-full h-2/4 lg:w-1/2 2xl:w-5/12 lg:h-auto text-white login-bg flex flex-col items-center lg:p-10 p-5">
        <div className=" w-full flex items-start justify-start h-[60px] ">
          <Image
            src={"/assets/img/logo.png"}
            alt=""
            width={500}
            height={500}
            className="w-[150px] h-auto"
          />
        </div>

        <div className="mt-14 xl:mt-16 2xl:mt-20 flex flex-col items-center justify-evenly gap-6 lg:w-4/5 xl:gap-8 2xl:gap-10 h-full w-full ">
          <span className="text-xl sm:text-2xl text-center font-semibold">
            Connect to Blendr
          </span>
        </div>
      </div>

      <div
        className={`w-full duration-500 lg:duration-0 z-[20] lg:static lg:w-1/2  2xl:w-7/12 bg-[#010102] backdrop-blur-sm  text-white flex flex-col lg:p-10 p-5
        }`}
      >
        <div className="mt-14 xl:mt-16 2xl:mt-20 flex flex-col items-center gap-6 xl:gap-8 2xl:gap-10 h-full w-full ">
          <span className="text-lg sm:text-xl text-center font-semibold ">
            Connect a Wallet
          </span>

          <div className="flex flex-col w-[80%] sm:w-2/3 2xl:w-1/2 gap-2 ">
            <span className="text-sm font-semibold text-[#A6A4AF]">
              Recommended
            </span>

            <button
              onClick={handleLoginWithMetamask}
              className="flex items-center text-sm font-semibold rounded-xl justify-between w-full py-4 px-5 bg-[#11141D] hover:bg-[#0F1D2E]"
            >
              <span>Connect Metamask</span>
              <Image
                src={"/assets/img/walletIcons/1.png"}
                alt=""
                width={100}
                height={100}
                className="w-[36px] h-[36px]"
              />
            </button>

            <button className="flex items-center text-sm font-semibold rounded-xl justify-between w-full py-4 px-5 bg-[#11141D] hover:bg-[#0F1D2E]">
              <span>Wallet Connect</span>
              <Image
                src={"/assets/img/walletIcons/4.png"}
                alt=""
                width={100}
                height={100}
                className="w-[36px] h-[36px]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
