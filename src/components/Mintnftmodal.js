import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiFillBehanceSquare, AiFillQuestionCircle } from "react-icons/ai";
import { closeMintModal } from "../action/createMintAction";
import { walletshowup, walletshowout } from "../action/walletAction";
import { setroyalty, setmintfee, settotalcost } from "../action/royaltyAction";
import axios from "axios";
import BaseURL from "./BaseURL";

const xrpl = require("xrpl");

export default function Mintnftmodal(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("my-account")));
    const walletAction = useSelector((state) => state.walletChangeReducer);
    const royalty = useSelector((state) => state.walletReducer.royalty)

    async function setNftRoyalty() {
        let _url = `${BaseURL}/getNft/mint/${props.nftID}`
        await axios.post(_url, { nftRoyalty: royalty });
    }

    const handleMint = () => {
        setNftRoyalty();
        mintNFT();
        dispatch(walletshowout());
        navigate(`/getNft/offer/${props.nftID}`);
    }

    const mintNFT = async () => {
        const client = new xrpl.Client("wss://xrplcluster.com")
        await client.connect();
        const transactionBlob = await client.request({
            TransactionType: "NFTokenMint",
            account: user.account,
            URI: xrpl.convertStringToHex(props.nftImgPath),
            Flags: parseInt(8),
            TransferFee: parseInt(royalty),
            NFTokenTaxon: 0
        })

        const tx = await client.submitAndWait(transactionBlob, { wallet: user })
        const nfts = await client.request({
            method: "account_nfts",
            account: user.account
        })
        await client.disconnect();
    }

    return (
        <div className="w-full h-full md:h-auto ">
            <div className="bg-[#121212] rounded-lg p-4">
                <div className="text-3xl text-[#edb731] py-6">
                    Mint This NFT
                </div>
                <div className="flex gap-4 text-white text-center items-center justify-between">
                    <div className="block">
                        <div className="text-2xl py-2 text-white">Royalty fot futher sales *</div>
                        <div className="flex py-2 gap-2">
                            <AiFillBehanceSquare style={{
                                color: "red", fontSize: "24px"
                            }} />
                            <div className="text-xl text-white">Explaining Royalink Tutorial</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <input className="bg-red w-32 text-black rounded-xl text-xl py-2 px-4" onChange={(event) => dispatch(setroyalty(event.target.value))} />
                        <div className="items-center text-xl text-white">( 0-50% )</div>
                    </div>
                </div>
                <div className="flex py-4 text-white text-center items-center justify-between">
                    <div className="text-2xl">Mint Fee</div>
                    <div className="flex gap-4 items-center">
                        <input disabled className="bg-red w-32 text-black rounded-xl text-xl py-2 px-4" onChange={(event) => dispatch(setmintfee(event.target.value))} />
                        <div className="text-xl ">XRP</div>
                        <AiFillQuestionCircle style={{
                            fontSize: "24px"
                        }} />
                    </div>
                </div>
                <div className="flex py-4 text-white text-center items-center justify-between">
                    <div className="text-2xl">Total Transaction Cost</div>
                    <div className="flex text-white gap-4 mr-10 items-center">
                        <input disabled className="bg-red w-32 text-black rounded-xl text-xl py-2 px-4" onChange={(event) => dispatch(settotalcost(event.target.value))} />
                        <div className="text-xl">XRP</div>
                    </div>
                </div>
                <div className="flex mb-4 py-5 w-4/8">
                    {walletAction ?
                        <input id="default-checkbox" type="checkbox" value="" className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                            onChange={() => dispatch(walletshowout())} /> : <input id="default-checkbox" type="checkbox" value="" className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                                onChange={() => dispatch(walletshowup())} />}
                    <label className="ml-2 font-medium text-xl  text-white dark:text-gray-300">I confirm that I want to mint this NFT on the network and have read the terms of service agreement.</label>
                </div>
            </div>
            <div>
                {walletAction ?
                    <button className="w-full flex text-center items-center my-4 justify-center rounded-xl py-4 bg-[#edb731] gap-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f3ec12] duration-300" onClick={() => handleMint()}>
                        <div className="text-xl font-bold">Approve in wallet</div>
                    </button> : <button disabled className="w-full flex text-center items-center my-4 justify-center rounded-xl py-4 bg-[#261e0a] gap-4 ">
                        <div className="text-xl font-bold">Approve in wallet</div>
                    </button>
                }
                <button className="w-full flex text-center items-center my-4 justify-center rounded-xl py-4 bg-[#edb731] gap-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f3ec12] duration-300">
                    <div className="text-xl font-bold" onClick={() => { dispatch(closeMintModal()); dispatch(walletshowout()) }}>Cancel</div>
                </button>
            </div>
        </div>
    )
}