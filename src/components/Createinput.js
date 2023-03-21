import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function MakeInput({ id, onDelete, onPropChange, name, value }) {
    const [name1, setName] = useState(name);
    const [value1, setValue] = useState(value);

    const inputTagDelete = (id) => {
        document.getElementsByClassName("input")[id].style.display = "none";
    }

    return (
        <div className="flex py-4 input"  >
            <div className="flex">
                <input className="mx-2 w-full text-black px-4 py-2 rounded-[10px] border-[3px] border-[#090c6f]" value={name1} onChange={(event) => { setName(event.target.value); onPropChange(id, "name", event.target.value) }} />
            </div>
            <div className="my-auto">=</div>
            <div className="flex">
                <input className="mx-2 w-full text-black px-4 py-2 rounded-[10px] border-[3px] border-[#090c6f]" value={value1} onChange={(event) => { setValue(event.target.value); onPropChange(id, "value", event.target.value) }} />
                <AiOutlineCloseCircle style={{ color: "#edb731", fontSize: "45px", cursor: "pointer" }} onClick={() => { onDelete(id); inputTagDelete(id) }}
                />
            </div>
        </div>
    )
}