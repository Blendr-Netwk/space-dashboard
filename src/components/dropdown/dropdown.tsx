import React from "react";
import Image from "next/image";
import Link from "next/link";

const Dropdown = () => {
  return (
    <div className=" dropdown bg-[#11141D] absolute top-full left-0 w-[185px] rounded-xl z-10 py-[10px] ">
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {/* <Link href='./deployClusters' className=" h-10 px-4 pt-2 flex flex-row items-center justify-start gap-[10px] ">
                <Image
                    src='/assets/img/dropdown/cloud.png'
                    width={500}
                    height={500}
                    alt="Picture of the author"
                    className=' w-6 h-6'
                />
                <h3 className=" text-[15px] font-semibold text-white ">Cloud</h3>
            </Link> */}
        <Link
          href="/comingSoon"
          className=" h-10 px-4 pt-2 flex flex-row items-center justify-start gap-[10px] "
        >
          <Image
            src="/assets/img/dropdown/explorer.png"
            width={500}
            height={500}
            alt="Picture of the author"
            className=" w-6 h-6"
          />
          <h3 className=" text-[15px] font-semibold text-white ">Explorer</h3>
        </Link>
        {/* <Link href='' className=" h-10 px-4 pt-2 flex flex-row items-center justify-start gap-[10px] ">
                <Image
                    src='/assets/img/dropdown/worker.png'
                    width={500}
                    height={500}
                    alt="Picture of the author"
                    className=' w-6 h-6'
                />
                <h3 className=" text-[15px] font-semibold text-white ">Worker</h3>
            </Link> */}
        <Link
          href="https://blendr-network.gitbook.io/blendr-network-technical-plan-docs"
          className=" h-10 px-4 pt-2 flex flex-row items-center justify-start gap-[10px]"
        >
          <Image
            src="/assets/img/dropdown/docs.png"
            width={500}
            height={500}
            alt="Picture of the author"
            className=" w-6 h-6"
          />
          <h3 className=" text-[15px] font-semibold text-white ">Docs</h3>
        </Link>
        <Link
          href="./gpusEmpty"
          className=" h-10 px-4 pt-2 flex flex-row items-center justify-start gap-[10px] "
        >
          <Image
            src="/assets/img/dropdown/space.png"
            width={500}
            height={500}
            alt="Picture of the author"
            className=" w-6 h-6"
          />
          <h3 className=" text-[15px] font-semibold text-white ">Space</h3>
        </Link>
        <Link
          href="/comingSoon"
          className=" h-10 px-4 pt-2 flex flex-row items-center justify-start gap-[10px] "
        >
          <Image
            src="/assets/img/dropdown/render.png"
            width={500}
            height={500}
            alt="Picture of the author"
            className=" w-6 h-6"
          />
          <h3 className=" text-[15px] font-semibold text-white ">Render</h3>
        </Link>
        <Link
          href=""
          className=" h-10 px-4 pt-2 flex flex-row items-center justify-start gap-[10px] "
        >
          <Image
            src="/assets/img/dropdown/blendr.png"
            width={500}
            height={500}
            alt="Picture of the author"
            className=" w-6 h-6"
          />
          <h3 className=" text-[15px] font-semibold text-white ">blendr.ai</h3>
        </Link>
      </ul>
    </div>
  );
};

export default Dropdown;
