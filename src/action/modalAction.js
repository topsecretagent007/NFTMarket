import { OPENMODAL, CLOSEMODAL } from "./actionType";

export function openModal() {
    return { type: OPENMODAL }
}
export function closeModal() {
    return { type: CLOSEMODAL }
}