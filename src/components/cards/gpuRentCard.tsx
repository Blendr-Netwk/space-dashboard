import { convertMbToGb } from "@/utils/math"
import Image from "next/image"
import React from "react"

type Props = {
  node: any
  handleSubmit: (instanceId: any) => void
}

const GpuRentCard: React.FC<Props> = ({ node, handleSubmit }) => {
  return (
    <div className=" w-full gpu-rent-card px-5 pt-[30px] pb-5 rounded-[20px] flex flex-col items-start justify-start gap-5 ">
      <div className=" flex flex-col items-start justify-start gap-[5px] ">
        <h3 className=" text-[15px] font-medium text-[#A6A4AF] ">
          {node.cpu.name}
        </h3>
        <h2 className=" text-2xl font-bold text-white ">{node.gpu.name}</h2>
      </div>
      <div className=" flex flex-col items-start justify-start gap-[5px] lg:w-full lg:flex-row">
        <div className=" flex flex-col items-start justify-start gap-[5px] lg:w-2/5">
          <div className=" w-full bg-alpha-1 py-[10px] pl-[5px] pr-[15px] rounded-[52px] flex flex-row items-center justify-center gap-[10px] ">
            <div className=" bg-alpha-1 w-[30px] h-[30px] rounded-[30px] flex items-center justify-center flex-shrink-0">
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
          <div className=" w-full bg-alpha-1 py-[10px] pl-[5px] pr-[15px] rounded-[52px] flex flex-row items-center justify-center gap-[10px] ">
            <div className=" bg-alpha-1 w-[30px] h-[30px] rounded-[30px] flex items-center justify-center flex-shrink-0">
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
              {node.cpu.total_cores} Cores
            </h3>
          </div>
        </div>
        <div className=" flex flex-col items-start justify-start gap-[5px] lg:w-3/5">
          <div className=" w-full bg-alpha-1 py-[10px] pl-[5px] pr-[15px] rounded-[52px] flex flex-row items-center justify-center gap-[10px] lg:justify-between lg:px-8 ">
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
          <div className=" w-full bg-alpha-1 py-[10px] pl-[5px] pr-[15px] rounded-[52px] flex flex-row items-center justify-center gap-[10px] lg:justify-between lg:px-8 ">
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
        </div>
      </div>
      <div className=" w-full flex items-center justify-between ">
        <div className=" flex flex-col items-start justify-start ">
          <h3 className=" text-[15px] font-medium text-[#A6A4AF] ">
            Price per hour
          </h3>
          <h3 className=" text-[15px] font-medium text-white">
            {node.price} BLENDR
          </h3>
        </div>
        <button
          onClick={() => handleSubmit(node)}
          className=" bg-[#6C95C0] px-[30px] py-[15px] rounded-[88.21px] text-[15px] font-semibold text-white "
        >
          Rent Now
        </button>
      </div>
    </div>
  )
}

export default GpuRentCard
