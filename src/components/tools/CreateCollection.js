import React from "react";
import Uploadnftimg from "../Uploadnftimg"

export default function CreateCollection() {
    const [images, setImages] = React.useState([]);
    const onImageChange = (images) => {
        setImages(images)
    }
    return (
        <div className="px-5 text-center justify-between items-center">
            <div className="text-center rounded-full my-24 mx-auto w-48 text-3xl bg-[#edb731] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f3ec12] duration-300">
                <button className="py-3">Up Load</button>
            </div>
            <div className="text-start text-3xl text-[#edb731] border-b-2 border-b-[#edb731] p-4 font-bold">
                Craete a New Collection
            </div>
            <div className="px-3 py-5 md:flex gap-8">
                <div className="md:w-1/3">
                    <div className="text-xl text-[#edb731] text-center ">This ismage will ve displayed on pages such as the home page, featured colltions and your "My collections" page.</div>
                    <div className="py-3">
                        <Uploadnftimg onImageChange={(images) => onImageChange(images)} />
                    </div>
                </div>
                <div className="md:w-2/3 text-xl">
                    <div className="border-b-2 border-b-[#edb731] py-2 text-white text-start w-full">Collection Name/Title *</div>
                    <input type="text" placeholder="Descriptive title for your new NFT" className="w-full rounded-[10px] p-3 my-2 text-black border-[3px] border-[#090c6f] peer" />
                    <div className="border-b-2 border-b-[#edb731] py-2 text-white text-start w-full">Your Vanity URL *</div>
                    <input type="text" placeholder="Descriptive title for your new NFT" className="w-full rounded-[10px] p-3 my-2 text-black border-[3px] border-[#090c6f] peer" />
                    <div className="border-b-2 border-b-[#edb731] py-2 text-white text-start w-full">Description</div>
                    <div className="flex justify-start bg-white text-black rounded-[10px] my-3 border-[3px] border-[#090c6f]">
                        <div className="relative mb-3 xl:w-full" data-te-input-wrapper-init >
                            <textarea
                                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                id="exampleFormControlTextarea1"
                                rows="4"
                                placeholder="Your message"
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className="w-3/5">
                            <div className="border-b-2 border-b-[#edb731] py-2 text-white text-start w-full">Category *</div>
                            <select className="w-full rounded-[10px] p-3 my-2 text-black border-[3px] border-[#090c6f]" >
                                <option>-Choose a category -</option>
                                <option>Al Gnerated Art</option>
                                <option>Collectibles</option>
                                <option>Digital Arts</option>
                                <option>Domain Names</option>
                                <option>Metaverse</option>
                                <option>Music/Audio</option>
                                <option>Pgotgraphy</option>
                                <option>Sports</option>
                                <option>Trading Cards</option>
                                <option>Utility</option>
                            </select>
                        </div>
                        <div className="w-2/5">
                            <div className="border-b-2 border-b-[#edb731] py-2 text-white text-start w-full">Dfault Royalty(0 - 50%) *</div>
                            <div className="flex my-2">
                                <input type="text" placeholder="Descriptive title for your new NFT" className="w-10/12 rounded-l-xl p-3 text-black border-[3px] border-l-[#090c6f] peer" />
                                <button className="w-2/12 rounded-r-xl p-3 bg-slate-400 text-black border-[3px] peer" >%</button>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="border-b-2 border-b-[#edb731] py-2 text-white text-start w-full">Collection Media Type *</div>
                        <select className="w-full rounded-[10px] p-3 my-2 text-black border-[3px] border-[#090c6f]"  >
                            <option>-- Choose a category --</option>
                            <option>image/Photos [e.g.GIF, JPG, PNG]</option>
                            <option>Audio [e.g. GIF, JPG, PNG]</option>
                            <option>Video [e.g. MP4]</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="text-center rounded-full my-24 mx-auto text-3xl bg-[#edb731] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f3ec12] duration-300">
                <button className="py-3">Create New Collection</button>
            </div>
        </div>
    );
}