import {
    OPENMODAL,
    CLOSEMODAL,
    SETNFTAFTERSALE,
    SETNFTRESERVE,
    CREATEINPUT,
    SETOPENSELLNFT,
    SETCLOSESELLNFT,
    WALLETSHOWUP,
    WALLETSHOWOUT,
    SETROYALTY,
    SETMINTFEE,
    SETTOTALCOST,
    CLOSEINPUT,
    SETNFTNAME,
    SETNFTSELECT,
    SETNFTDESCRIPTION,
    SETNFTEMAIL,
    SETNFTPROPERTYVALUE,
    SETNFTPROPERTYNAME,
    NFTMINTOPEN,
    NFTMINTCLOSE
} from "./action/actionType";
import { combineReducers } from "redux";

const initialState = false;
const makeInputDtate = false;
const nftmintmodal = false;
const walletShow = false;
const sellNFT = false;

// Use the initialState as a default value
function appReducer(state = initialState, action) {
    switch (action.type) {
        case OPENMODAL: {
            return true;
        }
        case CLOSEMODAL: {
            return false;
        }
        default: {
            return state;
        }
    }
}

function walletChangeReducer(state = walletShow, action) {
    switch (action.type) {
        case WALLETSHOWUP: {
            return true;
        }
        case WALLETSHOWOUT: {
            return false;
        }
        default: {
            return state;
        }
    }
}

function sellReducer(state = sellNFT, action) {
    switch (action.type) {
        case SETOPENSELLNFT: {
            return true;
        }
        case SETCLOSESELLNFT: {
            return false;
        }
        default: {
            return state;
        }
    }
}

function mintReducer(state = nftmintmodal, action) {
    switch (action.type) {
        case NFTMINTOPEN: {
            return true;
        }
        case NFTMINTCLOSE: {
            return false;
        }
        default: {
            return state;
        }
    }
}
// Use the initialState as a default value
function inputReducer(state = makeInputDtate, action) {
    switch (action.type) {
        case CREATEINPUT: {
            return true;
        }
        case CLOSEINPUT: {
            return false;
        }
        default: {
            return state;
        }
    }
}

let nftInitialState = {
    nftName: "",
    nftSelect: "",
    nftDescription: "",
    nftPropertyName: [],
    nftPropertyValue: [],
    nftEmail: ""
}

function nftReducer(state = nftInitialState, action) {
    switch (action.type) {
        case SETNFTNAME: {
            return { ...state, nftName: action.nftName };
        }
        case SETNFTSELECT: {
            return { ...state, nftSelect: action.nftSelect };
        }
        case SETNFTDESCRIPTION: {
            return { ...state, nftDescription: action.nftDescription };
        }
        case SETNFTEMAIL: {
            return { ...state, nftEmail: action.nftEmail };
        }
        case SETNFTPROPERTYNAME: {
            let names = state.nftPropertyName.slice();
            names.push(action.nftPropertyName);
            return { ...state, nftPropertyName: names };
        }
        case SETNFTPROPERTYVALUE: {
            let values = state.nftPropertyValue.slice();
            values.push(action.nftPropertyValue);
            return { ...state, nftPropertyValue: values };
        }
        default: {
            return state;
        }
    }
}

let walletRoyalty = {
    royalty: "",
    mintFee: "",
    totalCost: "",
    afterSale: "",
    reserve: ""
}

function walletReducer(state = walletRoyalty, action) {
    switch (action.type) {
        case SETROYALTY: {
            return { ...state, royalty: action.royalty };
        }
        case SETMINTFEE: {
            return { ...state, mintFee: action.mintFee };
        }
        case SETTOTALCOST: {
            return { ...state, totalCost: action.totalCost };
        }
        case SETNFTRESERVE: {
            return { ...state, reserve: action.reserve };
        }
        case SETNFTAFTERSALE: {
            return { ...state, afterSale: action.afterSale };
        }
        default: {
            return state;
        }
    }
}

const rootReducer = combineReducers({
    appReducer, inputReducer, nftReducer, mintReducer, walletReducer, walletChangeReducer, sellReducer
});

export default rootReducer;