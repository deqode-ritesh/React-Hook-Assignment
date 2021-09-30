import React,{useState,useRef, useEffect,useReducer} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import InputComponent from './InputComponent';
import DateTimePicker from './DateTimePicker';
import ListComponent from './ListComponent';
const field = {
        id:'',
        reminder_title:'',
        reminder_date_time:''
};
function ReminderApp(){
    const [reminderArray, setReminderValue] = useState(field);
    const [formError, setFormError] = useState(field);
    const [listReminderArray, setReminderList] = useState([]);

    function handleRemoveItem(itemId){
        setReminderList(listReminderArray.filter(item => item.id !== itemId));
    }
    function handleEditItem(EditInput) {
        setReminderValue(EditInput);
    }
    function unsetRemider(){
        setReminderList(prevState=>[]);
        //setReminderValue(prevState=>field);
        console.log(listReminderArray);
    }
    
    function gen4() {
        return Math.random().toString(16).slice(-4)
      }
      
    function simpleUniqueId(prefix) {
        return (prefix || '').concat([
          gen4(),
          gen4(),
          gen4(),
          gen4(),
          gen4(),
          gen4(),
          gen4(),
          gen4()
        ].join(''))
    }

    function validateForm() {
        let errors = { ...formError }
        !reminderArray.reminder_title ? errors.reminder_title = 'Reminder Title is required' : errors.reminder_title = '';
        !reminderArray.reminder_date_time ? errors.reminder_date_time = 'Reminder Date and time is required' : errors.reminder_date_time = '';   
        setFormError({ ...errors });
        let errorCount = 0;
        for (const [key, value] of Object.entries(errors)) {
            if (value) {
                errorCount = 1;
                break;
            }
        }
        if(!errorCount){
            return true;
        }
        return false; 
    }    

    function addRemider(event){
        event.preventDefault();

        if(!validateForm()){
            return '';
        }else{
        if(reminderArray.id){
            let i = 0;
            listReminderArray.forEach((items) => {
                if(items.id === reminderArray.id){
                    listReminderArray.splice(i, 1);
                }
                i++;
            });
         } 
       } 
        reminderArray.id = simpleUniqueId('List-');
        setReminderList([...listReminderArray,reminderArray]);
        setReminderValue({...reminderArray,...field});
        console.log(reminderArray);
        //console.log(listReminderArray);

    }
    function changeInput(name,value){
        setReminderValue({...reminderArray,[name]:value});
      //  console.log(reminderArray);
    }
 
    return(<div className="container">
                <h1 className="btn-primary text-center">Reminder App</h1>
                <div className="row justify-content-center">
                <div className="col-4">
                    <form onSubmit={addRemider}>
                        <InputComponent 
                        name="reminder_title"
                        placeholder="Please enter Reminder Title"
                        label="Make a Reminder"
                        onInputChange={changeInput}
                        value={reminderArray.reminder_title}
                        error={formError.reminder_title}   
                        />
                        <DateTimePicker 
                            label="Reminder Date"
                            startDate={reminderArray.reminder_date_time}
                            name="reminder_date_time"
                            onInputChange={changeInput}
                            placeholder="Please Select Reminder Date"
                            error={formError.reminder_date_time}
                            />
                      
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary">{reminderArray.id?"Edit Remider":"Add Reminder"}</button>
                            
                        </div>
                    </form>
                    <div className="mt-4 text-center">
                        <button type="button" onClick={unsetRemider} className="btn btn-danger">Clear Reminder</button>
                    </div>
                </div>
                </div>
                <div className="clearfix"></div>
                 {listReminderArray.length?
                 <ListComponent reminderList={listReminderArray} OnDeleteFun={handleRemoveItem}
OnEditFun={(item)=>handleEditItem(item)} />
                :''}
            </div>
        );
}
export default ReminderApp;