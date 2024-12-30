"use client"

import { useUser } from "@/providers/UserProvider"
import React, { useState } from "react"
import toast from "react-hot-toast"

interface Props {
  node: any
  handleCancel: () => void
}

const CancelRentConfirmModal: React.FC<Props> = ({ node, handleCancel }) => {
  const { user } = useUser()
  const [duration, setDuration] = useState<number>(0)
  const [status, setStatus] = useState<string>("idle")

  const handleConfirm = async () => {
    try {
      setStatus("processing")

      // call contract

      // contract success call api

      // const lended = await rentRefund({
      //   nodeId: node.id,
      // })

      // if (lended.success) {
      //   handleCancel()
      //   setStatus("completed")
      // }
    } catch (err: any) {
      toast.error(err.response.data.message, {
        position: "top-right",
      })
      setStatus("idle")
    }
  }

  return (
    <div className=" bg-[#11141D] w-11/12 my-10 px-5 pt-[30px] pb-5 rounded-[20px] flex flex-col items-start justify-start gap-10 sm:w-9/12 md:3/5 lg:w-2/5 z-[9]">
      <div className=" flex flex-col items-start justify-start gap-[10px]">
        <h2 className=" text-2xl font-bold text-white ">
          Confirm Cancel Renting <br /> {node.gpu.name}
        </h2>
        <p className=" text-[#A6A4AF] text-[15px] font-medium ">
          You may be eligible for a refund.
        </p>
      </div>

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
    </div>
  )
}

export default CancelRentConfirmModal
