import { convertMbToGb } from "@/utils/math"
import Image from "next/image"
import React, { useState } from "react"
import CancelRentConfirmModal from "../models/RentGpuConfirmModel/CancelRentConfirmModel"

interface Props {
  showCancel: boolean
  node: any
  handleRefresh: () => void
}

const RentedGpuCard: React.FC<Props> = ({ showCancel, node, handleRefresh }) => {
  const [showConfirmModel, setShowConfirmModel] = useState(false)

  const handleCancel = async () => {
    setShowConfirmModel(false)
    handleRefresh()
  }

  return (
    <div className=" w-full bg-[#11141D] px-5 pt-[30px] pb-5 rounded-[20px] flex flex-col items-start justify-start gap-[30px] sm:w-4/5 md:w-full ">
      <div className=" w-full flex flex-col items-start justify-start gap-5 ">
        <div className=" w-full flex flex-row items-center justify-between ">
          <div className=" flex flex-row items-center justify-start gap-[5px]">
            <Image
              src="/assets/img/running-icon.png"
              width={500}
              height={500}
              alt="Picture of the author"
              className=" w-[14px] h-[14px]"
            />
            <p className=" text-[15px] text-[#A8FF77] font-medium">
              Active Rental
            </p>
          </div>
          {/* <div className=" w-6 h-6 flex items-center justify-center ">
            <Image
              src="/assets/img/more-btn.png"
              width={500}
              height={500}
              alt="Picture of the author"
              className=" w-[3px]"
            />
          </div> */}
        </div>
        <div className=" flex flex-col items-start justify-start gap-[5px] ">
          <h3 className=" text-[15px] font-medium text-[#A6A4AF] ">
            {node.cpu.name}
          </h3>
          <h2 className=" text-2xl font-bold text-white">{node.gpu.name}</h2>
        </div>
      </div>
      <div className=" w-full flex flex-col items-start justify-center gap-[5px] md:flex md:flex-col md:items-stretch md:justify-start md:gap-[5px] lg:w-full lg:flex-row xl:flex xl:flex-row xl:items-stretch xl:justify-start ">
        <div className=" w-full flex flex-row items-start justify-start md:flex-col gap-[5px] lg:w-2/5 lg:flex lg:flex-col lg:items-start lg:justify-start lg:gap-[5px] xl:flex xl:flex-col xl:items-start xl:justify-start">
          <div className=" w-full bg-alpha-1 py-[10px] pl-[5px] pr-[15px] rounded-[52px] flex flex-row items-center justify-center gap-[10px]">
            <div className=" bg-alpha-1 w-[30px] h-[30px] rounded-[30px] flex items-center justify-center ">
              <Image
                src="/assets/img/testa-icon.png"
                width={500}
                height={500}
                alt="Picture of the author"
                className=" w-[18px] h-3"
              />
            </div>
            <h3 className=" text-[15px] font-medium text-[#A6A4AF] ">GPU</h3>
            <h3 className=" text-[15px] font-medium text-white text-nowrap">
              {convertMbToGb(node.gpu.total_memory_mb)} GB
            </h3>
          </div>
          <div className=" w-full bg-alpha-1 py-[10px] pl-[5px] pr-[15px] rounded-[52px] flex flex-row items-center justify-center gap-[10px]">
            <div className=" bg-alpha-1 w-[30px] h-[30px] rounded-[30px] flex items-center justify-center ">
              <Image
                src="/assets/img/intel.png"
                width={500}
                height={500}
                alt="Picture of the author"
                className=" w-4 h-[6.21px]"
              />
            </div>
            <h3 className=" text-[15px] font-medium text-[#A6A4AF] ">CPU</h3>
            <h3 className=" text-[15px] font-medium text-white text-nowrap">
              {node.cpu.total_cores} CORES
            </h3>
          </div>
        </div>
        <div className=" w-full flex flex-col items-end justify-start gap-[5px] lg:w-3/5 xl:flex xl:flex-col xl:items-end xl:justify-center">
          <div className=" w-full bg-alpha-1 py-[10px] pl-[5px] pr-[15px] rounded-[52px] flex flex-row items-center justify-center gap-[10px]">
            <Image
              src="/assets/img/arrowUp.png"
              width={500}
              height={500}
              alt="Picture of the author"
              className=" w-[30px] h-[30px]"
            />
            <h3 className=" w-[98px] text-[15px] font-medium text-[#A6A4AF] ">
              Upload
            </h3>
            <h3 className=" text-[15px] font-medium text-white text-nowrap">
              {node.network.upload_speed_mbps.toFixed(0)} MB
            </h3>
          </div>
          <div className=" w-full bg-alpha-1 py-[10px] pl-[5px] pr-[15px] rounded-[52px] flex flex-row items-center justify-center gap-[10px]">
            <Image
              src="/assets/img/arrowdown.png"
              width={500}
              height={500}
              alt="Picture of the author"
              className=" w-[30px] h-[30px]"
            />
            <h3 className=" w-[98px] text-[15px] font-medium text-[#A6A4AF] ">
              Download
            </h3>
            <h3 className=" text-[15px] font-medium text-white text-nowrap">
              {node.network.download_speed_mbps.toFixed(0)} MB
            </h3>
          </div>

          {showCancel && (
            <button
              onClick={() => setShowConfirmModel(true)}
              className=" bg-[#6C95C0] px-[30px] py-[15px] rounded-[88.21px] text-[15px] font-semibold text-white "
            >
              Cancel Rent
            </button>
          )}
        </div>
      </div>

      {showConfirmModel && (
        <div className="flex items-center justify-center inset-0 fixed">
          <CancelRentConfirmModal node={node} handleCancel={handleCancel} />

          <div
            className="z-[2] fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowConfirmModel(false)}
          ></div>
        </div>
      )}
    </div>
  )
}

export default RentedGpuCard
