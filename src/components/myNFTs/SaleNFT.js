import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BiLink } from "react-icons/bi";
import Logo from "../../assets/avata/1.png";
import axios from "axios";
import BaseURL from "../BaseURL";

export default function SaleNFT() {
    const nftDate = useSelector((state) => state.nftReducer);
    const walletReducer = useSelector((state) => state.walletReducer);
    const [metadata, setMetadata] = useState({});
    useEffect(() => {
        setTimeout(() => {
            axios.get(`${BaseURL}/create/`, {})
                .then(res => {
                    console.log(">>>>>>>>>>>>");
                    setMetadata(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }, 5000);
    }, []);

    return (
        <div className="w-full h-full md:h-auto md:flex py-16 px-6 gap-8">
            <div className="w-full md:w-4/6 ">
                <img src={Logo} className="rounded-xl" />
            </div>
            <div className="bg-[#121212] rounded-lg p-">
                <div className="text-4xl text-red-500 font-bold">FOR SALE</div>
                <div className="text-3xl text-[#edb731] py-6 font-bold">
                    {metadata.nftName}
                </div>
                <div className="flex py-4 text-white text-center items-center justify-between">
                    <div className="text-2xl">{metadata.nftDescription}</div>
                </div>
                <div className="flex py-4 text-white text-center items-center justify-between font-bold">
                    <div className="text-2xl">Total Supply</div>
                    <div className="flex text-white gap-7 mr-12 text-2xl items-center">1</div>
                </div>
                <div className="flex py-4 text-white text-center items-center justify-between font-bold">
                    <div className="text-2xl">Asking Price</div>
                    <div className="flex gap-4 text-2xl items-center">{walletReducer.totalCost} XRP</div>
                </div>
                <div className="flex py-4 text-white text-center items-center justify-between font-bold">
                    <div className="text-2xl">Creator Royalty</div>
                    <div className="flex gap-4 text-2xl items-center">{walletReducer.royalty} %</div>
                </div>
                <div className="flex text-xl gap-6 py-4 text-center items-center justify-between">
                    <div className="text-white font-bold">External Link</div>
                    <div className="flex text-[#edb731] gap-1">
                        <BiLink style={{ fontSize: "24px" }} />
                        <div className="text-[#edb731]">open link</div>
                    </div>
                </div>
                <div className="w-full text-start p-5 rounded-[10px] border-dotted border-2 my-2 border-[#edb731] text-[#edb731]">
                    <div className="text-green-400 py-1 text-xl font-bold ">This NFT is listed for sale in the marketplace and is awaiting a buye.</div>
                    <div className="text-green-400 py-1 text-xl font-bold ">Refer to the "Sell Offers" tab below to review or cancel the offer.</div>
                    <div className="text-xl py-2 text-[#edb731]">To tracsfer the NFT to another uer for 0 XRP, you  need to cancel the sell offer first and the tracsger option will be eabled.</div>
                </div>
            </div>
        </div>
    )
}