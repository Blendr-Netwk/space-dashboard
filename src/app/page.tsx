"use client"

import { MainContainer } from "@/components/container/MainContainer"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push("/gpus")
  }, [router])

  return (
    <MainContainer>
      <></>
    </MainContainer>
  )
}
