"use client";
import React, { useEffect, useState } from "react";
import MyNodeTable from "../table/mynode";
import { fetchMyNodes } from "@/clientApi/node";

const MyNodesCard = () => {
  const [myNodes, setMyNodes] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const resNodes = await fetchMyNodes();
        setMyNodes(resNodes);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className=" w-full mt-[30px] grid grid-cols-1 items-center justify-center gap-10 md:grid md:grid-cols-7 md:items-start md:justify-between lg:gap-10">
      <MyNodeTable myNodes={myNodes} />
      <div className=" bg-[#11141D] rounded-[20px] p-5 md:col-span-3 lg:col-span-2">
        <div className=" node-details w-full h-[50px] flex items-center justify-between ">
          <h3 className=" text-[13px] font-medium text-white ">
            Approved Nodes
          </h3>
          <h3 className=" text-[13px] font-medium text-[#7493FF] ">
            {myNodes.length}
          </h3>
        </div>
        <div className=" node-details w-full h-[50px] flex items-center justify-between ">
          <h3 className=" text-[13px] font-medium text-white ">Total Nodes</h3>
          <h3 className=" text-[13px] font-medium text-[#7493FF] ">
            {myNodes.length}
          </h3>
        </div>
        <div className=" node-details w-full h-[50px] flex items-center justify-between ">
          <h3 className=" text-[13px] font-medium text-white ">Total earn</h3>
          <h3 className=" text-[13px] font-medium text-[#7493FF] ">
            0.00 Credits
          </h3>
        </div>
        {/* <div className=" node-details w-full h-[50px] flex items-center justify-between ">
          <h3 className=" text-[13px] font-medium text-white ">Past Dispute</h3>
          <h3 className=" text-[13px] font-medium text-[#7493FF] ">
            0.000000 ETH
          </h3>
        </div>
        <div className=" node-details w-full h-[50px] flex items-center justify-between ">
          <h3 className=" text-[13px] font-medium text-white ">
            Active Estimated Payout
          </h3>
          <h3 className=" text-[13px] font-medium text-[#A6A4AF] ">
            0.000000 ETH
          </h3>
        </div>
        <div className=" w-full h-[50px] flex items-center justify-between ">
          <h3 className=" text-[13px] font-medium text-white ">
            Active Estimated Dispute
          </h3>
          <h3 className=" text-[13px] font-medium text-[#A6A4AF] ">
            0.000000 ETH
          </h3>
        </div> */}
      </div>
    </div>
  );
};

export default MyNodesCard;