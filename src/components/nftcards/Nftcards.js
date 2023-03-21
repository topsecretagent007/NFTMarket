import { BsLink45Deg, BsFillSuitHeartFill } from 'react-icons/bs';
import Logo1 from '../../assets/avata/1.png';

export default function Nftcards() {
    return (
        <div className='border-[5px] rounded-[10px] border-black cursor-pointer'>
            <img src={Logo1} alt={Logo1} className='rounded-t-[5px] w-full'/>
            <div className='bg-black rounded-b-[5px] text-start'>
                <div className='border-b-[2px] p-3  border-b-[#121212]'>
                    <div className='text-[#edb731] text-xl'>Name-NFT</div>
                    <div className='text-white text-sm'>Name-NFT</div>
                    <div className='flex text-sm justify-between py-2'>
                        <div className='text-[#edb731] gap-2 font-bold flex'>Floor: <div className='text-[#ffffff]'>14 XRP</div></div>
                        <div className='text-[#edb731] gap-2 font-bold flex text-right'>Vol: <div className='text-[#ffffff]'>623</div></div>
                    </div>
                </div>
                <div className='flex p-[10px] rounded-b-[15px] text-center items-center justify-between text-white'>
                    <div className='flex gap-2'>
                        <BsFillSuitHeartFill style={{cursor: "pointer"}}/>
                        <BsLink45Deg style={{cursor: "pointer"}}/>
                    </div>
                    <div>999Items</div>
                    <div className='text-end'>2 Likes</div>
                </div>
            </div>
        </div>
    )
}