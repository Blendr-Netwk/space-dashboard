import { ethers } from "ethers";

export const convertMbToGb = (mb: number) => {
  if (mb === undefined) {
    return 0;
  }
  const gb = mb / 1024;
  return Math.round(gb);
}



export const roundNumber = (num: number, decimals: number) => {
  const multiplier = Math.pow(10, decimals); return Math.round(num * multiplier) / multiplier;
}

export const convertWeiToEth = (wei: string) => {
  try {
    if (wei === undefined) {
      return '0';
    }
    return ethers.formatEther(wei);
  } catch (err) {
    return '0'
  }
}

export const minifyHash = (str: string) => {
  if (str === undefined || str.length < 8) {
    return '';
  }
  const firstFour = str.substring(0, 4);
  const lastFour = str.substring(str.length - 4);
  return firstFour + "..." + lastFour;
}



