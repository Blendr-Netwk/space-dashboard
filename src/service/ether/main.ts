import { ethers, BrowserProvider } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { IConnectWallet } from "@/types";
import { CHAIN_ID } from "@/constants/web3";
import { logoutUser } from "@/controller";


interface ConnectWalletResponse {
    message: string;
    status: number;
    account: string;
}

let provider: BrowserProvider;
let signer: ethers.JsonRpcSigner;
let current_account: string;

export const getProvider = (): BrowserProvider => provider;
export const getCurrentAccount = (): string => current_account;
export const getSigner = (): ethers.Signer => signer;

const requestAccount = async (ethereumProvider: any): Promise<void> => {
    provider = new ethers.BrowserProvider(ethereumProvider);
    signer = await provider.getSigner();
    const accounts = await provider.listAccounts();
    if (accounts.length === 0) {
        await provider.send("eth_requestAccounts", []);
    }
    current_account = await signer.getAddress();
};

const switchNetwork = async (): Promise<void> => {
    console.log('Not connected to the mainnet. Requesting switch to mainnet...');
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: CHAIN_ID }],
        });

        console.log('Switched to the mainnet.');
    } catch (error) {
        console.error(error);
    }
}

const listenToEvents = (ethereumProvider: any): void => {
    ethereumProvider.on("accountsChanged", (accounts: string[]) => {
        // Handle accounts change
        logoutUser()
        console.log("Accounts changed:", accounts);
    });

    ethereumProvider.on("chainChanged", (chainId: number) => {
        // Handle chain change
        console.log("Chain changed:", chainId);
    });

    ethereumProvider.on("disconnect", (error: Error) => {
        // Handle disconnect
        console.error("Disconnected:", error);
    });
};


export const connectWallet = async (walletType: IConnectWallet): Promise<ConnectWalletResponse> => {
    const ethereumProvider = await detectEthereumProvider();
    if (ethereumProvider && walletType === 'metamask') {
        listenToEvents(ethereumProvider);
        await requestAccount(ethereumProvider);
        const network = await provider.getNetwork();
        if (Number(network.chainId) !== 1) {
            await switchNetwork();
        }

        return { message: "success", status: 200, account: current_account! };
    } else {
        throw new Error("Ethereum provider not found or wallet type not supported.");
    }
};