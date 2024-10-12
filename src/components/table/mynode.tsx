"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchMyNodes } from "@/clientApi/node";

const MyNodeTable: React.FC<{ myNodes: any[] }> = ({ myNodes }) => {
  return (
    <div className=" md:col-span-4 lg:col-span-5 ">
      <Table className=" w-full bg-[#11141D] rounded-[20px] px-[30px] py-5 ">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-[#A6A4AF]">Name</TableHead>
            <TableHead className=" text-[#A6A4AF] ">GPU</TableHead>
            <TableHead className=" text-[#A6A4AF] ">CPU</TableHead>
            <TableHead className=" text-[#A6A4AF] ">Price</TableHead>
            <TableHead className="text-right text-[#A6A4AF] ">
              Created At
            </TableHead>
            <TableHead className="text-right text-[#A6A4AF] ">
              Approved
            </TableHead>
            <TableHead className="text-right text-[#A6A4AF] ">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {myNodes.length === 0 && (
            <TableRow className="text-center w-full flex items-center justify-center">
              <TableCell
                colSpan={12}
                className="text-center justify-center opacity-50 pt-6 p-4 !h-20"
              >
                No active nodes
              </TableCell>
            </TableRow>
          )}

          {myNodes.map((node) => (
            <TableRow key={node.id} className=" border-nones">
              <TableCell className="font-medium">{node.name}</TableCell>
              <TableCell className="font-medium">{node.gpu.name}</TableCell>
              <TableCell>{node.cpu.model}</TableCell>
              <TableCell>{node.price}</TableCell>
              <TableCell>{new Date(node.createdAt).toLocaleString()}</TableCell>
              <TableCell className="text-right">Approved</TableCell>

              <TableCell
                className="text-right flex items-center gap-3"
                style={{ color: "A8FF77" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="14" height="14" rx="7" fill={"A8FF77"} />
                  <rect
                    x="5"
                    y="5"
                    width="4"
                    height="4"
                    rx="2"
                    fill="#11141D"
                  />
                </svg>
                {node.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyNodeTable;
