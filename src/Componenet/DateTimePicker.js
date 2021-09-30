import React from "react";
import DatePicker from "react-datepicker";  
import "react-datepicker/dist/react-datepicker.css";
function DateTimePicker(props){
    function change(date){
        props.onInputChange(props.name,date);
    }
    return(
        <div className="mb-3">
            <label className="form-label mt-2">{props.label}</label>
            <DatePicker
                    selected={props.startDate}
                    onChange={(date)=>change(date)}
                    name={props.name}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    value={props.startDate}
                    placeholder={props.placeholder}
                    className="form-control"
            />
        </div>
    );
}
export default DateTimePicker;