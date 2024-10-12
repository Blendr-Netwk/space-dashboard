"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyUserCliSession } from "@/clientApi/auth";

const VerifySection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("sessionId");

  const [isLoading, setLoading] = useState<boolean>(false);

  const handleVerify = async () => {
    try {
      setLoading(true);
      if (sessionId) {
        await verifyUserCliSession(sessionId);
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className=" mt-20 px-8 w-full flex flex-col items-center justify-center gap-20">
      <div>
        <Image
          src={"/assets/img/logo.png"}
          alt=""
          width={500}
          height={500}
          className="w-[150px] h-auto"
        />
      </div>
      <div className=" w-full clusterDeploy-card flex flex-col items-center justify-center gap-10 px-14 py-10 rounded-2xl sm:4/5 md:w-3/5 lg:w-1/3 ">
        <h3 className=" text-xl text-white font-medium text-center">
          Login in to the Blendr CLI
        </h3>
        <button
          disabled={isLoading}
          onClick={handleVerify}
          className=" bg-[#6C95C0] rounded-[62px] text-[15px] text-white font-medium px-16 py-[10px] "
        >
          {isLoading ? "Verifying.." : "Verify"}
        </button>
      </div>
    </div>
  );
};

export default VerifySection;
