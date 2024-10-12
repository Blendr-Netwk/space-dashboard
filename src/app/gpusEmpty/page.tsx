import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MainContainer } from "@/components/container/MainContainer";

const GpusEmpty = () => {
  return (
    <MainContainer>
      <div className=" w-full mt-28 flex flex-col items-center justify-start gap-[30px]  sm:pl-[150px] sm:pr-5">
        <Image
          src="/assets/img/rent-gpu.png"
          width={500}
          height={500}
          alt="Picture of the author"
          className=" w-20 h-20"
        />
        <div className=" flex flex-col items-center justify-center gap-[5px] ">
          <h3 className=" text-[17px] text-white font-bold ">No GPU Rented</h3>
          <h5 className=" text-[13px] text-[#A6A4AF] font-medium ">
            You can rent a GPU.
          </h5>
        </div>
        <Link
          href="/rent-gpus"
          className=" bg-[#6C95C0] rounded-[62px] text-[13px] text-white font-semibold px-[30px] py-[10px] "
        >
          Rent GPU
        </Link>
      </div>
    </MainContainer>
  );
};

export default GpusEmpty;
