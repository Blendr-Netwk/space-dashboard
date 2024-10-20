"use client";
import { getAuthenticatedUser } from "@/clientApi/auth";
import { LOCAL_STORAGE_AUTH_KEY } from "@/constants/app";
import { loginUser } from "@/controller";
import { setAxiosJwtToken } from "@/service/axios";
import { connectWallet } from "@/service/ether";
import { CONNECT_WALLET_TYPES } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSearchParams } from "next/navigation"

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("sessionId")
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const handleMenuOpen = () => {
    setMenuOpen((pre) => !pre);
  };

  const handleLoginWithMetamask = async () => {
    try {
      const res = await loginUser(CONNECT_WALLET_TYPES.METAMASK);
      if (res) {
        localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, res);
        if (sessionId)
          router.push(`/verify?sessionId=${sessionId}`)
        else
          router.push("/");
      }
    } catch (error: any) {
      console.log("err : ", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
        if (token) {
          setAxiosJwtToken(token);
          const user = await getAuthenticatedUser();
          if (!user) return

          if (sessionId)
            router.push(`/verify?sessionId=${sessionId}`)
          else
            router.push("/")
        }
      } catch (err) {
        localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
      }
    })();
  }, []);

  return (
    <div className=" min-h-screen h-screen bg-[#000] flex lg:items-stretch flex-col items-center justify-start lg:flex-row">
      {/* <div className=" min-h-screen h-full bg-[#000] flex lg:items-stretch flex-row relative"> */}
      <div className=" w-full h-2/4 lg:w-1/2 2xl:w-5/12 lg:h-auto text-white login-bg flex flex-col items-center lg:p-10 p-5">
        {/* <div className=" h-screen w-full lg:w-1/2 2xl:w-5/12 lg:h-auto text-white login-bg flex flex-col items-center lg:p-10 p-5"> */}
        <div className=" w-full flex items-start justify-start h-[60px] ">
          <Image
            src={"/assets/img/logo.png"}
            alt=""
            width={500}
            height={500}
            className="w-[150px] h-auto"
          />
        </div>

        <div className="mt-14 xl:mt-16 2xl:mt-20 flex flex-col items-center justify-evenly gap-6 lg:w-4/5 xl:gap-8 2xl:gap-10 h-full w-full ">
          <span className="text-xl sm:text-2xl text-center font-semibold">
            Connect to Blendr
          </span>
          {/* <div className="w-full flex flex-col items-center justify-center gap-5">
            <Image
              src={"/assets/img/wallet-1.png"}
              alt=""
              width={400}
              height={400}
              className="w-[75px] h-[75px]"
            />

            <div className="flex flex-col items-center gap-2  w-[90%]">
              <span className="text-center text-base sm:text-lg font-semibold">
                A Home for your Digital Assets
              </span>
              <span className="text-center text-xs sm:text-sm font-semibold text-[#A6A4AF]">
                Wallets are used to send, receive, store, and display digital
                assets like Ethereum and NFTs
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-5">
            <Image
              src={"/assets/img/wallet-2.png"}
              alt=""
              width={400}
              height={400}
              className="w-[75px] h-[75px]"
            />

            <div className="flex flex-col items-center gap-2  w-[90%]">
              <span className="text-center text-base sm:text-lg font-semibold">
                A New Way to Log In
              </span>
              <span className="text-center text-xs sm:text-sm font-semibold text-[#A6A4AF]">
                Instead of creating new accounts and passwords on every website,
                just connect your wallet
              </span>
            </div>
          </div> */}
          {/* <div className="flex flex-col items-center gap-2 w-[90%] sm:w-[80%]">
            <button
              onClick={handleMenuOpen}
              className="py-4 text-sm flex justify-center items-center bg-[#6C95C0] w-full rounded-full hover:bg-[#4f7aa8]"
            >
              Get a wallet
            </button>
          </div> */}
        </div>
      </div>

      <div
        className={`w-full duration-500 lg:duration-0 z-[20] lg:static lg:w-1/2  2xl:w-7/12 bg-[#010102] backdrop-blur-sm  text-white flex flex-col lg:p-10 p-5
        }`}
      >
        {/* <div
        className={`w-full absolute top-0 duration-500 lg:duration-0 z-[20]  lg:static lg:w-1/2  2xl:w-7/12 bg-[#010102] backdrop-blur-sm  text-white flex flex-col lg:p-10 p-5  h-full ${
          isMenuOpen ? "left-0" : "left-[-1200px]"
        }`}
      > */}
        {/* <div className="flex h-[50px] justify-end">
          <IoMdClose
            onClick={handleMenuOpen}
            className="text-white text-2xl cursor-pointer lg:hidden hover:scale-105"
          />
        </div> */}

        <div className="mt-14 xl:mt-16 2xl:mt-20 flex flex-col items-center gap-6 xl:gap-8 2xl:gap-10 h-full w-full ">
          <span className="text-lg sm:text-xl text-center font-semibold ">
            Connect a Wallet
          </span>

          <div className="flex flex-col w-[80%] sm:w-2/3 2xl:w-1/2 gap-2 ">
            <span className="text-sm font-semibold text-[#A6A4AF]">
              Recommended
            </span>

            <button
              onClick={handleLoginWithMetamask}
              className="flex items-center text-sm font-semibold rounded-xl justify-between w-full py-4 px-5 bg-[#11141D] hover:bg-[#0F1D2E]"
            >
              <span>Connect Metamask</span>
              <Image
                src={"/assets/img/walletIcons/1.png"}
                alt=""
                width={100}
                height={100}
                className="w-[36px] h-[36px]"
              />
            </button>

            {/* <button className="flex items-center text-sm font-semibold rounded-xl justify-between w-full py-4 px-5 bg-[#11141D] hover:bg-[#0F1D2E]">
              <span>Coinbase Wallet</span>
              <Image
                src={"/assets/img/walletIcons/2.png"}
                alt=""
                width={100}
                height={100}
                className="w-[36px] h-[36px]"
              />
            </button>

            <button className="flex items-center text-sm font-semibold rounded-xl justify-between w-full py-4 px-5 bg-[#11141D] hover:bg-[#0F1D2E]">
              <span>Rainbow</span>
              <Image
                src={"/assets/img/walletIcons/3.png"}
                alt=""
                width={100}
                height={100}
                className="w-[36px] h-[36px]"
              />
            </button> */}

            <button className="flex items-center text-sm font-semibold rounded-xl justify-between w-full py-4 px-5 bg-[#11141D] hover:bg-[#0F1D2E]">
              <span>Wallet Connect</span>
              <Image
                src={"/assets/img/walletIcons/4.png"}
                alt=""
                width={100}
                height={100}
                className="w-[36px] h-[36px]"
              />
            </button>

            {/* <span className="text-sm font-semibold text-[#A6A4AF] mt-5">
              Social Options
            </span>

            <button className="flex items-center text-sm font-semibold rounded-xl justify-between w-full py-4 px-5 bg-[#11141D] hover:bg-[#0F1D2E]">
              <span>Login with Email/Social</span>
              <Image
                src={"/assets/img/walletIcons/5.png"}
                alt=""
                width={100}
                height={100}
                className="w-[36px] h-[36px]"
              />
            </button>

            <span className="text-sm font-semibold text-[#A6A4AF] mt-5">
              More
            </span>

            <button className="flex items-center text-sm font-semibold rounded-xl justify-between w-full py-4 px-5 bg-[#11141D] hover:bg-[#0F1D2E]">
              <span>Trust Wallet</span>
              <Image
                src={"/assets/img/walletIcons/6.png"}
                alt=""
                width={100}
                height={100}
                className="w-[36px] h-[36px]"
              />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
