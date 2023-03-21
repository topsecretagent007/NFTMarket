import { WALLETSHOWUP, WALLETSHOWOUT } from "./actionType";

export function walletshowup() {
    return { type: WALLETSHOWUP }
}
export function walletshowout() {
    return { type: WALLETSHOWOUT }
}