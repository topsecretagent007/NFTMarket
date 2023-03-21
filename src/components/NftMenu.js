import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { BsArrowRight } from 'react-icons/bs';
import { BiRocket } from 'react-icons/bi';
import { AiOutlineForm } from "react-icons/ai";
import Nftcards from './nftcards/Nftcards.js';
import Createmodal from './Createmodal.js';
import { openModal } from '../action/modalAction.js';
const nftNumber = [1, 2, 3, 4, 5, 6, 7];
const { XummPkce } = require('xumm-oauth2-pkce')
const xumm = new XummPkce('23964dbe-95e4-49ea-bcf0-e4494f826409', {
    implicit: true, // Implicit: allows to e.g. move from social browser to stock browser
    redirectUrl: document.location.href + '?custom_state=test'
})

export default function NftMenu() {
    const dispatch = useDispatch();
    const showModal = useSelector((state) => state.appReducer);
    const [myAccount, setMyAccount] = React.useState(null);
    const xummSignInHandler = (state) => {
        if (state.me) {
            const { picture, acccout } = state.me;
            localStorage.setItem('my-account', state.me);
            setMyAccount(state.me);
            // please add local storage here
            // Also: sdk » xumm-sdk (npm)
        }
    };
    // To pick up on mobile client redirects:
    xumm.on("retrieved", async () => {
        console.log("Retrieved: from localStorage or mobile browser redirect");
        xummSignInHandler(await xumm.state());
    });
    const signIn = () => {
        xumm.authorize().then((session) => {
            xummSignInHandler(session);
        });
    }
    const localget = () => {
        const user = localStorage.getItem('my-account');
        if (user != null) {
            dispatch(openModal())
        } else {
            signIn();
        }
    }

    return (
        <div className="w-full justify-between">
            <div className="text-center items-center py-8">
                <div className='flex w-full text-center justify-center items-center gap-12 '>
                    <button className="flex font-bold items-center text-xl gap-2 rounded-full bg-[#edb731] px-6 py-3 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-[#f3ec12] duration-300"><BiRocket />Explore</button>
                    <button className="flex font-bold items-center text-xl gap-2 rounded-full bg-[#edb731] px-6 py-3 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-[#f3ec12] duration-300 " onClick={() => localget()}><AiOutlineForm />Create</button >
                </div>
                <div className="flex text-[#edb731] w-full items-center text-center justify-between text-4xl border-b-[3px] border-[#edb731] py-4 pl-3">
                    <div className='text-start font-bold'>Featured Collections</div>
                    <div className='text-end items-center font-bold text-xl gap-3 flex'>View <BsArrowRight style={{ fontFamily: 'bold' }} /></div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 px-4 w-full py-10 gap-5">
                    {nftNumber.map(number => <Nftcards key={number} />)}
                </div>
            </div>
            <div>
                {showModal && <Createmodal />}
            </div>
        </div>
    )
}