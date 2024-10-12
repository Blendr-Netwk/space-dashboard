"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GpuRentCard from "@/components/cards/gpuRentCard";
import { MainContainer } from "@/components/container/MainContainer";
// import { geAllNodes } from "@/clientApi/node";
// import { fetchInstanceTypes, fetchMyInstances } from "@/clientApi/aws";
import RentGpuConfirmModal from "@/components/models/RentGpuConfirmModel/RentGpuConfirmModel";
import MyGpuRentedCard from "@/components/cards/myGpuRentedCard";
import { activeGpus } from "@/constants/tmp/spaceDetails";
import { geAllNodes } from "@/clientApi/node";
import RentedGpuCard from "@/components/cards/rentedGpuCard";

const RentGpus = () => {
  const [gpus, setGpus] = useState<any[]>([]);
  const [myActiveGpus, setMyActiveGpus] = useState<any[]>([]);
  const [myTerminatedGpus, setMyTerminatedGpus] = useState<any[]>([]);
  const [showConfirmModel, setShowConfirmModel] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string>("");
  // const [activeGpus, setActiveGpus] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const resGpus = await geAllNodes();

        // const resGpus = await fetchInstanceTypes();
        // resGpus.sort((a: any, b: any) => a.price - b.price);

        const availableGpus = resGpus.filter((node) => {
          return node.isConnected && node.status === "idle";
        });
        const activeGpus = resGpus.filter((node) => {
          return node.status === "lended";
        });

        setGpus(availableGpus);
        setMyActiveGpus(activeGpus);

        // const resMyGpus = await fetchMyInstances();
        // const activeGpus = resMyGpus.filter(
        //   (gpu: any) => gpu.status === "running"
        // );
        // const terminatedGpus = resMyGpus.filter(
        //   (gpu: any) => gpu.status === "terminated"
        // );
        // setMyActiveGpus(activeGpus);
        // setMyTerminatedGpus(terminatedGpus);
        // setActiveGpus(resGpus.filter((node) => node.status === "busy"));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleRentSubmit = async (node: any) => {
    try {
      console.log("Rent GPU");
      setSelectedNode(node);
      setShowConfirmModel(true);
      // const data = await createInstance({});
      //  console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainContainer>
      <div className=" w-full mt-20 pt-8 px-5 sm:p-0 sm:w-full sm:mt-8 sm:mx-4 sm:pl-[150px]">
        <Tabs defaultValue="available" className=" ">
          <div className=" w-full flex flex-row items-start justify-between sm:items-center">
            <div className=" flex flex-col items-start justify-start gap-5 sm:flex sm:flex-row sm:items-center sm:justify-between sm:gap-5">
              <h2 className=" text-xl font-bold text-white md:text-2xl ">
                Rent GPUs
              </h2>
              <TabsList className=" model-toggle-btn h-[50px] rounded-[15px] p-[5px] gap-[5px] flex flex-row items-center justify-between">
                <TabsTrigger
                  value="available"
                  className=" text-white text-[15px] "
                >
                  Available
                </TabsTrigger>
                <TabsTrigger
                  value="active"
                  className=" text-white text-[15px] "
                >
                  Active
                </TabsTrigger>
                {/* <TabsTrigger
                  value="terminated"
                  className=" text-white text-[15px] "
                >
                  Terminated
                </TabsTrigger> */}
              </TabsList>
            </div>
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
          <TabsContent value="available" className=" text-white">
            <div className="mt-10 flex flex-col items-center justify-center gap-[10px] md:grid md:grid-cols-2 md:items-stretch md:justify-center md:gap-[10px] xl:grid-cols-3 xl:items-stretch xl:justify-start xl:gap-[10px]">
              {gpus.map((data, i) => (
                <GpuRentCard
                  handleSubmit={handleRentSubmit}
                  key={i}
                  node={data}
                />
              ))}
            </div>
            {gpus.length <= 0 && (
              <div className="text-white flex justify-center items-center h-[60vh]">
                <h1>No Available Gpus</h1>
              </div>
            )}
          </TabsContent>
          <TabsContent value="active" className=" text-white">
            <div className=" mt-10 flex flex-col items-center justify-center gap-[10px] md:grid md:grid-cols-2 md:items-stretch md:justify-center md:gap-[10px] 2xl:grid-cols-3  xl:items-stretch xl:justify-start xl:gap-[10px]">
              {myActiveGpus.map((data, i) => {
                return (
                  <RentedGpuCard key={`available-${data.id}`} node={data} />
                  // <MyGpuRentedCard key={`${data._id}-${i}`} node={data} />
                );
              })}
            </div>
            {myActiveGpus.length <= 0 && (
              <div className="text-white flex justify-center items-center h-[60vh]">
                <h1>No Active Gpus</h1>
              </div>
            )}
          </TabsContent>
          <TabsContent value="terminated" className=" text-white">
            <div className=" mt-10 flex flex-col items-center justify-center gap-[10px] md:grid md:grid-cols-2 md:items-stretch md:justify-center md:gap-[10px] 2xl:grid-cols-3  xl:items-stretch xl:justify-start xl:gap-[10px]">
              {myTerminatedGpus.map((data, i) => {
                return <MyGpuRentedCard key={`${data._id}-${i}`} node={data} />;
              })}
            </div>
            {myTerminatedGpus.length <= 0 && (
              <div className="text-white flex justify-center items-center h-[60vh]">
                <h1>No Terminated Gpus</h1>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {showConfirmModel && (
          <div className="flex items-center justify-center inset-0 fixed">
            <RentGpuConfirmModal node={selectedNode} />

            <div
              className="z-[2] fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowConfirmModel(false)}
            ></div>
          </div>
        )}
      </div>
    </MainContainer>
  );
};

export default RentGpus;

// <Tabs defaultValue="all" className=" mt-8 sm:mt-[50px] ">
// <div className="  w-full flex flex-row items-center justify-between ">
//   <TabsList className=" model-toggle-btn w-[140px] h-[50px] rounded-[15px] p-[5px] gap-[5px] flex flex-row items-center justify-between md:w-[420px]">
//     <TabsTrigger
//       value="all"
//       className=" text-white text-[15px] px-[16px] py-[11px] lg:px-[30px] "
//     >
//       All
//     </TabsTrigger>
//     <TabsTrigger
//       value="24gb"
//       className=" text-white text-[15px] px-[16px] py-[11px] lg:px-[30px] "
//     >
//       24GB
//     </TabsTrigger>
//     <TabsTrigger
//       value="20gb"
//       className=" text-white text-[15px] px-[16px] py-[11px] lg:px-[30px] hidden md:flex "
//     >
//       20GB
//     </TabsTrigger>
//     <TabsTrigger
//       value="16gb"
//       className=" text-white text-[15px] px-[16px] py-[11px] lg:px-[30px] hidden md:flex"
//     >
//       16GB
//     </TabsTrigger>
//   </TabsList>
//   <Link
//     href=""
//     className=" bg-alpha p-[15px] rounded-[88.21px] flex items-center justify-center gap-[10px] "
//   >
//     <h3 className=" text-[15px] font-semibold text-white ">
//       Price per Hour
//     </h3>
//     <div className=" w-6 h-6 flex items-center justify-center ">
//       <Image
//         src="/assets/img/sidebar/icon.png"
//         width={500}
//         height={500}
//         alt="Picture of the author"
//         className=" w-[10px]"
//       />
//     </div>
//   </Link>
// </div>
// <TabsContent value="all" className=" text-white">
//   <div className=" mt-10 flex flex-col items-center justify-center gap-[10px] md:grid md:grid-cols-2 md:items-stretch md:justify-center xl:grid-cols-3">
//     {gpus.map((data, i) => (
//       <GpuRentCard
//         handleSubmit={handleRentSubmit}
//         key={i}
//         {...data}
//       />
//     ))}
//   </div>
// </TabsContent>
// <TabsContent value="24gb" className=" text-white"></TabsContent>
// </Tabs>
