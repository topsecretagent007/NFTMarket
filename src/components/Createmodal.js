import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiMovieFill } from "react-icons/ri";
import { closeModal } from "../action/modalAction.js";
import { setNftName, setNftSelect, setNftDescription, setNftEmail } from "../action/nftAction.js";
import Uploadnftimg from "./Uploadnftimg.js"
import MakeInput from "./Createinput.js";
import axios from "axios";
import BaseURL from "./BaseURL";

export default function Createmodal() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const metadata = useSelector((state) => state.nftReducer);
  const [images, setImages] = useState([]);
  const [properties, setProperties] = useState([]);

  const createHandler = () => {
    if (images.length == 0) {
      console.log("image not selected");
      return;
    }
    localStorage.setItem('Upload_img', JSON.stringify(images));
    const newNFT = {
      nftName: metadata.nftName,
      nftSelect: metadata.nftSelect,
      nftDescription: metadata.nftDescription,
      nftProperties: [
        { color: metadata.nftPropertyName },
        { size: metadata.nftPropertyValue }
      ]
    };

    const formData = new FormData();
    formData.append("image", images[0].file);
    formData.append("nftName", newNFT.nftName);
    formData.append("nftDescription", newNFT.nftDescription);
    formData.append("nftProperties", newNFT.nftProperties);
    axios.post(`${BaseURL}/create/`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(res => {
        let recordID = res.data;
        dispatch(closeModal());
        setDisabled(false);
        navigate(`/getNft/${recordID}`);
      })
      .catch(err => {
        console.log(err);
      })
  }
  const onImageChange = (images) => {
    setImages(images)
  }
  const onPropDelete = (id) => {
    let deleteaction = properties;
    console.log("before deleting==  ", deleteaction);
    let t = deleteaction.splice(id, 1);
    if (t) {
      setProperties(deleteaction);
    }
    else {
      console.log("When deleting the data", "ERR!")
    }
    console.log(properties);
  }
  const onPropChange = (key, property, value) => {
    console.log(key, property, value);
    if (property == "name")
      properties[key] = { name: value, value: properties[key].value };
    else
      properties[key] = { name: properties[key].name, value: value };
    setProperties(properties);
  }
  const inputValue = () => {
    setDisabled(false);
    createHandler();
  }
  useEffect(() => {
    if (metadata.nftName != "" && metadata.nftSelect != "" && images != null) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [metadata])
  return (
    <div className="w-full justify-between text-center" >
      <div className="fixed top-0 left-0 right-0 z-50  w-full bg-[#edb731]/50 p-6 overflow-y-auto inset-0 h-modal h-full">
        <div className="relative w-full h-full md:h-auto">
          <div className="relative bg-[#121212] rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 rounded-t dark:border-gray-600">
              <div className="text-3xl font-semibold text-[#edb731] dark:text-white">
                Create an NFT
              </div>
              <AiFillCloseCircle width={50} height={50} style={{
                cursor: "pointer",
                textAlign: "center",
                fontSize: "40px",
                color: "red",
                backgroundColor: "white",
                borderRadius: "50%"
              }}
                onClick={() => dispatch(closeModal())}
              />
            </div>
            <div className="grid lg:grid-cols-2 px-5 lg:px-12 py-8 text-white gap-12">
              <Uploadnftimg onImageChange={(images) => onImageChange(images)} />
              <div className="w-full text-start">
                <div className="w-full border-b-2 border-b-[#edb731] my-2 py-4 text-white text-xl">NFT Name/Title *</div>
                <input type="text" placeholder="Descriptive title for your new NFT" className="w-full rounded-[10px] p-3 my-2 text-black border-[3px] border-[#090c6f] peer" onChange={(event) => dispatch(setNftName(event.target.value))} />
                <div className="w-full border-b-2 border-b-[#edb731] my-2 py-4 text-white text-xl">Collect *</div>
                <select className="w-full rounded-[10px] p-3 my-2 text-black border-[3px] border-[#090c6f]" onChange={(event) => dispatch(setNftSelect(event.target.value))} >
                  <option></option>
                  <option>Don't put this NFT into a collection</option>
                </select>
                <div className="w-full p-5 rounded-[10px] border-dotted border-2 my-2 border-[#edb731] text-[#edb731]">Collections group together similar NFTs and dictate which category they appein. toamend an existing collection, <div className="text-[#edb714] cursor-pointer">Click Here</div> or to create a new collection <div className="text-[#edb714] cursor-pointer">Click Here</div></div>
                <div className="w-full items-end border-b-2 border-b-[#edb731] my-2 py-4 text-white text-xl">Description</div>
                <div className="flex justify-start bg-white text-black rounded-[10px] border-[3px] border-[#090c6f]">
                  <textarea
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none"
                    id="exampleFormControlTextarea1"
                    rows="4"
                    placeholder="Your message"
                    data-te-input-wrapper-init onChange={(event) => dispatch(setNftDescription(event.target.value))}
                  >
                  </textarea>
                </div>
                <div className="w-full items-end border-b-2 border-b-[#edb731] my-2 py-4 text-white text-xl">Properties</div>
                <div className="flex">
                  <div className="mx-auto">Property Name</div>
                  <div className="mx-auto">Property value</div>
                </div>
                {properties.map((x, i) =>
                  <MakeInput key={i} id={i} onDelete={(key) => onPropDelete(key)} onPropChange={(key, prop, value) => onPropChange(key, prop, value)} name={x.name} value={x.value} />
                )}
                <div className="flex py-4">
                  <input className="mx-2 w-full text-black px-4 py-2 rounded-[10px] border-[3px] border-[#090c6f]" onClick={() => { setProperties([...properties, { name: "", value: "" }]) }} />
                  <div className="my-auto">=</div>
                  <input className="mx-2 w-full text-black px-4 py-2 rounded-[10px] border-[3px] border-[#090c6f]" />
                </div>
                <div className="w-full p-5 rounded-[10px] border-dotted border-2 my-2 border-[#edb731] text-[#edb731]">Attrbbutes/Properties are used to add characteristics to your NFT. got example, if you hadan NFT of a man with brown hair wearing a vertain sweater you couls d attributes fot each of yhose traits. For example:-<br></br>
                  <div className="p-1 flex">1.<div className="font-bold mx-1">Hair:</div> Brown</div>
                  <div className="p-1 flex">2.<div className="font-bold mx-1">Gender:</div> Male</div>
                  <div className="p-1 flex">3.<div className="font-bold mx-1">Sweater:</div> Red</div>
                  <div className="block md:flex">For a more detailed explanation, reger to out <RiMovieFill style={{ color: "red", fontSize: "20px", }} /><div className="text-[#edb714] cursor-pointer">How to add traaits to an NFT</div> training video.</div>
                </div>
                <div className="w-full border-b-2 border-b-[#edb731] my-2 py-4 text-white text-xl">Deep Link (Not Mandatory)</div>
                <input type="email" placeholder="e.g.https://myDomain.com/trem/1" className="w-full rounded-[10px] p-3 my-2  border-[3px] border-[#090c6f] text-[#edb731]" onChange={(event) => dispatch(setNftEmail(event.target.value))} />
                <div className="w-full p-5 rounded-[10px] border-dotted border-2 my-2 border-[#edb731] text-[#edb731]">Deep links are used to allow xMart visitors to go directly to a page on your own website. This page may have further information about this particular NFT.</div>
              </div>
            </div>
            <div className="px-12 py-10 flex">
              {disabled ?
                <button className="w-full grid-cols-1 py-4 px-24 rounded-full bg-[#edb731] text-center items-center font-bold text-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f3ec12] duration-300" onClick={() => inputValue()}>Create NFT</button>
                : <button className="w-full grid-cols-1 py-4 px-24 rounded-full bg-[#272727] text-center items-center font-bold text-xl">Create NFT</button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}