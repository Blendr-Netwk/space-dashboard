import { REWARD_ADDRESS, TOKEN_ADDRESS } from "@/constants/web3"
import { ethers } from "ethers"
import tokenABI from "@/data/erc20.json"
import rewardABI from "@/data/reward.json"
import { getSigner } from "../main"

export const getTokenContract = async () => {
  return new ethers.Contract(TOKEN_ADDRESS, tokenABI, await getSigner())
}

export const getRewardContract = async () => {
  return new ethers.Contract(REWARD_ADDRESS, rewardABI, await getSigner())
}
