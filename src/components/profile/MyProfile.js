import React, { useEffect, useState } from "react";
const xrpl = require("xrpl");

export default function MyProfile() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("my-account")));
    const [myNFTs, setMyNFTs] = useState([]);
    const [myXRPBalance, setMyXRPBalance] = useState(0);
    const [myIGCBalance, setMyIGCBalance] = useState(0);
    useEffect(() => {
        const getAllData = async () => {
            const client = new xrpl.Client("wss://xrplcluster.com");
            await client.connect();
            const { result } = await client.request({
                method: "account_nfts",
                account: user.account
            })
            const responseLines = await client.request({
                command: "account_lines",
                account: user.account,
            })
            const xrpBal = await client.getXrpBalance(user.account);
            const igcBal = responseLines.result.lines[0].balance;
            setMyXRPBalance(xrpBal);
            setMyIGCBalance(igcBal);
            if (result) {
                setMyNFTs(result.account_nfts);
            }
            await client.disconnect();
        }
        if (user) {
            getAllData();
        }
    }, [user]);
    
    return (
        <div className="lg:flex py-24 gap-10">
            <div className="lg:w-1/4">
                <div className="w-full justify-center flex">
                    <div className="text-center justify-center flex w-52 h-52">
                        <img src={user.picture} className="w-full rounded-full object-cover bg-black "></img>
                    </div>
                </div>
                <div className="py-2 text-sm text-[#edb731] ">{user.account}</div>
                <button className="w-full flex text-center items-center my-4 justify-center rounded-full py-4 bg-[#edb731] gap-4  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f3ec12] duration-300">
                    <div className="text-xl font-bold">Edit Profile</div>
                </button>
            </div>
            <div className="lg:w-3/4 text-start">
                <div className="text-[#edb731] text-4xl border-b-2 border-b-[#edb731] p-6">My Wallet Balances</div>
                <div className="text-[#edb731] text-xl py-7">Account Balances</div>
                <div className="py-2 pl-12 w-3/4 text-white text-sm">
                    <div className="flex py-2 gap-4">
                        <div className="w-1/4 text-end font-bold">
                            <div className="">Wallet Address</div>
                        </div>
                        <div className="w-3/4 text-start">
                            <div className="text-[#edb731] font-bold">{user.account}</div>
                        </div>
                    </div>
                    <div className="flex py-2 gap-4">
                        <div className="w-1/4 text-end font-bold">
                            <div className="">Total</div>
                        </div>
                        <div className="w-3/4 text-start">
                            <div className="">{myXRPBalance} XRP</div>
                        </div>
                    </div>
                    <div className="flex py-2 gap-4">
                        <div className="w-1/4 text-end font-bold">
                            <div className="">Less Reserve</div>
                        </div>
                        <div className="w-3/4 text-start">
                            <div className="">{myIGCBalance} IGC</div>
                        </div>
                    </div>
                    <div className="flex py-2 gap-4">
                        <div className="w-1/4 text-end font-bold">
                            <div className="">NFTs Minted</div>
                        </div>
                        <div className="w-3/4 text-start">
                            <div className="">{myNFTs.length}</div>
                        </div>
                    </div>
                    <div className="flex py-2 gap-4">
                        <div className="w-1/4 text-end font-bold">
                            <div className="">Nfts Burned</div>
                        </div>
                        <div className="w-3/4 text-start">
                            <div className="">0</div>
                        </div>
                    </div>
                </div>
                <div className="text-[#edb731] text-xl font-bold">Spinner Credits</div>
                <div className="text-end text-white text-xl">You do not have any unu spinner credits</div>
            </div>
        </div>
    )
}