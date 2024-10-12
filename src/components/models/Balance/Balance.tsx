import { depositCredits } from "@/clientApi/auth";
import { fetchPricePair } from "@/clientApi/data";
import { iniatePayment } from "@/controller/payment";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  closeModal: () => void;
  status: string;
}

const Balance: React.FC<Props> = ({ closeModal, status }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<{ credits: number }>({
    defaultValues: { credits: 0 },
  });

  const [priceRate, setPriceRate] = useState<number>(0);

  const creditsV = watch("credits");
  // const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    (async () => {
      const data = await fetchPricePair();
      setPriceRate(data.price);
    })();
  }, []);

  const onSubmitPayment: SubmitHandler<{ credits: number }> = async (data) => {
    try {
      if (status === "deposit") {
        console.log("depositing..");
        const amount = data.credits / priceRate;
        const tx = await iniatePayment(amount.toString());
        console.log(tx);
        const res = await depositCredits(tx);
        console.log(res);
        closeModal();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        onClick={()=> isSubmitting ? null : closeModal()}
        className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center
     justify-center z-[1]"
      ></div>
      <div className="fixed z-[2] inset-0  m-auto h-fit rounded-xl border-alpha bg-[#010102] py-8 px-8 flex flex-col items-start justify-center max-w-[40%]">
        <form onSubmit={handleSubmit(onSubmitPayment)}>
          <h1 className="text-white font-bold text-3xl">
            {status === "deposit" ? "Deposit Funds" : "Withdraw Funds"}
          </h1>
          <p className=" text-left mt-3 text-[#A6A4AF] ">
            Conversation rate: 1 ETH = {priceRate} Credits
          </p>
          <div className=" mt-8 mb-4 w-full flex flex-col items-start justify-start gap-[10px]">
            <h4 className=" pl-2 text-base font-semibold text-white">
              Credits
            </h4>
            <input
              {...register("credits", { required: true })}
              type="number"
              placeholder="0"
              className=" model-toggle-btn w-full h-[50px] rounded-[10px] bg-[#010102] p-4 text-gray-300"
            />
          </div>
          <p className=" pl-2 text-[#A6A4AF]">
            Amount to deposit {creditsV / priceRate} ETH
          </p>
          <button
            type="submit"
            className="ml-1 mt-12 bg-[#A8FF77] text-[#11141D] px-8 py-2 rounded-lg font-semibold "
          >
            {status === "deposit"
              ? isSubmitting
                ? "Depositing"
                : "Deposit"
              : isSubmitting
              ? "Withdrawing"
              : "Withdraw"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Balance;
