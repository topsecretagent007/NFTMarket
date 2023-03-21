import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/avata/1.png";
import { BsArrowLeftShort } from "react-icons/bs";
const xrpl = require("xrpl");

export default function MyNFTTIndex() {
    const [openNFTTag, setopenNFTTag] = React.useState((true));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("my-account")));
    const [myNFTs, setMyNFTs] = useState([]);
    const [images, setImages] = useState([]);

    const openNFTs = () => {
        const openTag = false;
        setopenNFTTag(openTag);
    }
    const closeNFTs = () => {
        const closeTag = true;
        setopenNFTTag(closeTag);
    }
    useEffect(() => {
        const getAllUserData = async () => {
            const client = new xrpl.Client("wss://xrplcluster.com");
            await client.connect();
            const { result } = await client.request({
                method: "account_nfts",
                account: user.account
            })
            if (result) {
                setMyNFTs(result.account_nfts);
            }
            await client.disconnect();
        }
        if (user) {
            getAllUserData();
        }
    }, [user]);

    useEffect(() => {
        const getImages = async () => {
            const URI = xrpl.convertHexToString(myNFTs[0].URI)
            fetch(URI).tretuhen((response) => response.json())
                .then((data) => setImages(data.image));
        }
        if (myNFTs.length > 0) {
            getImages();
            const imgs = myNFTs.map((item, index) => {
                let str = xrpl.convertHexToString(item.URI);
                if ((str.match("https://")) == null) {
                    return fetch(str.replace("ipfs://", "https://ipfs.io/ipfs/"))
                        .then((response) => response.json())
                        .then((data) => {
                            return (data.image).replace("ipfs://", "https://ipfs.io/ipfs/");
                        })
                } else {
                    return fetch(str)
                        .then((response) => response.json())
                        .then((data) => {
                            return data.image;
                        })
                }
            })
            Promise.all(imgs).then((results) => {
                setImages(results);
            })
        }
    }, [myNFTs])
    useEffect(() => {
    }, [images])

    return (
        <div className="w-full h-full md:h-auto ">
            {openNFTTag ?
                <>
                    <div className="text-start w-full text-3xl py-2 px-3 border-b-2 border-b-[#edb731] text-[#edb731]">
                        My NFTs ({myNFTs.length})
                    </div>
                    <div className="w-2/5 bg-[#121212] border-4 border-black rounded-xl mx-auto my-12 cursor-pointer" onClick={() => openNFTs()}>
                        <img src={Logo} className='w-full rounded-t-xl' ></img>
                        <div className="text-3xl bg-black text-[#edb731] py-3 px-2">NFTs Not In A Collection</div>
                        <div className="text-xl bg-black text-white py-3 px-2">Containd {myNFTs.length} NFTs </div>
                    </div>
                </> : <>
                    <div className="text-start w-full text-3xl py-2 px-3 border-b-2 border-b-[#edb731] text-[#edb731]">
                        My NFTs \\ NFTs Not In A Collection ({myNFTs.length})
                    </div>
                    <div className="block md:flex gap-8">
                        <div className="md:w-1/4">
                            <div className="p-4">
                                <img src={Logo} className="rounded-xl"></img>
                            </div>
                            <button className="bg-[#edb731] justify-between w-full rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f3ec12] duration-300" onClick={() => closeNFTs()}>
                                <div className="py-3 justify-center text-black flex items-center">
                                    <BsArrowLeftShort style={{ fontSize: "24px" }} />
                                    <div className="text-xl">Collections</div>
                                </div>
                            </button>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 px-4 w-full py-10 gap-5">
                            {images.map((item, index) => <Link key={index}><img src={item} className="rounded-xl cursor-pointer"></img></Link>)}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}