export interface IUser {
    id: string
    username: string | null;
    email: string | null;
    publicAddress: string;
    nonce: number;
    balance: number;
    sshPublicKey: string;
}
