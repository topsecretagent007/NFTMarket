import { SETOPENSELLNFT, SETCLOSESELLNFT } from "./actionType";

export function opensellnft() {
    return { type: SETOPENSELLNFT }
}
export function closesellnft() {
    return { type: SETCLOSESELLNFT }
}