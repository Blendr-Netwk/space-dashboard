"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Dropdown from "@/components/dropdown/dropdown";
import { IoIosMenu } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import { logoutUser } from "@/controller";

const SpaceSidebar = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [isExplore, setExplore] = useState<boolean>(false);
  const [isClickMenu, setClickMenu] = useState<boolean>(false);

  const handleMenuClick = () => {
    setClickMenu((pre) => !pre);
  };

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className=" w-full fixed top-0 left-0 sm:w-[120px] sm:h-screen sm:flex-shrink-0 z-0 sm:overflow-y-scroll sm:sidebar-scroller">
      <div className=" bg-[#010102] w-full flex items-start justify-end z-50 py-6 pr-8 sm:hidden">
        {isClickMenu ? (
          <MdOutlineClose
            onClick={handleMenuClick}
            className="text-2xl cursor-pointer text-white "
          />
        ) : (
          <IoIosMenu
            onClick={handleMenuClick}
            className="text-2xl cursor-pointer text-white "
          />
        )}
      </div>
      <div
        className={` sidebar w-full absolute flex flex-col items-start justify-start gap-8 pb-10 delay-100 duration-500  ${
          isClickMenu ? "left-0" : "-left-[800px]"
        } sm:left-0 sm:py-4 sm:flex sm:flex-col sm:items-center sm:justify-between sm:gap-5  h-[100vh]`}
      >
        <div className=" ml-8 w-full flex flex-col items-start justify-center sm:ml-0 sm:items-center">
          <div className=" w-[50px] h-[50px] flex items-center justify-center">
            <Image
              src="/assets/img/sidebar/brand.png"
              width={500}
              height={500}
              alt="Picture of the author"
              className=" w-6 h-6"
            />
          </div>

          <Link
            href=""
            style={{ position: "relative" }}
            className=" flex flex-row items-center justify-center px-[11px] "
            onClick={toggleDropdown}
          >
            <p className=" text-white text-[11px] font-medium">Space</p>
            <div className=" w-5 h-5 flex items-center justify-center">
              <Image
                src="/assets/img/sidebar/icon.png"
                width={500}
                height={500}
                alt="Picture of the author"
                className=" w-2 h-[5px]"
              />
            </div>
            {isOpen && <Dropdown />}
          </Link>
        </div>
        <div className=" ml-8 w-full mt-4 flex flex-col items-start justify-center gap-3 sm:ml-0 sm:items-center">
          <Link href="/gpus">
            <div className=" w-full flex flex-row items-center justify-between gap-4 sm:flex sm:flex-col sm:items-center sm:justify-center sm:gap-1">
              <div className=" icon-bg w-10 h-10 rounded-[88.21px] flex items-center justify-center">
                <Image
                  src="/assets/img/sidebar/microchip.png"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                  className={` w-5 h-5 ${
                    pathname === "/gpus"
                      ? " grayscale-0 opacity-100"
                      : "opacity-25"
                  }`}
                />
              </div>
              <p
                className={` text-white text-[11px] font-medium ${
                  pathname === "/gpus" ? "opacity-100" : "opacity-40"
                } `}
              >
                GPUs
              </p>
            </div>
          </Link>
          <Link href="./tasks">
            <div className=" w-full flex flex-row items-center justify-between gap-4 sm:flex sm:flex-col sm:items-center sm:justify-center sm:gap-1">
              <div className=" icon-bg w-10 h-10 rounded-[88.21px] flex items-center justify-center">
                <Image
                  src="/assets/img/sidebar/task.png"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                  className={` w-5 h-5 ${
                    pathname === "/tasks"
                      ? " grayscale-0 opacity-100"
                      : "opacity-25"
                  }`}
                />
              </div>
              <p
                className={` text-white text-[11px] font-medium text-center ${
                  pathname === "/tasks" ? "opacity-100" : "opacity-40"
                } `}
              >
                Tasks
              </p>
            </div>
          </Link>
          <Link href="./lending">
            <div className=" w-full flex flex-row items-center justify-between gap-4 sm:flex sm:flex-col sm:items-center sm:justify-center sm:gap-1">
              <div className=" icon-bg w-10 h-10 rounded-[88.21px] flex items-center justify-center">
                <Image
                  src="/assets/img/lending.png"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                  className={` w-5 h-5 ${
                    pathname === "/lending"
                      ? " grayscale-0 opacity-100"
                      : "opacity-25"
                  }`}
                />
              </div>
              <p
                className={` text-white text-[11px] font-medium text-center ${
                  pathname === "/lending" ? "opacity-100" : "opacity-40"
                } `}
              >
                Lending
              </p>
            </div>
          </Link>
          <Link href="/rent-gpus">
            <div className=" w-full flex flex-row items-center justify-between gap-4 sm:flex sm:flex-col sm:items-center sm:justify-center sm:gap-1">
              <div className=" icon-bg w-10 h-10 rounded-[88.21px] flex items-center justify-center">
                <Image
                  src="/assets/img/rending.png"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                  className={` w-5 h-5 ${
                    pathname === "/rent-gpus"
                      ? " grayscale-0 opacity-100"
                      : "opacity-25"
                  }`}
                />
              </div>
              <p
                className={` text-white text-[11px] font-medium text-center ${
                  pathname === "/rent-gpus" ? "opacity-100" : "opacity-40"
                } `}
              >
                Renting
              </p>
            </div>
          </Link>
          <Link href="/transaction">
            <div className=" w-full flex flex-row items-center justify-between gap-4 sm:flex sm:flex-col sm:items-center sm:justify-center sm:gap-1">
              <div className=" icon-bg w-10 h-10 rounded-[88.21px] flex items-center justify-center">
                <Image
                  src="/assets/img/transaction.png"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                  className={` w-5 h-5 ${
                    pathname === "/transaction"
                      ? " grayscale-0 opacity-100"
                      : "opacity-25"
                  }`}
                />
              </div>
              <p
                className={` text-white text-[11px] font-medium text-center ${
                  pathname === "/transaction" ? "opacity-100" : "opacity-40"
                } `}
              >
                Transaction
              </p>
            </div>
          </Link>
        </div>
        <div className=" ml-8 w-full mt-4 flex flex-col items-start justify-center gap-2 sm:ml-0 sm:items-center">
          <div className="w-9 flex items-center justify-center">
            <Image
              src="/assets/img/sidebar/active.png"
              width={500}
              height={500}
              alt="Picture of the author"
              className=" w-6 h-6"
            />
          </div>
          <div className=" w-ful mb-8 flex flex-col items-center justify-center gap-2 sm:mb-3">
            <div className=" icon-bg w-9 h-9 flex items-center justify-center rounded-[88.21px]">
              <Image
                src="/assets/img/sidebar/bell.png"
                width={500}
                height={500}
                alt="Picture of the author"
                className=" w-5 h-5"
              />
            </div>
            <Link href="/profile">
              <div className=" icon-bg w-9 h-9 flex items-center justify-center rounded-[88.21px]">
                <Image
                  src="/assets/img/sidebar/profile.png"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                  className=" w-5 h-5"
                />
              </div>
            </Link>
          </div>
          <button className="mt-10" onClick={handleLogout}>
            <div className=" w-full flex flex-row items-center justify-between gap-[10px] sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-2">
              <div className="flex items-center justify-center">
                <Image
                  src="/assets/img/logout.png"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                  className="w-9 h-9"
                />
              </div>
              <p className="text-white text-xs text-center font-normal">
                Logout
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpaceSidebar;
