"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RentedGpuCard from "@/components/cards/rentedGpuCard";
import Image from "next/image";
import { MainContainer } from "@/components/container/MainContainer";
import { fetchInstanceTypes } from "@/clientApi/aws";
import Link from "next/link";
import { geAllNodes } from "@/clientApi/node";

const RentedGpus = () => {
  const [gpus, setGpus] = useState<any[]>([]);
  const [activeGpus, setActiveGpus] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const resGpus = await geAllNodes();
        setGpus(resGpus);
        // setActiveGpus(resGpus.filter((node) => node.status === "busy"));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <MainContainer>
      <div className=" w-full mt-20 pt-8 px-5 sm:pt-0 sm:pb-10 sm:w-full sm:mt-8  sm:pl-[150px] sm:pr-5">
        <Tabs defaultValue="active" className=" ">
          <div className=" w-full flex flex-row items-start justify-between sm:items-center">
            <div className=" flex flex-col items-start justify-start gap-5 sm:flex sm:flex-row sm:items-center sm:justify-between sm:gap-5">
              <h2 className=" text-xl font-bold text-white md:text-2xl ">
                Rented GPUs
              </h2>
              <TabsList className=" model-toggle-btn w-[165px] h-[50px] rounded-[15px] p-[5px] gap-[5px] flex flex-row items-center justify-between">
                <TabsTrigger
                  value="active"
                  className=" text-white text-[15px] "
                >
                  Available
                </TabsTrigger>
                {/* <TabsTrigger
                  value="inactive"
                  className=" text-white text-[15px] "
                >
                  Active
                </TabsTrigger> */}
              </TabsList>
            </div>
            <Link
              href="/lending"
              className=" h-10 rounded-[88.21px] px-5 py-[15px] bg-[#6C95C0] flex flex-row items-center justify-center gap-[10px] "
              target="_blank"
            >
              <Image
                src="/assets/img/sidebar/microchip.png"
                width={500}
                height={500}
                alt="Picture of the author"
                className=" w-5 h-5"
              />
              <h3 className=" text-[15px] font-semibold text-white ">
                Add GPU
              </h3>
            </Link>
            {/* <a
              href="https://pypi.org/project/blendr-cli/"
              className=" h-10 rounded-[88.21px] px-5 py-[15px] bg-[#6C95C0] flex flex-row items-center justify-center gap-[10px] "
              target="_blank"
            >
              <Image
                src="/assets/img/sidebar/microchip.png"
                width={500}
                height={500}
                alt="Picture of the author"
                className=" w-5 h-5"
              />
              <h3 className=" text-[15px] font-semibold text-white ">
                Add GPU
              </h3>
            </a> */}
          </div>
          <TabsContent value="active" className=" text-white">
            <div className=" mt-10 flex flex-col items-center justify-center gap-[10px] md:grid md:grid-cols-2 md:items-stretch md:justify-center md:gap-[10px] 2xl:grid-cols-3  xl:items-stretch xl:justify-start xl:gap-[10px]">
              {gpus.length > 0 &&
                gpus.map((data) => (
                  <RentedGpuCard key={`available-${data.id}`} node={data} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="inactive" className=" text-white">
            <div className=" mt-10 flex flex-col items-center justify-center gap-[10px] md:grid md:grid-cols-2 md:items-stretch md:justify-center md:gap-[10px] xl:grid-cols-3 xl:items-stretch xl:justify-start xl:gap-[10px]">
              {activeGpus.length > 0 &&
                activeGpus.map((data, i) => (
                  <RentedGpuCard key={`active-${data.id}`} node={data} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainContainer>
  );
};

export default RentedGpus;
