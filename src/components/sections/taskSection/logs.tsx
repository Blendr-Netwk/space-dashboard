"use client";

import { fetchLogs } from "@/clientApi/node";
import { useEffect, useState } from "react";

export const LogsComponent: React.FC<{ taskId: string }> = ({ taskId }) => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const getLogs = async () => {
      if (taskId) {
        try {
          const resData = await fetchLogs(taskId);
          setLogs(resData.logs); // Update the logs state with the new logs
        } catch (error) {
          console.error("Failed to fetch logs:", error);
        }
      }
    };

    // Fetch logs every 2 seconds
    const interval = setInterval(() => {
      getLogs();
    }, 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [taskId]);

  return (
    <div className=" mx-4 mb-10 bg-[#11141D] rounded-[20px] p-5 lg:mt-20 col-span-9 lg:col-span-3">
      <h3 className=" text-lg font-bold text-white mb-4 text-center">Logs</h3>
 {logs.length === 0 && (
  <span className="flex items-center justify-center w-full h-full text-white p-4 opacity-50 text-sm">
    No Logs
  </span>
 )}
      {logs &&
        logs.map((log, index) => {
          return (
            <div
              key={`logs_${index}`}
              className=" node-details w-full h-[50px] flex items-center  "
            >
              <h3 className=" text-[12px] font-medium text-white ">
                {new Date(log.timestamp).toLocaleString()}
              </h3>
              <p className=" text-[12px] font-medium text-[#7493FF] pl-2">
                {log.message}
              </p>
            </div>
          );
        })}
    </div>
  );
};
