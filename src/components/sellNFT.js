import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiFillQuestionCircle } from "react-icons/ai";
import { walletshowup, walletshowout } from "../action/walletAction";
import { closesellnft } from "../action/sellAction";
import { settotalcost, setNftReserve, setNFTAAgtSale } from "../action/royaltyAction";
import axios from "axios";
const xrpl = require("xrpl");

export default function NFTsell(props) {
    const dispatch = useDispatch();
    const walletAction = useSelector((state) => state.walletChangeReducer);
    const walletReducer = useSelector((state) => state.walletReducer);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("my-account")));
    const [metadata, setMetadata] = useState({});
    const [agterSale, setAgterSale] = useState("");
    const setPrice = async () => {
        let price = walletReducer.totalCost;
        let url = `http://localhost:8000/getNft/price/${props.nftID}`;
        await axios.post(url, { nftPrice: price });
    }

    useEffect(() => {
        if (props.nftID) {
            let url = `http://localhost:8000/getNft/${props.nftID}`;
            axios.get(url, {})
                .then(res => {
                    console.log(res.data)
                    setMetadata(res.data);
                })
        }

    }, [props.nftID]);

    useEffect(() => {
        setAgterSale((walletReducer.totalCost - ((walletReducer.totalCost / 100) * metadata.nftRoyalty)));
    }, [walletReducer.totalCost]);

    const handleApprove = () => {
        setPrice();
        dispatch(walletshowout());
        dispatch(setNFTAAgtSale(agterSale));
        // NFTMint();
    }

    return (
        <div className="w-full h-full md:h-auto ">
            <div className="bg-[#121212] rounded-lg p-4">
                <div className="text-3xl text-[#edb731] py-6">
                    Sell This NFT
                </div>
                <div className="flex py-4 text-white text-center items-center justify-between">
                    <div className="text-2xl">Target price for NFT *</div>
                    <div className="flex text-white gap-4 mr-10 items-center">
                        <input className="bg-red w-32 text-black rounded-xl text-xl py-2 px-4" onChange={(event) => dispatch(settotalcost(event.target.value))} />
                        <div className="text-xl">XRP</div>
                    </div>
                </div>
                <div className="flex py-4 text-white text-center items-center justify-between">
                    <div className="text-2xl">Creator Royalty</div>
                    <div className="flex text-white gap-7 mr-12 items-center">
                        <input disabled className="bg-red w-32 text-black rounded-xl text-xl py-2 px-4" value={metadata.nftRoyalty} />
                        <div className="text-xl">%</div>
                    </div>
                </div>
                <div className="flex py-4 text-white text-center items-center justify-between">
                    <div className="text-2xl">Seller Fee</div>
                    <div className="flex gap-4 items-center">
                        <input disabled className="bg-red w-32 text-black rounded-xl text-xl py-2 px-4" />
                        <div className="text-xl ">XRP</div>
                        <AiFillQuestionCircle style={{
                            fontSize: "24px"
                        }} />
                    </div>
                </div>
                <div className="flex py-4 text-white text-center items-center justify-between">
                    <div className="text-2xl">Received Agter Sale</div>
                    <div className="flex text-white gap-4 mr-10 items-center">
                        <input disabled className="bg-red w-32 text-black rounded-xl text-xl py-2 px-4" value={agterSale} />
                        <div className="text-xl">XRP</div>
                    </div>
                </div>
                <div className="flex py-4 text-white text-center items-center justify-between">
                    <div className="text-2xl">Reserve for a buyer?</div>
                    <div className="flex text-white mr-24 items-center">
                        <div className="w-32 rounded-xl items-center text-black">
                            <select className="w-full rounded-[10px] p-3 my-2 text-black border-[3px] border-[#090c6f]" onChange={(event) => dispatch(setNftReserve(event.target.value))}>
                                <option>No</option>
                                <option>Yes</option>
                            </select>
                        </div>
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
                    <Link to="/mynfts/mynft">
                        <button className="w-full flex text-center items-center my-4 justify-center rounded-xl py-4 bg-[#edb731] gap-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f3ec12] duration-300" onClick={() => handleApprove()}>
                            <div className="text-xl font-bold">Approve in wallet</div>
                        </button></Link> : <button disabled className="w-full flex text-center items-center my-4 justify-center rounded-xl py-4 bg-[#261e0a] gap-4 ">
                        <div className="text-xl font-bold">Approve in wallet</div>
                    </button>
                }
                <button className="w-full flex text-center items-center my-4 justify-center rounded-xl py-4 bg-[#edb731] gap-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f3ec12] duration-300" onClick={() => (dispatch(closesellnft()), dispatch(walletshowout()))}>
                    <div className="text-xl font-bold" >Cancel</div>
                </button>
            </div>
        </div>
    )
}