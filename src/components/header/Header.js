import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Betting from "../../assets/igc.png";
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { BsCircleHalf, BsMenuButtonWide } from 'react-icons/bs';
import { useEffect } from "react";
import { closeModal } from '../../action/modalAction.js';
import Tooltip from 'react-simple-tooltip';

const xrpl = require("xrpl");
const { XummPkce } = require('xumm-oauth2-pkce')
const xumm = new XummPkce('23964dbe-95e4-49ea-bcf0-e4494f826409', {
    implicit: true, // Implicit: allows to e.g. move from social browser to stock browser
    redirectUrl: document.location.href + '?custom_state=test'
})

const test = {
    account: "rnrDDJfKG8YvEw3nuAUjSR5esU4woeYPnJ",
    picture: "../../assets/avata/1.png",
    netEndPoint: "wss://xrplcluster.com"
}
export default function Header() {
    const dispatch = useDispatch();
    const [disabled, setDisabled] = React.useState(false);
    const [myAccount, setMyAccount] = React.useState(null);
    const [myNFTs, setMyNFTs] = useState([]);
    const xummSignInHandler = (state) => {
        if (state.me) {
            const { picture, acccout } = state.me;
            localStorage.setItem('my-account', JSON.stringify(state.me));
            setMyAccount(state.me);
            setDisabled(true);
        }
    };
    // To pick up on mobile client redirects:
    xumm.on("retrieved", async () => {
        console.log("Retrieved: from localStorage or mobile browser redirect");
        xummSignInHandler(await xumm.state());
    });
    const signIn = () => {
        localStorage.setItem("my-account", JSON.stringify(test));
        setMyAccount(test);
        setDisabled(true);
        // xumm.authorize().then((session) => {
        //     xummSignInHandler(session);
        // });
    }
    const sigout = () => {
        localStorage.removeItem("my-account");
        setMyAccount(null);
        setDisabled(false);
    }
    const userSign = () => {
        if (myAccount == null) {
            signIn();
        }
    }
    useEffect(() => {
        const temp = JSON.parse(localStorage.getItem('my-account'));
        setMyAccount(temp);
    }, []);

    useEffect(() => {
        const getNFTData = async () => {
            const client = new xrpl.Client(myAccount.netEndPoint);
            await client.connect();
            const { result } = await client.request({
                method: "account_nfts",
                account: myAccount.account
            })
            if (result) {
                setMyNFTs(result.account_nfts)
            }
            await client.disconnect();
        }
        if (myAccount) {
            getNFTData();
        }
    }, [myAccount])

    return (

        <div className="w-full bg-[#121212]  text-center justify-between items-center flex" >
            {!myAccount &&
                <>
                    <img src={Betting} alt="logoImg" width={120} className='text-start rounded-full p-2' />
                    <div className="text-white text-xl">
                        <div className="hidden xl:flex gap-12">
                            <Link to='/'>Featured</Link>
                            <div className="group/item">Store
                                <div className="text-start invisible group-hover/item:visible py-2 bg-black absolute">
                                    <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Browse All Products</Link>
                                    <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg">My Cart</Link>
                                    <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg">Precious Orders</Link>
                                </div>
                            </div>
                            <div className="group/item z-10">Explore
                                <div className="text-start invisible group-hover/item:visible py-2 bg-black absolute">
                                    <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Recently Listed For Sale</Link>
                                    <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg">Recent Sales</Link>
                                    <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg">Latest Mints</Link>
                                    <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >View All Collections</Link>
                                    <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Al Gecerated Art</Link>
                                    <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Collectibles</Link>
                                    <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Digital</Link>
                                    <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Domain Names</Link>
                                    <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Metaverse</Link>
                                    <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Music/Audio</Link>
                                    <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Photography</Link>
                                    <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Sports</Link>
                                    <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Trading Cards</Link>
                                    <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Utility</Link>
                                </div>
                            </div>
                            <div className="group/item">Tools
                                <div className="text-start invisible group-hover/item:visible py-2 bg-black absolute">
                                    <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Create a new  NFT</Link>
                                    <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg">Create a new collection</Link>
                                    <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg">Set minter status</Link>
                                </div>
                            </div>
                            <div className="group/item z-10">Account
                                <div className="text-start invisible group-hover/item:visible py-2 bg-black absolute">
                                    <Link onClick={() => { userSign() }} className="flex px-4 py-2 w-full justify-between gap-2 text-start hover:bg-[#edb731] text-lg" >My NFTs</Link>
                                    <Link onClick={() => { userSign() }} className="flex px-4 py-2 justify-between gap-2 hover:bg-[#edb731] text-lg">My Collections </Link>
                                    <Link onClick={() => { userSign() }} className="flex px-4 py-2 justify-between gap-2 hover:bg-[#edb731] text-lg">Items Created </Link>
                                    <Link onClick={() => { userSign() }} className="flex px-4 py-2 justify-between gap-2 hover:bg-[#edb731] text-lg" >Items Selling </Link>
                                    <Link onClick={() => { userSign() }} className="flex px-4 py-2 justify-between gap-2 hover:bg-[#edb731] text-lg" >Offers & Approvals </Link>
                                    <Link onClick={() => { userSign() }} className="flex px-4 py-2 justify-between gap-2 hover:bg-[#edb731] text-lg" >Wallet Balances </Link>
                                    <Link onClick={() => { userSign() }} className="flex px-4 justify-between gap-2 py-2 hover:bg-[#edb731] text-lg" >Edit Profile </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center justify-between items-center flex">
                        <div className="group/item text-end justify-end xl:hidden text-white m-3">
                            <BsMenuButtonWide />
                            <div className="text-center invisible group-hover/item:visible py-3 bg-black absolute">
                                <Link to='/'>Featured</Link>
                                <div className="group/item">Store
                                    <div className="text-start invisible group-hover/item:visible py-2 bg-black absolute">
                                        <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Browse All Products</Link>
                                        <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg">My Cart</Link>
                                        <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg">Precious Orders</Link>
                                    </div>
                                </div>
                                <div className="group/item z-10">Explore
                                    <div className="text-start invisible group-hover/item:visible py-2 bg-black absolute">
                                        <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Recently Listed For Sale</Link>
                                        <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg">Recent Sales</Link>
                                        <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg">Latest Mints</Link>
                                        <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >View All Collections</Link>
                                        <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Al Gecerated Art</Link>
                                        <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Collectibles</Link>
                                        <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Digital</Link>
                                        <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Domain Names</Link>
                                        <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Metaverse</Link>
                                        <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Music/Audio</Link>
                                        <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Photography</Link>
                                        <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Sports</Link>
                                        <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Trading Cards</Link>
                                        <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Utility</Link>
                                    </div>
                                </div>
                                <div className="group/item">Tools
                                    <div className="text-start invisible group-hover/item:visible py-2 bg-black absolute">
                                        <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Create a new  NFT</Link>
                                        <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg">Create a new collection</Link>
                                        <Link onClick={() => { userSign() }} className="block px-4 py-2 hover:bg-[#edb731] text-lg">Set minter status</Link>
                                    </div>
                                </div>
                                <div className="group/item z-10">Account
                                    <div className="text-start invisible group-hover/item:visible py-2 bg-black absolute">
                                        <Link onClick={() => { userSign() }} className="flex px-4 py-2 w-full justify-between gap-2 text-start hover:bg-[#edb731] text-lg" >My NFTs</Link>
                                        <Link onClick={() => { userSign() }} className="flex px-4 py-2 justify-between gap-2 hover:bg-[#edb731] text-lg">My Collections </Link>
                                        <Link onClick={() => { userSign() }} className="flex px-4 py-2 justify-between gap-2 hover:bg-[#edb731] text-lg">Items Created </Link>
                                        <Link onClick={() => { userSign() }} className="flex px-4 py-2 justify-between gap-2 hover:bg-[#edb731] text-lg" >Items Selling </Link>
                                        <Link onClick={() => { userSign() }} className="flex px-4 py-2 justify-between gap-2 hover:bg-[#edb731] text-lg" >Offers & Approvals </Link>
                                        <Link onClick={() => { userSign() }} className="flex px-4 py-2 justify-between gap-2  hover:bg-[#edb731] text-lg" >Wallet Balances </Link>
                                        <Link onClick={() => { userSign() }} className="flex px-4 py-2  justify-between gap-2 hover:bg-[#edb731] text-lg" >Edit Profile </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex text-center items-center">
                            <AiOutlineSearch color="white" size="38px" style={{ cursor: "pointer" }} />
                        </div>
                        <div className="text-center justify-between items-center pr-3 sm:px-3 flex">
                            <BsCircleHalf color="white" size="38px" style={{ marginLeft: '20%', cursor: "pointer" }} />
                        </div>
                        <div className="flex gap-[15px] items-center text-end cursor-pointer">
                            <div className="px-2 sm:px-8 py-2 items-center flex bg-[#d4af37] rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f3ec12] duration-300" onClick={() => {
                                signIn();
                            }}>
                                <AiOutlineUser color="white" style={{ fontSize: '30px' }} />
                                <span className="sm:flex hidden text-xl font-bold clear-both whitespace-nowrap">Sign In</span>
                            </div>

                        </div>
                    </div>
                </>
            }

            {myAccount &&
                <>
                    <img src={Betting} alt="logoImg" width={120} className='text-start rounded-full p-2' />
                    <div className="text-white text-xl">
                        <div className="hidden xl:flex gap-12">
                            <Link to='/'>Featured</Link>
                            <div className="group/item">Store
                                <div className="text-start invisible group-hover/item:visible py-2 bg-black absolute">
                                    <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Browse All Products</Link>
                                    <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg">My Cart</Link>
                                    <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg">Precious Orders</Link>
                                </div>
                            </div>
                            <div className="group/item z-10">Explore
                                <div className="text-start invisible group-hover/item:visible py-2 bg-black absolute">
                                    <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Recently Listed For Sale</Link>
                                    <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg">Recent Sales</Link>
                                    <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg">Latest Mints</Link>
                                    <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >View All Collections</Link>
                                    <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Al Gecerated Art</Link>
                                    <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Collectibles</Link>
                                    <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Digital</Link>
                                    <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Domain Names</Link>
                                    <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Metaverse</Link>
                                    <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Music/Audio</Link>
                                    <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Photography</Link>
                                    <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Sports</Link>
                                    <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Trading Cards</Link>
                                    <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Utility</Link>
                                </div>
                            </div>
                            <div className="group/item">Tools
                                <div className="text-start invisible group-hover/item:visible py-2 bg-black absolute">
                                    <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Create a new  NFT</Link>
                                    <Link to={disabled ? "/createcollection" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg">Create a new collection</Link>
                                    <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg">Set minter status</Link>
                                </div>
                            </div>
                            <div className="group/item z-10">Account
                                <div className="text-start invisible group-hover/item:visible py-2 bg-black absolute">
                                    <Link to={disabled ? "/mynfts" : null} className="flex px-4 py-2 w-full justify-between gap-2 text-start hover:bg-[#edb731] text-lg" >My NFTs<div className="px-2 py-1 bg-green-300 rounded-xl text-black">{myNFTs.length}</div></Link>
                                    <Link to={disabled ? "/" : null} className="flex px-4 py-2 justify-between gap-2 hover:bg-[#edb731] text-lg">My Collections<div className="px-2 py-1 bg-green-300 rounded-xl text-black">0</div> </Link>
                                    <Link to={disabled ? "/" : null} className="flex px-4 py-2 justify-between gap-2 hover:bg-[#edb731] text-lg">Items Created<div className="px-2 py-1 bg-green-300 rounded-xl text-black">0</div> </Link>
                                    <Link to={disabled ? "/" : null} className="flex px-4 py-2 justify-between gap-2 hover:bg-[#edb731] text-lg" >Items Selling<div className="px-2 py-1 bg-green-300 rounded-xl text-black">0</div> </Link>
                                    <Link to={disabled ? "/" : null} className="flex px-4 py-2 justify-between gap-2 hover:bg-[#edb731] text-lg" >Offers & Approvals<div className="px-2 py-1 bg-green-300 rounded-xl text-black">0</div> </Link>
                                    <Link to={disabled ? "/" : null} className="flex px-4 py-2 justify-between gap-2 hover:bg-[#edb731] text-lg" >Wallet Balances</Link>
                                    <Link to={disabled ? "/myprofile" : null} className="flex px-4 justify-between gap-2 py-2 hover:bg-[#edb731] text-lg" >Edit Profile</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center justify-between items-center flex">
                        <div className="group/item text-end justify-end xl:hidden text-white m-3">
                            <BsMenuButtonWide />
                            <div className="text-center invisible group-hover/item:visible py-3 bg-black absolute">
                                <Link to='/'>Featured</Link>
                                <div className="group/item">Store
                                    <div className="text-start invisible group-hover/item:visible py-2 bg-black absolute">
                                        <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Browse All Products</Link>
                                        <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg">My Cart</Link>
                                        <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg">Precious Orders</Link>
                                    </div>
                                </div>
                                <div className="group/item z-10">Explore
                                    <div className="text-start invisible group-hover/item:visible py-2 bg-black absolute">
                                        <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Recently Listed For Sale</Link>
                                        <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg">Recent Sales</Link>
                                        <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg">Latest Mints</Link>
                                        <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >View All Collections</Link>
                                        <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Al Gecerated Art</Link>
                                        <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Collectibles</Link>
                                        <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Digital</Link>
                                        <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Domain Names</Link>
                                        <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Metaverse</Link>
                                        <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Music/Audio</Link>
                                        <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Photography</Link>
                                        <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Sports</Link>
                                        <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Trading Cards</Link>
                                        <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Utility</Link>
                                    </div>
                                </div>
                                <div className="group/item">Tools
                                    <div className="text-start invisible group-hover/item:visible py-2 bg-black absolute">
                                        <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg" >Create a new  NFT</Link>
                                        <Link to={disabled ? "/createcollection" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg">Create a new collection</Link>
                                        <Link to={disabled ? "/" : null} className="block px-4 py-2 hover:bg-[#edb731] text-lg">Set minter status</Link>
                                    </div>
                                </div>
                                <div className="group/item z-10">Account
                                    <div className="text-start invisible group-hover/item:visible py-2 bg-black absolute">
                                        <Link to={disabled ? "/mynfts" : null} className="flex px-4 py-2 w-full justify-between gap-2 text-start hover:bg-[#edb731] text-lg" >My NFTs<div className="px-2 py-1 bg-green-300 rounded-xl text-black">{myNFTs.length}</div></Link>
                                        <Link to={disabled ? "/" : null} className="flex px-4 py-2 justify-between gap-2 hover:bg-[#edb731] text-lg">My Collections<div className="px-2 py-1 bg-green-300 rounded-xl text-black">0</div> </Link>
                                        <Link to={disabled ? "/" : null} className="flex px-4 py-2 justify-between gap-2 hover:bg-[#edb731] text-lg">Items Created<div className="px-2 py-1 bg-green-300 rounded-xl text-black">0</div> </Link>
                                        <Link to={disabled ? "/" : null} className="flex px-4 py-2 justify-between gap-2 hover:bg-[#edb731] text-lg" >Items Selling<div className="px-2 py-1 bg-green-300 rounded-xl text-black">0</div> </Link>
                                        <Link to={disabled ? "/" : null} className="flex px-4 py-2 justify-between gap-2 hover:bg-[#edb731] text-lg" >Offers & Approvals<div className="px-2 py-1 bg-green-300 rounded-xl text-black">0</div> </Link>
                                        <Link to={disabled ? "/" : null} className="flex px-4 py-2 justify-between gap-2  hover:bg-[#edb731] text-lg" >Wallet Balances</Link>
                                        <Link to={disabled ? "/myprofile" : null} className="flex px-4 py-2  justify-between gap-2 hover:bg-[#edb731] text-lg" >Edit Profile</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex text-center items-center">
                            <AiOutlineSearch color="white" size="38px" style={{ cursor: "pointer" }} />
                        </div>
                        <div className="text-center justify-between items-center pr-3 sm:px-3 flex">
                            <BsCircleHalf color="white" size="38px" style={{ marginLeft: '20%', cursor: "pointer" }} />
                        </div>
                        <div className="group/item ">
                            <Tooltip
                                placement="bottom"
                                radius={15}
                                content={myAccount.account} >
                                <Link to="/" className="px-2 sm:px-8 py-2 items-center gap-2 flex rounded-full cursor-pointer transition ease-in-out delay-150 bg-[#d4af37] hover:-translate-y-1 hover:scale-110 hover:bg-[#f3ec12] duration-300" onClick={() => { sigout(); dispatch(closeModal()) }}>
                                    <img src={myAccount.picture} className="rounded-full w-6 h-6" />
                                    <span className="sm:flex hidden text-xl font-bold clear-both whitespace-nowrap">Sign Out</span>
                                </Link>
                            </Tooltip>

                        </div>
                    </div>
                </>
            }
        </div >
    )
}