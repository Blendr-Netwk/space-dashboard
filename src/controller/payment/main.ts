import { ADMIN_ADDRESS } from "@/constants/web3";
import { getSigner } from "@/service/ether"
import { getTokenContract } from "@/service/ether/contract";
import { ethers } from "ethers";


export const iniatePayment = async (amount: string) => {

    const signer = await getSigner();
    const amountInWei = ethers.parseUnits(amount, 18);

    const tx = {
        to: ADMIN_ADDRESS,
        value: amountInWei,
    };

    const singedTx = await signer.sendTransaction(tx);

    const receipt = await singedTx.wait();
    
    if (!receipt) throw new Error("Transaction failed");

    return receipt.hash


}

export const iniatePaymentViaToken = async (amount: string) => {

    try {
        const tokenContract = await getTokenContract()

        //get the correct rate
        const amountInWei = ethers.parseUnits(amount, 18);

        const tx = await tokenContract.transfer(ADMIN_ADDRESS, amountInWei);
        const txHash = await tx.wait();

        return txHash.hash

    } catch (error: any) {
        let errorMessage: string;

        if (error instanceof Error) {
            const typedError: any = error

            if (typedError.reason && typedError.reason.includes("ERC20: transfer amount exceeds balance")) {
                errorMessage = "Transaction failed: transfer amount exceeds balance.";
            } else if (typedError.message.includes("execution reverted")) {
                // Handle other known error patterns
                errorMessage = "Transaction failed due to an error with the smart contract.";
            } else {
                // Handle other types of errors
                errorMessage = "An unexpected error occurred. Please try again later.";
            }

            // Log the error for debugging purposes
            console.error("Transaction failed:", typedError);
        } else {
            // Fallback for unknown error types
            errorMessage = "An unknown error occurred. Please try again later.";
            console.error("Transaction failed with an unknown error:", error);
        }

        // Throw a new error with a user-friendly message
        throw new Error(errorMessage);

    }

}