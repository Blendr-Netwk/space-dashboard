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
      const rewardContract = await getRewardContract()
      const tx = await rewardContract.claimReward(
        amount,
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
      <div className=" w-full mt-20 pt-8 px-5 sm:p-0 sm:w-full sm:mt-8 sm:mx-4 sm:pl-[150px]">
        <div className="flex flex-row gap-16 items-center">
          <h2 className=" text-xl font-bold text-white md:text-2xl ">
            User Rewards: {totalReward}
          </h2>
          <button
            onClick={handleClaim}
            className="py-4 text-sm flex justify-center items-center bg-[#6C95C0] w-[16rem] rounded-full hover:bg-[#4f7aa8]"
          >
            Claim
          </button>
        </div>
        <div className="mt-6">
          <Table className=" w-full rounded-[20px] px-[30px] py-5 bg-[#11141d]">
            <TableHeader>
              <TableRow className="w-full mb-4 flex">
                <TableHead className=" text-[#A6A4AF] ">Amount</TableHead>
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
              {!rewards && (
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
                      {reward.amount}
                    </TableCell>
                    <TableCell className="font-medium text-white table-border">
                      {reward.claimedAmount}
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
