import {
    SETNFTNAME,
    SETNFTSELECT,
    SETNFTDESCRIPTION,
    SETNFTEMAIL,
    SETNFTPROPERTYVALUE,
    SETNFTPROPERTYNAME
} from "./actionType";

export const setNftName = (value) => {
    return {
        type: SETNFTNAME,
        nftName: value
    }
}
export const setNftSelect = (value) => {
    return {
        type: SETNFTSELECT,
        nftSelect: value
    }
}
export const setNftDescription = (value) => {
    return {
        type: SETNFTDESCRIPTION,
        nftDescription: value
    }
}
export const setNftEmail = (value) => {
    return {
        type: SETNFTEMAIL,
        nftEmail: value
    }
}
export const setNftPropertyName = (value) => {
    return {
        type: SETNFTPROPERTYNAME,
        nftPropertyName: value
    }
}
export const setNftPropertyValue = (value) => {
    return {
        type: SETNFTPROPERTYVALUE,
        nftPropertyValue: value
    }
}