import React from "react";
function InputComponent(props){
    function changeInput(event){
        props.onInputChange(event.target.name,event.target.value);
    }
    return(
        <div className="mb-3">
            <label className="form-label mt-2" >{props.label}</label>
            <input type="text" name={props.name} value={props.value} placeholder={props.placeholder} className="form-control" onChange={changeInput} />
            <p>{props.error?props.error:''}</p>
        </div>
    );
}
export default InputComponent;