import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AiFillIeCircle, AiFillPayCircle } from "react-icons/ai";
import { BiLink } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { CiFacebook } from "react-icons/ci";
import { FaUserAlt, FaTwitter, FaEnvelope, FaScrewdriver } from "react-icons/fa";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { openMintModal } from "../action/createMintAction";
import Mintnftmodal from "./Mintnftmodal.js";
import { closeModal, openModal } from '../action/modalAction.js';
import axios from "axios";
import BaseURL from "./BaseURL";
export default function Createnft() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const mintReducer = useSelector((state) => state.mintReducer);
    const user = JSON.parse(localStorage.getItem('my-account'));
    const [metadata, setMetadata] = useState({});
  
    useEffect(() => {
        let url = `${BaseURL}/getNft/${id}`;
        axios.get(url, {})
            .then(res => {
                setMetadata(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [id]);

    return (
        <>
            <div className="md:flex mt-24 py-12 border-t-2 gap-10 border-t-white text-center md:text-start">
                <div className="w-full md:w-4/6 ">
                    <img src={metadata.nftImgPath} className="rounded-xl" />
                </div>
                {mintReducer ? <Mintnftmodal nftID={id} /> :
                    <div className="w-full   text-start">
                        <div className="text-[#edb731] text-4xl py-3 md:py-0">{metadata.nftName}</div>
                        <div className="text-white text-xl py-4">{metadata.nftDescription}</div>
                        <div className="flex text-xl text-white gap-6 py-4">
                            <div className="font-bold">Total Supply</div>
                            <div className="">1</div>
                        </div>
                        <div className="flex text-xl text-white gap-6 py-4">
                            <div className="font-bold">Asking Price</div>
                            <div className="font-bold">Not for sale</div>
                        </div>
                        <div className="flex text-xl text-white gap-6 py-4">
                            <div className="font-bold">Creator Royalty</div>
                            <div className="font-bold">Royalty Free</div>
                        </div>
                        <div className="flex text-xl gap-6 py-4">
                            <div className="text-white font-bold">External Link</div>
                            <div className="flex text-[#edb731] gap-1">
                                <BiLink style={{ fontSize: "24px" }} />
                                <div className="text-[#edb731]">open link</div>
                            </div>
                        </div>
                        <Link to="/" className="w-full flex text-center items-center my-4 justify-center rounded-xl py-4 bg-[#edb731] gap-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f3ec12] duration-300" onClick={() => dispatch(openModal())}>
                            <FiEdit style={{ fontSize: "24px" }} />
                            <div className="text-xl font-bold">Edit NFT</div>
                        </Link>
                        <button className="w-full flex text-center items-center my-4 justify-center rounded-xl py-4 bg-[#edb731] gap-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f3ec12] duration-300" onClick={() => dispatch(openMintModal())}>
                            <FaScrewdriver style={{ fontSize: "24px" }} />
                            <div className="text-xl font-bold" >Mint NFT</div>
                        </button>
                        <Link to="/" className="w-full flex text-center items-center my-4 justify-center rounded-xl py-4 bg-[#edb731] gap-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f3ec12] duration-300" onClick={() => dispatch(closeModal())}>
                            <div className="text-xl font-bold">Delete and archive NFT</div>
                        </Link>
                    </div>
                }
            </div>
            <div className="block md:flex items-start text-start gap-3">
                <div className="text-white text-xl font-bold w-full py-3 ">Created By</div>
                <div className="flex py-3 items-center w-full gap-1">
                    <FaUserAlt style={{ color: "white", borderRadius: "50%", border: "2px solid #edb731", fontSize: "32px" }} />
                    <div className="px-2 text-white text-xl">{user.account}</div>
                </div>
                <div className="text-white text-xl font-bold w-full">
                    <div className="py-3">Owned By</div>
                    <div className="py-3">Share the love</div>
                </div>
                <div className="w-full">
                    <div className="text-white text-xl py-3">Nobody</div>
                    <div className="flex pt-3 pb-8 gap-4">
                        <CiFacebook style={{
                            fontSize: "32px",
                            color: "#edb731"
                        }} />
                        <TiSocialLinkedinCircular style={{
                            fontSize: "32px",
                            color: "#edb731"
                        }} />
                        <AiFillIeCircle style={{
                            fontSize: "32px",
                            color: "#edb731"
                        }} />
                        <AiFillPayCircle style={{
                            fontSize: "32px",
                            color: "#edb731"
                        }} />
                        <FaTwitter style={{
                            fontSize: "32px",
                            color: "#edb731"
                        }} />
                        <FaEnvelope style={{
                            fontSize: "32px",
                            color: "#edb731"
                        }} />
                    </div>
                </div>
            </div>
        </>
    )
}