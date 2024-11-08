import { authenticateUser, checkUser } from "@/clientApi/auth"
import { APP_NAME, LOCAL_STORAGE_AUTH_KEY } from "@/constants/app"
import { connectWallet, getProvider } from "@/service/ether"
import { IConnectWallet } from "@/types"

export const loginUser = (walletType: IConnectWallet): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await connectWallet(walletType)
      const { publicAddress, nonce } = await checkUser(response.account)
      const signedMsg = await handleSignMessage(publicAddress, nonce)
      const { token } = await authenticateUser(
        signedMsg.signature,
        signedMsg.publicAddress
      )
      resolve(token)
    } catch (err) {
      reject(err)
    }
  })
}

export const logoutUser = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY)
  window.location.href = "/login"
}

const handleSignMessage = async (
  publicAddress: string,
  nonce: number
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const msg = `Please sign this message to connect to ${APP_NAME}(${nonce})`

      const provider = getProvider()
      const signer = await provider.getSigner()

      if (!provider || provider === undefined) {
        throw new Error("connect to wallet")
      }
      const signature = await signer.signMessage(msg)
      resolve({ publicAddress, signature })
    } catch (err) {
      reject({
        title: "Signature rejected",
        message: "You need to sign the message to be able to log in.",
      })
    }
  })
}
