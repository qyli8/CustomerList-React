// import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import React, { Component, useState, useEffect } from 'react';
import Customer from "./Customer"
import ReactDOM from 'react-dom';
import fetch from "node-fetch"


// initialize a list  of customers



// create customer service list
export default function CustomerService () {
  const customerListData = [ new Customer("Mr", "John", "abc@john.com", "040370402", 536),
  new Customer("Mr", "Chris", "abc@john.com", "040370102", 436),
  new Customer("Mr", "Jason", "abc@john.com", "041171402", 936),
  new Customer("Ms", "Lyn", "abc@john.com", "04037002", 366),
  new Customer("Mrs", "Brown", "abc@john.com", "040370402", 236),
  new Customer("Mrs", "Brown", "abc@john.com", "040370402", 1636)];

  const filterValues = ["Default","Title", "Name", "Email", "Mobile", "Credit"];

  // const [customers, setCustomers] = useState(customerListData);
  const [sortedCustomer, setSortedCustomer ] = useState(customerListData);
  const  [activateFilter, setActivateFilter ]=useState(false);
  const [order, setOrder]=useState(false)
  
 // ReactDOM.render(renderCounterApp, appRoot)


 const filterOnClick = (e, props) =>{
  console.log(props.attr)
  if(props.attr === "Default"){
    setActivateFilter(false);
    setSortedCustomer(props.sortList);
  }
  else{
    setActivateFilter(true);
    console.log(props.attr);
    toggleOrder(order);
    props.onClick(props.sortList, order, props.attr);

  }
}

  const Filter = props => (
    <button 
      className="filter" 
      // style={{backgroundColor: colors[props.status]}}
      onClick={
         (e)=>filterOnClick(e,props)      }
      >
      {props.attr}
    </button>
  );

// component name need to be more generic
  const CustomerRow = props =>(
    props.list.map(customer =>
      <tr>
      {/* <td>{customer.title}</td> */}
      <td>{customer.first_name}</td>
      {/* <td>{customer.mobile}</td> */}
      <td>{customer.email}</td>
      <td>{customer.address}</td>
    </tr>
    )
   
  );
   

  //To DO
  //sort customers
  /*
  Expected combinations
  Title assending/descending
  Name assending/descending
  Mobile assending/descending
  Email assending/descending
  Credit assending/descending
  */
  
  
  const toggleOrder=(o)=>{
    o?setOrder(false):setOrder(true);
  }
  const resetSortedCustomerList=() =>{
    setSortedCustomer([])
  }
  const compare = (a, b) => {
    if (isNaN(a) && typeof a === "string") return a.localeCompare(b);
    else if (!isNaN(a)) return a - b;
  }; 
  const onAttributeClick=(list, isAscending, sortbyfield)=>{
 
        if (sortbyfield){
      var attr = sortbyfield.toLowerCase(sortbyfield)
      list.sort((a, b) => { 
      return isAscending
        ? compare(a[attr], b[attr])
        : compare(b[attr], a[attr]);
    });
    setSortedCustomer(list)
    // console.log(list);
  }
  }

  // const empListHeaders = new Headers();
  // empListHeaders.append('Authorization',"Token token=st_live_2L1ST3mGdvQntmP38UXxsw");
  // empListHeaders.append('Content-Type', "application/json");
  
  const [teachers, setTeachers]=useState([]);

  const header ={
    'Authorization':"Token token=st_live_2L1ST3mGdvQntmP38UXxsw",
    'Content-Type':"application/json"
  }
  const reqMetadata = { 
    method: 'GET',
    headers: header
  };


  let t = [];

  const  fetchData = () => {
  
    fetch('https://api.teachworks.com/v1/employees',reqMetadata)
    .then(res => res.json())
    .then(json => setTeachers(json));
    console.log(teachers)
  }

  const showTeachers =()=>{
    fetchData();
    if(!teachers.length>0){
      fetchData();
    }
  }

  const searchCustomers =(e)=>{
    e.preventDefault();
    const filterString = e.target.elements.search.value;
    console.log(filterString);
    let list = teachers.filter(teacher=>{
      for(var attri in teacher){
        if(isNaN(teacher[attri])&& teacher[attri].toLowerCase().includes(filterString)){
          return true
        }
        if(!isNaN(teacher[attri]) && typeof teacher[attri] === "string" && teacher[attri].includes(filterString)){
          return true
        }
        if (teacher[attri] === filterString) return true
      }
    })

    setTeachers(list);

    console.log(`after filter ${JSON.stringify(list)} length of array ${list.length}` );

    // setTeachers()

    console.log(teachers);
  }




  const SearchTeachers = props =>(
    <form onSubmit={searchCustomers}>
      <input type="text" name="search" />
      <button >search</button>
    </form>
  )

  
  //To Do
  // search customers
  
  

  // To Do
  // highlight matched filters




    // To Do
  // render customers
  /*
  Expected result
  Title| Name| Mobile|  Email
  */
  
  return(
    <div>
      <button onClick={showTeachers}>show</button>
      <SearchTeachers />
      {
        filterValues.map( f=> <Filter 
          attr={f}
          key={f}
          onClick={onAttributeClick}
          sortList={customerListData}
          o={order}
        
        />)
         
      } 
      <table>
        <tr>
          {/* <td>TITLE</td> */}
          <td>NAME</td>
          {/* <td>MOBILE</td> */}
          <td>EMAIL</td>
          <td>ADDRESS</td>
        </tr>
        {
          <CustomerRow
          list={teachers}     
        />

        }
      </table>
    </div>
  )

}