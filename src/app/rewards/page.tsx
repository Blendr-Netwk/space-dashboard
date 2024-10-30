"use client"

import {
  claimReward,
  fetchTotalRewards,
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
import { useEffect, useState } from "react"

const Rewards = () => {
  const [rewards, setRewards] = useState<any[]>([])
  const [totalReward, setTotalReward] = useState<number>(0)

  const fetchRewards = async () => {
    try {
      const res: any = await fetchUserRewards()
      const total: any = await fetchTotalRewards()

      setRewards(res.data)
      setTotalReward(total.data)
    } catch (err) {
      console.log(err)
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

  useEffect(() => {
    fetchRewards()
  }, [])

  return (
    <MainContainer>
      <div className="w-full mt-20 pt-8 px-5 sm:p-0 sm:w-full sm:mt-8 sm:mx-4 sm:pl-[150px]">
        <div className="flex flex-row gap-16 items-center">
          <h2 className=" text-xl font-bold text-white md:text-2xl ">
            User Rewards: {totalReward}
          </h2>
          <button
            onClick={handleClaim}
            disabled={totalReward === 0}
            className={`flex justify-center items-center px-5 py-3 rounded-full text-white font-medium max-w-[20rem] text-lg uppercase w-full ${
              totalReward === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#6C95C0] hover:bg-[#4f7aa8]"
            }`}
          >
            Claim
          </button>
        </div>
        <div className="mt-6">
          <Table className=" w-full rounded-[20px] px-[30px] py-5 bg-[#11141d]">
            <TableHeader>
              <TableRow className="w-full mb-4 flex">
                <TableHead className=" text-[#A6A4AF] ">Name</TableHead>
                <TableHead className=" text-[#A6A4AF] ">
                  Accumulated Amount
                </TableHead>
                <TableHead className=" text-[#A6A4AF] ">
                  Claimed Amount
                </TableHead>
                <TableHead className=" text-[#A6A4AF]">Start Date</TableHead>
                <TableHead className="text-right text-[#A6A4AF]  ">
                  End Date
                </TableHead>
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
                        <span className="text-red-500">Invalid</span>
                      ) : reward.amount === reward.claimedAmount ? (
                        <span className="text-lime-500">Claimed</span>
                      ) : (
                        <span className="text-white">
                          {reward.claimedAmount}
                        </span>
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
      </div>
    </MainContainer>
  )
}

export default Rewards
