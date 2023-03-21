import { NFTMINTOPEN, NFTMINTCLOSE } from "./actionType";

export function openMintModal() {
    return { type: NFTMINTOPEN }
}
export function closeMintModal() {
    return { type: NFTMINTCLOSE }
}