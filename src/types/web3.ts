
declare global {
    interface Window {
        ethereum: any;
    }
}


interface ICONNECT_WALLET_TYPES {
    METAMASK: IConnectWallet,
    WALLET_CONNECT: IConnectWallet
}

export const CONNECT_WALLET_TYPES: ICONNECT_WALLET_TYPES = { METAMASK: "metamask", WALLET_CONNECT: "wallet-connect" }
Object.freeze(CONNECT_WALLET_TYPES)

export type IConnectWallet = "metamask" | "wallet-connect"
