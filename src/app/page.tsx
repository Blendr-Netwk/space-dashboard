"use client";
import Image from "next/image";
import Link from "next/link";
import { MainContainer } from "@/components/container/MainContainer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    //   (async () => {
    //     try {
    //       const token = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
    //       if (!token) {
    //         router.push("/login");
    //         return;
    //       }
    //       setToken(token);
    //       await getAuthenticatedUser();
    //     } catch (err) {
    //       localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    router.push("/gpus");
    //     }
    //   })();
  }, []);

  return (
    <MainContainer>
      <div className=" w-full mt-28 flex flex-col items-center justify-start gap-[30px]  ">
        {/* <Image
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
          href="./rentGpus"
          className=" bg-[#6C95C0] rounded-[62px] text-[13px] text-white font-semibold px-[30px] py-[10px] "
        >
          Rent GPU
        </Link> */}
      </div>
    </MainContainer>
  );
}
