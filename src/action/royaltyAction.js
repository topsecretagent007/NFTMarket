import { SETROYALTY, SETMINTFEE, SETTOTALCOST, SETNFTRESERVE, SETNFTAFTERSALE } from "./actionType";

export const setroyalty = (value) => {
    return {
        type: SETROYALTY,
        royalty: value
    }
}
export const setmintfee = (value) => {
    return {
        type: SETMINTFEE,
        mintFee: value
    }
}
export const settotalcost = (value) => {
    return {
        type: SETTOTALCOST,
        totalCost: value
    }
}
export const setNftReserve = (value) => {
    return {
        type: SETNFTRESERVE,
        reserve: value
    }
}

export const setNFTAAgtSale = (value) => {
    return {
        type: SETNFTAFTERSALE,
        afterSale: value
    }
}