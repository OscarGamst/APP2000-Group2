import React, { useState } from "react";

const EditField = ({label, type="text", value, onChange }) => {
    const [isEditing, setIsEditing] = useState(false);


    const handleBlur = () => { setIsEditing(false); };

    const handleKeyDown = (e) => { if (e.key === "Enter" || e.key === "Escape") { setIsEditing(false)} };

    return (
        <li className="profileGrid" onClick={()=>setIsEditing(true)}>
            <label>{label}</label>
            {isEditing ? (
                <input type={type} value={value} onChange={(e)=>onChange(e.target.value)}
                    onBlur={handleBlur} onKeyDown={handleKeyDown} autoFocus/>
            ) : ( <div className="editingField" >{value}</div>)}
            <div></div>
        </li>
    )
}
export default EditField;