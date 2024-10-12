"use client";

import { MainContainer } from "@/components/container/MainContainer";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import Balance from "@/components/models/Balance/Balance";
import { minifyHash } from "@/utils/math";
import { useUser } from "@/providers/UserProvider";
import { updateUsername } from "@/clientApi/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { UpdateSSHKeys } from "@/components/sections/profile/ssh-publickey";

const Profile = () => {
  const { user, handleAuthentication } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("deposit");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ username: string }>({
    defaultValues: { username: user?.username || "" },
  });

  const handleBalanceModal = (status: "deposit" | "withdraw") => {
    setShowModal(true);
    setStatus(status);
  };
  const closeBalanceModal = () => {
    setShowModal(false);
  };

  const onUpdateUsernameSubmit: SubmitHandler<{ username: string }> = async (
    data
  ) => {
    try {
      await updateUsername(data.username);
      await handleAuthentication();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <MainContainer>
        <div className=" w-full my-20 pt-8 px-5 sm:p-0 sm:w-full sm:mt-8 sm:mx-4 sm:pl-[150px] flex flex-col items-center justify-center sm:items-start sm:justify-start">
          <div className=" w-full px-5 sm:p-0 sm:w-full sm:pr-10 ">
            <h2 className=" text-xl font-bold text-white md:text-2xl ">
              Profile
            </h2>
            <div className=" mb-8 py-8 px-4 mt-4 bg-[#11141D] rounded-2xl sm:px-6 lg:p-8 lg:mt-8">
              <div className=" flex flex-col-reverse items-end justify-start gap-3 mb-16 w-full sm:flex-row sm:items-center sm:justify-end lg:flex lg:items-center lg:justify-end lg:gap-4">
                <div className=" model-toggle-btn px-6 py-2 rounded-2xl ">
                  <h3 className=" text-slate-100 ">
                    {user?.balance.toFixed(2)} credits
                  </h3>
                </div>
                <div className=" profile-border px-6 py-2 rounded-lg ">
                  <h2 className=" text-[#A8FF77] ">
                    {minifyHash(user?.publicAddress || "0x0000000000000")}
                  </h2>
                </div>
              </div>
              <div className=" mt-8 ">
                <div className=" border-bot mb-8 pb-10 sm:pb-8 md:pb-10  ">
                  <h1 className=" text-2xl text-white font-semibold mb-6">
                    Hello {user?.username ? user.username : "Unknwon"}
                  </h1>
                  <p className=" text-[#A6A4AF] font-light text-base ">
                    Begin your adventure with Space Dashboard by tackling tasks
                    and accumulating points. As you progress, each level offers
                    unique benefits and recognitions, reflecting your valuable
                    input to our community. Keep an eye on your advancement with
                    our progress tracker and climb the ranks to access special
                    rewards. Every point is a step forward—get involved and earn
                    your rewards!
                  </p>
                </div>
                {/* <div className=" mt-10">
                  <h2 className=" mt-2 text-[#A8FF77] mb-8 sm:mb-6 ">
                    Early Space dashboard access at Level 10
                  </h2>
                  <div className=" grid grid-cols-1 items-stretch justify-start gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:w-3/4 lg:my-8 ">
                    <div className=" model-toggle-btn px-4 py-2 flex items-center justify-start gap-4 rounded-lg lg:py-[10px] lg:rounded-2xl ">
                      <Image
                        src="/assets/img/right.png"
                        width={500}
                        height={500}
                        alt="Picture of the author"
                        className="w-6 h-6 lg:w-4 lg:h-4"
                      />
                      <h3 className=" text-[#A6A4AF] text-sm">
                        Higher reward rates
                      </h3>
                    </div>
                    <div className=" model-toggle-btn px-4 py-2 flex items-center justify-start gap-4 rounded-lg lg:py-[10px] lg:rounded-2xl ">
                      <Image
                        src="/assets/img/right.png"
                        width={500}
                        height={500}
                        alt="Picture of the author"
                        className="w-6 h-6 lg:w-4 lg:h-4"
                      />
                      <h3 className=" text-[#A6A4AF] text-sm">
                        Community influence
                      </h3>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className=" w-11/12 border-alpha rounded-2xl py-12 px-10 sm:w-11/12 ">
            <Tabs defaultValue="account" className="w-11/12">
              <TabsList className=" model-toggle-btn w-[200px] h-[44px] rounded-[15px] p-[5px] sm:w-[250px]">
                <TabsTrigger value="account" className=" text-white ">
                  Account
                </TabsTrigger>
                <TabsTrigger value="balance" className=" text-white">
                  Balance
                </TabsTrigger>
                <TabsTrigger value="public_key" className=" text-white">
                  Public Key
                </TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <div className=" mt-8">
                  <h3 className=" text-[#A6A4AF] text-sm ">
                    start your journey with Blendr by choosing a unique
                    username! This isn&apos;t just a label—it&apos;s your first step
                    towards crafting a distinct presence within our dynamic
                    community. By setting your username, you not only solidify
                    your identity but also kick off your earning potential. Set
                    your username now to instantly gain an additional 5 points,
                    propelling your progress forward. Your username opens the
                    door to exclusive rewards and opportunities. Don&apos;t miss
                    out—claim your points and leave your mark with Blendr!
                  </h3>
                  <div className=" mt-8 ">
                    <form onSubmit={handleSubmit(onUpdateUsernameSubmit)}>
                      <div className=" mb-8 w-full flex flex-col items-start justify-start gap-[10px] sm:mb-12">
                        <h4 className=" pl-2 text-base font-semibold text-white">
                          Username
                        </h4>
                        <input
                          {...register("username", { required: true })}
                          type="text"
                          placeholder="Enter Your Username"
                          className=" model-toggle-btn w-full h-[50px] rounded-[10px] bg-[#010102] p-4 text-gray-300 sm:w-3/5"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="ml-1 bg-[#A8FF77] text-[#11141D] px-10 py-3 rounded-lg font-semibold "
                      >
                        {isSubmitting ? "Updating..." : "Update"}
                      </button>
                    </form>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="balance">
                <div className=" mt-8">
                  <h3 className=" text-[#A6A4AF] text-sm ">
                    Welcome to your Balance Overview — the central hub for
                    managing your credits within our platform. Here, you have
                    the transparency and flexibility to oversee your funds with
                    ease. Deposit Ethereum (ETH) to top off your credits and
                    keep the momentum going, or withdraw to transfer your
                    digital achievements into tangible rewards. With our simple
                    conversion rate of 1 ETH equating to 100,000 Credits,
                    managing your assets is straightforward and efficient. Stay
                    in control, and move your funds as you see fit. Your journey
                    of earning and spending is seamless with us.
                  </h3>
                  <div className=" mt-8 ">
                    <div className=" mb-8 w-full flex flex-col items-start justify-start gap-[10px] sm:mb-12">
                      <h4 className=" pl-2 text-base font-semibold text-white">
                        Credits
                      </h4>
                      <input
                        disabled
                        value={user?.balance || 0}
                        type="text"
                        placeholder="0"
                        className=" model-toggle-btn w-full h-[50px] rounded-[10px] bg-[#010102] p-4 text-gray-300 sm:w-3/5"
                      />
                    </div>
                    <div>
                      <button
                        onClick={() => handleBalanceModal("deposit")}
                        className="ml-2 bg-[#A8FF77] text-[#11141D] px-10 py-3 rounded-lg font-semibold "
                      >
                        Deposit
                      </button>
                      <button
                        onClick={() => handleBalanceModal("withdraw")}
                        className="ml-2 profile-border text-[#A6A4AF] px-10 py-3 rounded-lg font-semibold "
                      >
                        Withdraw
                      </button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="public_key">
                <UpdateSSHKeys />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        {showModal && (
          <Balance closeModal={closeBalanceModal} status={status} />
        )}
      </MainContainer>
    </>
  );
};

export default Profile;
