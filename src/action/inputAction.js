import { CREATEINPUT, CLOSEINPUT } from "./actionType";

export function createInput() {
    return { type: CREATEINPUT }
}
export function closeInput() {
    return { type: CLOSEINPUT }
}