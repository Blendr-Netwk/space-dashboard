"use client"

import { rentClaim } from "@/clientApi/node"
import MyNodesCard from "@/components/cards/myNodesCard"
import { MainContainer } from "@/components/container/MainContainer"
import MyRentalNodesTable from "@/components/table/rental-nodes"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getRentContract } from "@/service/ether/contract"
import { ethers } from "ethers"
import Image from "next/image"
import { useEffect, useState } from "react"

const Lending = () => {
  const [amount, setAmount] = useState(0)

  const fetchRentClaim = async () => {
    const res: any = await rentClaim()
    setAmount(res.data !== 0 ? res.data.amount : 0)
  }

  const handleClaim = async () => {
    if (!amount) return

    try {
      const res: any = await rentClaim()
      const { amount, nonce, timestamp, signature } = res.data
      const amountInWei = ethers.parseUnits(amount.toString(), 18)
      const contract = await getRentContract()
      const tx = await contract.claim(
        amountInWei,
        nonce,
        timestamp,
        signature,
        {
          gasLimit: 300000,
        }
      )
      await tx.wait()
      fetchRentClaim()
    } catch {
      console.error("Error claiming")
    }
  }

  useEffect(() => {
    fetchRentClaim()
  }, [])

  return (
    <MainContainer>
      <div className=" w-full px-8 my-20 sm:my-8 sm:pl-[150px] sm:pr-5">
        <Tabs defaultValue="my-nodes">
          <div className=" flex flex-col items-start justify-between gap-4 sm:w-full sm:flex-row sm:items-center sm:justify-between ">
            <div className="flex flex-row items-center justify-between gap-[10px] sm:gap-5 sm:flex-row sm:items-center ">
              <h2 className=" text-xl font-bold text-white sm:text-2xl ">
                Lending
              </h2>
              <TabsList className=" mt-4 model-toggle-btn w-[170px] h-11 rounded-[10px] p-[5px] gap-[5px] flex flex-row items-center justify-between sm:w-[176px] sm:h-[50px] sm:rounded-[15px]">
                <TabsTrigger
                  value="my-nodes"
                  className=" text-white text-xs p-[11px] "
                >
                  My Nodes
                </TabsTrigger>
                <TabsTrigger
                  value="rentals"
                  className=" text-white text-xs p-[11px] "
                >
                  Rentals
                </TabsTrigger>
              </TabsList>
            </div>
            <div className=" w-full flex items-center justify-start sm:justify-end  gap-4">
              <button
                onClick={() => handleClaim()}
                disabled={amount === 0}
                className={`flex justify-center items-center h-10 px-5 py-3 rounded-full text-white text-base w-40 ${
                  amount === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#6C95C0] hover:bg-[#4f7aa8]"
                }`}
              >
                Claim
              </button>
              <a
                className=" h-10 rounded-[88.21px] px-5 py-[15px] bg-[#6C95C0] flex flex-row items-center justify-center gap-[10px] "
                href="https://github.com/Blendr-Netwk/blendr-cli"
                target="_blank"
              >
                <Image
                  src="/assets/img/sidebar/microchip.png"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                  className=" w-5 h-5"
                />
                <h3 className=" text-xs font-light lg:text-[15px] lg:font-semibold text-white ">
                  Setup your Node
                </h3>
              </a>
            </div>
          </div>

          <TabsContent value="my-nodes" className=" text-white">
            <MyNodesCard amount={amount} />
          </TabsContent>
          <TabsContent value="rentals" className=" text-white">
            <div className=" w-full mt-[30px] grid grid-cols-1 items-center justify-center gap-10 md:grid md:grid-cols-7 md:items-start md:justify-between lg:gap-10">
              <MyRentalNodesTable />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainContainer>
  )
}

export default Lending
