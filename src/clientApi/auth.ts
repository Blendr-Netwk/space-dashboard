import { axiosInstance } from "@/service/axios";
import { AxiosError } from "axios";

export const authenticateUser = (
  signature: string,
  publicAddress: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axiosInstance({
      url: "/api/connect-wallet",
      method: "POST",
      data: { signature, publicAddress },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err: AxiosError) => {
        console.log("err : ", err);
        if (err.response) {
          reject({ message: "Internal Error" });
        } else if (err.request) {
          reject({ message: "Internal Error" });
        } else {
          reject({ message: "Internal Error" });
        }
      });
  });
};

export const checkUser = (publicAddress: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axiosInstance({
      url: "/api/check-user",
      method: "POST",
      data: { publicAddress },
    })
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((err: AxiosError) => {
        console.log("error : ", err);
        if (err.response) {
          reject({ message: "Internal Error" });
        } else if (err.request) {
          reject({ message: "Internal Error" });
        } else {
          reject({ message: "Internal Error" });
        }
      });
  });
};

export const getAuthenticatedUser = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    axiosInstance({
      url: '/api/get/authenticated-user',
      method: "POST",
    })
      .then(response => {
        resolve(response.data.user);
      }).catch((err: AxiosError) => {
        if (err.response) {
          reject({ message: "Error getting user" })
        } else if (err.request) {
          reject({ message: "Internal Error" })
        } else {
          reject({ message: "Internal Error" })
        }
      })
  })
}
export const verifyUserCliSession = (sessionId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axiosInstance({
      url: '/api/verify/session-id',
      method: "POST",
      data: { sessionId }
    })
      .then(response => {
        resolve(response.data.user);
      }).catch((err: AxiosError) => {
        if (err.response) {
          reject({ message: "Error getting user" })
        } else if (err.request) {
          reject({ message: "Internal Error" })
        } else {
          reject({ message: "Internal Error" })
        }
      })
  })
}

export const updateUsername = async (username: string) => {
  return await axiosInstance({
    url: '/api/update/username',
    method: "POST",
    data: { username }
  })
}

export const updateSSHPublicKey = async (sshPublicKey: string) => {
  return await axiosInstance({
    url: '/api/update/ssh-public-key',
    method: "POST",
    data: { sshPublicKey }
  })
}

export const depositCredits = async (txHash: string) => {
  return await axiosInstance({
    url: '/api/deposit',
    method: "POST",
    data: { txHash }
  })

}