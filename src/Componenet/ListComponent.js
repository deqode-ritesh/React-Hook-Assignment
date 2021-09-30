import React from "react";
import moment from "moment";
function ListComponent(props){ 
  function OnEditFun(item){
        props.OnEditFun(item);
  }
  function OnDeleteFun(id) {
    props.OnDeleteFun(id);
  } 
  function filterData(reminders,action){
    if(action == 'past'){
        return reminders.filter(item=>{ return item.reminder_date_time< new Date()});
    }else{
        return reminders.filter(item=>{ return item.reminder_date_time>= new Date()})
    } 
  }
  
  function diffTwoDates(date){
    if(date> new Date()){
        var m1 = moment(new Date(), 'DD-MM-YYYY HH:mm'); 
        var m2 = moment(date, 'DD-MM-YYYY HH:mm'); 
    }else{
        var m1 = moment(date, 'DD-MM-YYYY HH:mm'); 
        var m2 = moment(new Date(), 'DD-MM-YYYY HH:mm');   
    }
    var m3 = m2.diff(m1,'minutes'); 
    var m4 = m2.diff(m1,'h'); 
    var numdays = Math.floor(m3 / 1440); 
    var numhours = Math.floor((m3 % 1440) / 60); 
    var numminutes = Math.floor((m3 % 1440) % 60); 
     return numdays + " day(s) " + numhours +"h " + numminutes +"m";
  }

  function dateFormat(listdate){ 
    let options = {
        year: "numeric",
        month: "long",
        day:"numeric",
        hour: "numeric",
        minute: "numeric",
    }
    const date = new Date(listdate);
   //  alert(listdate);
   return (Intl.DateTimeFormat("en-US", options).format(date))
   //return '';
    //return (monthNames[date.getMonth()] +' '+ date.getFullYear()+'-' +'-'+date.getDate());
  }
    return (
        <div className="row">
            <div className="col-md-6">
                <h3>Past Reminder</h3>
                {
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Elapsed</th>
                                <th scope="col">Due Date and Time</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                    <tbody>
                         {filterData(props.reminderList,'past').map(listdata=>(
                            <tr key={listdata.id}>
                              <td scope="col">{listdata.reminder_title}</td>
                              <td scope="col">{diffTwoDates(listdata.reminder_date_time)}</td>
                              <td scope="col">{dateFormat(listdata.reminder_date_time)}</td>
                              <td> 
                                  <ul className="list-inline m-0">          
                                    <li className="list-inline-item">
                                        <button className="btn btn-success btn-sm rounded-0" type="button" onClick={()=>OnEditFun(listdata)}>Edit</button>
                                    </li>
                                    <li className="list-inline-item">
                                        <button className="btn btn-danger btn-sm rounded-0" type="button" onClick={()=>OnDeleteFun(listdata.id)}> Delete</button>
                                    </li>
                                 </ul>
                              </td>   
                          </tr>
                         ))}
                                   
                    </tbody>
                </table>
                
                
                }    

            </div>
            <div className="col-md-6">
                <h3>Future Reminder</h3>
                {
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Elapsed</th>
                                <th scope="col">Due Date and Time</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                    <tbody>
                         {filterData(props.reminderList,'future').map(listdata=>(
                            <tr key={listdata.id}>
                              <td scope="col">{listdata.reminder_title}</td>
                              <td scope="col">{diffTwoDates(listdata.reminder_date_time)}</td>
                              <td scope="col">{dateFormat(listdata.reminder_date_time)}</td>
                              <td> 
                                  <ul className="list-inline m-0">          
                                    <li className="list-inline-item">
                                        <button className="btn btn-success btn-sm rounded-0" type="button" onClick={()=>OnEditFun(listdata)}>Edit</button>
                                    </li>
                                    <li className="list-inline-item">
                                        <button className="btn btn-danger btn-sm rounded-0" type="button" onClick={()=>OnDeleteFun(listdata.id)}>Delete</button>
                                    </li>
                                 </ul>
                              </td>  
                          </tr>
                         ))}
                                   
                    </tbody>
                </table>
                
                
                }    
            </div>
        </div>
    );
}
export default ListComponent;