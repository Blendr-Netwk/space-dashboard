"use client"

import { verifyUserCliSession } from "@/clientApi/auth"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

const VerifySection = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const sessionId = searchParams.get("sessionId")

  const [isLoading, setLoading] = useState<boolean>(false)
  const [isSuccess, setSuccess] = useState<boolean>(false)

  const handleVerify = async () => {
    try {
      setLoading(true)
      if (sessionId) {
        await verifyUserCliSession(sessionId)
        setSuccess(true)
      }
    } catch (err: any) {
      console.log(err)
      alert(err.message)
      setLoading(false)
    }
  }

  return (
    <div
      className="relative h-screen w-screen bg-center bg-cover"
      style={{ backgroundImage: "url('/assets/img/bg_verify.png" }}
    >
      <div className="absolute bottom-0 w-full">
        <Image
          src={"/assets/img/bg_verify_bottom.png"}
          alt=""
          width={1920}
          height={500}
          className="w-full h-auto"
        />
      </div>
      <div className="px-8 w-full flex flex-col items-center justify-center gap-20">
        {isSuccess ? (
          <div className="mt-52 w-full opacity-90 clusterDeploy-card flex flex-col text-center gap-4 px-14 py-10 rounded-2xl sm:4/5 md:w-3/5 lg:w-1/3 ">
            <h1 className="text-gray-500 text-xl font-semibold">woohoo.</h1>
            <h2 className="text-white text-2xl">Blendr CLI Login Successful</h2>
            <span className="text-gray-400 text-base">
              You are logged in to the Blendr Command-Line interface. You can
              immediately close this window and continue using the CLI.
            </span>
          </div>
        ) : (
          <>
            <div className="mt-52 w-full opacity-90 clusterDeploy-card flex flex-col items-center justify-center gap-10 px-14 py-10 rounded-2xl sm:4/5 md:w-3/5 lg:w-1/3 ">
              <h3 className=" text-xl text-white font-medium text-center">
                Login in to the Blendr CLI
              </h3>
              <button
                disabled={isLoading}
                onClick={handleVerify}
                className=" bg-[#6C95C0] rounded-[62px] text-[15px] text-white font-medium px-16 py-[10px] "
              >
                {isLoading ? "Verifying.." : "Verify"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default VerifySection
