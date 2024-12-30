"use client"

import {
  claimReward,
  fetchTotalRewards,
  fetchUserNodeRewards,
  fetchUserRewards,
} from "@/clientApi/reward"
import { MainContainer } from "@/components/container/MainContainer"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getRewardContract } from "@/service/ether/contract"
import { ethers } from "ethers"
import Image from "next/image"
import { useEffect, useState } from "react"

interface totalReward {
  claimedAmount: number
  estimateToClaim: number
  amountToClaim: number
}

const Rewards = () => {
  const [rewards, setRewards] = useState<any[]>([])
  const [totalReward, setTotalReward] = useState<totalReward>({
    claimedAmount: 0,
    estimateToClaim: 0,
    amountToClaim: 0,
  })
  const [nodes, setNodes] = useState<any[]>([])

  const fetchRewards = async () => {
    try {
      const [
        userRewardsResponse,
        userNodeRewardsResponse,
        totalRewardsResponse,
      ]: any = await Promise.all([
        fetchUserRewards(),
        fetchUserNodeRewards(),
        fetchTotalRewards(),
      ])

      setRewards(userRewardsResponse.data)
      setNodes(userNodeRewardsResponse.data)
      setTotalReward(totalRewardsResponse.data)
    } catch (error) {
      console.error("An error occurred while fetching rewards:", error)
    }
  }

  const handleClaim = async () => {
    if (!totalReward) return

    try {
      const res: any = await claimReward()
      const { amount, nonce, timestamp, signature } = res.data
      const amountInWei = ethers.parseUnits(amount.toString(), 18)

      const rewardContract = await getRewardContract()
      const tx = await rewardContract.claimReward(
        amountInWei,
        nonce,
        timestamp,
        signature,
        {
          gasLimit: 300000,
        }
      )
      await tx.wait()
      fetchRewards()
    } catch {
      console.error("Error claiming reward")
    }
  }

  const formattedDate = (date: Date) =>
    new Date(date).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })

  useEffect(() => {
    fetchRewards()
  }, [])

  return (
    <MainContainer>
      <div className="w-full mt-20 pt-8 px-5 sm:p-0 sm:w-full sm:mt-8 sm:mx-4 sm:pl-[150px]">
        <h2 className="text-xl text-white md:text-2xl ">Claims</h2>
        <div className="mt-12 flex flex-col sm:flex-row gap-8 sm:gap-16 items-start sm:items-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-gray-400">Total Claimed</h1>
            <div className="flex flex-row gap-2 items-end">
              <span className="text-3xl text-white">
                {totalReward.claimedAmount}
              </span>
              <span className="text-xl text-white">BLENDR</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-gray-400">Est. Claim</span>
            <div className="flex flex-row gap-2 items-end">
              <span className="text-3xl text-gray-600">
                {totalReward.estimateToClaim}
              </span>
              <span className="text-xl text-gray-600">BLENDR</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-gray-400">Available to Claim</span>
            <div className="flex flex-row gap-2 items-end">
              <span className="text-3xl text-white">
                {totalReward.amountToClaim}
              </span>
              <span className="text-xl text-white">BLENDR</span>
            </div>
          </div>
          <button
            onClick={handleClaim}
            disabled={totalReward.amountToClaim === 0}
            className={`flex justify-center items-center h-10 px-5 py-3 rounded-full text-white text-base w-40 ${
              totalReward.amountToClaim === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#6C95C0] hover:bg-[#4f7aa8]"
            }`}
          >
            Claim
          </button>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {nodes &&
            nodes.map((node, i) => (
              <div
                key={`node${i}`}
                className="flex flex-col gap-4 border border-gray-600 rounded-[1rem] px-4 py-6"
              >
                <div className=" flex flex-row items-center justify-start gap-4">
                  <Image
                    src="/assets/img/tick-circle.svg"
                    width={500}
                    height={500}
                    alt="Picture of the author"
                    className={`w-[1rem] h-[1rem] ${
                      node.isConnected ? "grayscale-0" : "grayscale"
                    }`}
                  />
                  <p className="text-sm text-gray-600 uppercase">
                    {node.isConnected ? "Active Renter" : "Inactive Renter"}
                  </p>
                </div>
                <span className="text-white text-2xl">{node.name}</span>
                <div className="mt-2 flex flex-row justify-between items-center">
                  <span className="text-gray-400">Accumulated Reward</span>
                  <span className="text-white text-sm text-right">
                    {node.totalRewardAmount
                      ? `${node.totalRewardAmount} BLENDR`
                      : "-"}
                  </span>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <span className="text-gray-400">Start Time</span>
                  <span className="text-white text-sm text-right">
                    {node.startDate ? formattedDate(node.startDate) : "-"}
                  </span>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <span className="text-gray-400">Min. Retention Preiod</span>
                  <span className="text-white text-sm text-right">
                    {node.lendPeriod
                      ? `Until ${formattedDate(node.lendPeriod)}`
                      : "-"}
                  </span>
                </div>
                <div className="mt-2 flex flex-row justify-between items-center">
                  <span className="text-gray-400">Penalty Charge</span>
                  <span className="text-red-600 text-right">
                    {node.totalPenaltyAmount
                      ? `${node.totalPenaltyAmount} BLENDR`
                      : "-"}
                  </span>
                </div>
              </div>
            ))}
        </div>
        <Table className="mt-6 max-w-full rounded-[20px] px-[30px] py-5 bg-[#11141d]">
          <TableHeader>
            <TableRow className="w-full mb-4 flex text-white">
              <TableHead>Name</TableHead>
              <TableHead>Accumulated Amount</TableHead>
              <TableHead>Claim Amount</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rewards.length === 0 && (
              <TableRow className="text-center w-full flex items-center justify-center">
                <TableCell
                  colSpan={12}
                  className="text-center text-white flex justify-center h-20"
                >
                  No Rewards
                </TableCell>
              </TableRow>
            )}

            {rewards &&
              rewards.map((reward) => (
                <TableRow key={reward.id} className="rounded-lg mb-2">
                  <TableCell className="font-medium text-white table-border">
                    {reward.node.name}
                  </TableCell>
                  <TableCell className="font-medium text-white table-border">
                    {reward.amount}
                  </TableCell>
                  <TableCell className="font-medium table-border">
                    {reward.amount === 0 ? (
                      <span className="text-red-600">Invalid</span>
                    ) : reward.amount === reward.claimedAmount ? (
                      <span className="text-lime-400">Claimed</span>
                    ) : (
                      <span className="text-white">{reward.claimedAmount}</span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-white table-border">
                    {new Date(reward.startDate).toLocaleString()}
                  </TableCell>
                  <TableCell className="font-medium text-white table-border">
                    {reward.endDate
                      ? new Date(reward.endDate).toLocaleString()
                      : ""}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </MainContainer>
  )
}

export default Rewards
