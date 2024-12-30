"use client"

import { getAddressByUserId } from "@/clientApi/auth"
import { rentGpu } from "@/clientApi/node"
import { useUser } from "@/providers/UserProvider"
import { getRentContract } from "@/service/ether/contract"
import { ethers } from "ethers"
import React, { useState } from "react"
import toast from "react-hot-toast"

interface Props {
  node: any
  handleRentGPU: () => void
}

const RentGpuConfirmModal: React.FC<Props> = ({ node, handleRentGPU }) => {
  const { user } = useUser()
  const [duration, setDuration] = useState<number>(0)
  const [status, setStatus] = useState<string>("idle")

  const handleConfirm = async () => {
    if (duration < 6) {
      toast.error("Minimum duration is 6 hours", { position: "top-right" })
      return
    }
    setStatus("processing")

    try {
      const contract = await getRentContract()
      const valueInWei = ethers.parseUnits(
        (node.price * duration).toString(),
        18
      )
      const user = await getAddressByUserId(node.ownerId)
      if (!user.publicAddress) return
      const tx = await contract.deposit(user.publicAddress, duration, {
        value: valueInWei,
      })
      const receipt = await tx.wait()

      const rentalId = receipt.logs
        .map((log: any) => {
          if (log.args) {
            return log.args[0]
          }
          return null
        })
        .find((id: any) => id !== null)

      const lended = await rentGpu({
        nodeId: node.id,
        rentalId: Number(rentalId),
        duration,
      })

      if (lended.success) {
        handleRentGPU()
        setStatus("completed")
      }
    } catch (err: any) {
      toast.error(err, {
        position: "top-right",
      })
      setStatus("idle")
    }
  }

  return (
    <div className=" bg-[#11141D] w-11/12 my-10 px-5 pt-[30px] pb-5 rounded-[20px] flex flex-col items-start justify-start gap-10 sm:w-9/12 md:3/5 lg:w-2/5 z-[9]">
      <div className=" flex flex-col items-start justify-start gap-[10px]">
        <h2 className=" text-2xl font-bold text-white ">
          Confirm Renting {node.gpu.name}
        </h2>
        <p className=" text-[#A6A4AF] text-[15px] font-medium ">
          Please fill the following details to rent this GPU.
        </p>
      </div>
      <div className=" w-full flex flex-col items-start justify-start gap-5 ">
        <label className=" relative w-full text-[15px] text-white font-medium ">
          <div className=" absolute px-[5px] w-[130px] h-[22px] bg-[#11141D] -top-[10px] left-[15px]">
            Duration (hour)
          </div>
          <input
            type="number"
            name="duration"
            placeholder="How many hours?"
            className=" setNode-input w-11/12 h-[50px] p-4 rounded-[10px] "
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
          />
        </label>
        <div className=" w-full flex flex-col items-end justify-end gap-5 text-white mt-5">
          <h1>Total Price:</h1>
          <p>
            {isNaN(node.price * duration)
              ? 0
              : (node.price * duration).toFixed(4)}{" "}
            BLENDR
          </p>
        </div>
      </div>

      {/* <div className=" w-full ssh-login pt-5 flex flex-col items-start justify-start gap-[25px] ">
        <div className=" flex flex-col items-start justify-start gap-[10px] ">
          {status === "completed" && (
            <>
              <h2 className=" text-xl font-semibold text-white ">SSH Logins</h2>
              <div className=" mt-2 mb-4 flex flex-col items-start justify-center gap-1">
                <p className=" text-[#bebcc5] text-[13px] font-medium pr-2">
                  Use the following command to access the GPU
                </p>
              </div>
              <div className="text-[#A6A4AF]">
                <code className=" w-11/12 mb-2">
                  ssh {user?.id}@{node.publicIp} -p ${node.port} -i /path/to/key
                </code>
              </div>
            </>
          )}
        </div>
      </div> */}

      <button
        className={`bg-[#6C95C0] rounded-[80px] w-full px-[30px] py-[11px] text-[15px] font-semibold text-white text-center bg-[#6C95C0]
        `}
        onClick={handleConfirm}
        disabled={status !== "idle"}
      >
        {status === "idle"
          ? "Confirm"
          : status === "processing"
          ? "Processing.."
          : "Completed"}
      </button>

      {/* {errorMsg && <div className="bg-[#bc5050] w-[100%] p-2 text-white text-center rounded-md">{errorMsg}</div>} */}

      {/* <button
        className={`bg-[#6C95C0] rounded-[80px] w-full px-[30px] py-[11px] text-[15px] font-semibold text-white text-center
        ${
          status === "idle"
            ? "bg-[#6C95C0]"
            : status === "creating"
            ? "bg-[#240a0a]"
            : status === "starting"
            ? "bg-[#2D2F3A]"
            : "bg-[#1d3249b0]"
        }
        `}
        onClick={handleConfirm}
        disabled={status !== "idle"}
      >
        {status === "idle"
          ? "Confirm"
          : status === "creating"
          ? "Creating..."
          : status === "starting"
          ? "Starting..."
          : "Instance Created!"}
      </button> */}
    </div>
  )
}

export default RentGpuConfirmModal
