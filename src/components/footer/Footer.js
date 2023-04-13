import Betting from "../../assets/igc.png";
import { BiPaperPlane, BiCopyright } from 'react-icons/bi';
import { FaTwitterSquare } from 'react-icons/fa';

export default function Footer() {
    return (
        <div className="bg-[#121212] w-full py-2">
            <div className="pt-10 w-full flex">
                <div className="w-full gap-12 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    <div className="w-full">
                        <img src={Betting} width={200} className="border-[1px] border-black rounded-full"></img>
                        <div className="text-start text-xl py-8 text-white">IGC - A community focused NFT market place, brnging unility to those who need it most.</div>
                    </div>
                    <ul className="w-full text-white text-start items-center">
                        <li className="text-3xl justify-self-start font-bold text-[#edb731] py-3">Usefull Links</li>
                        <li className="text-xl py-1">Create a Collection</li>
                        <li className="text-xl py-1">Create an NFT</li>
                        <li className="text-xl py-1">Explore Collections</li>
                    </ul>
                    <ul className="w-full text-white text-start items-center">
                        <li className="text-3xl justify-self-start text-[#edb731] py-3 font-bold">Community</li>
                        <li className="text-xl py-1">Privacy Policy</li>
                        <li className="text-xl py-1">Terms of Service</li>
                    </ul>
                    <ul className="w-full text-white text-start items-center">
                        <li className="text-3xl justify-self-start text-[#edb731] py-3 font-bold">Subscribe for updates</li>
                        <li className="text-cm py-1">Join our list and we'll keep you up to date on the latest & greatest features in IGC. We will NOT spam you and your email address wil not be shared with 3rd party.</li>
                        <div className="flex text-end py-12">
                            <input className="text-[#edb731] w-full rounded-l-[15px] text-xl pl-3 outline-none" ></input>
                            <button className="rounded-l-[15px] text-black rounded-r-[10px] ml-[-15px] py-4 px-8 bg-[#edb731]"><BiPaperPlane style={{ fontSize: '20px' }} /></button>
                        </div>
                    </ul>
                </div>
            </div>
            <div className="invisible lg:visible">
                <FaTwitterSquare style={{ color: '#edb731', fontSize: '52px', marginLeft: '5px', marginTop: '30px', cursor: "pointer" }} />
            </div>
            <div className="text-center mt-32 py-8 border-t-2 border-t-black flex items-center justify-center text-[#edb731] text-xl">
                <div className="gap-2 flex items-center"><BiCopyright />2023 IGC, All Rights Reserved. v1.0</div>
            </div>
        </div>
    )
}