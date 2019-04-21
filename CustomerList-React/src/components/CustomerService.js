import React, { Component, useState, useEffect } from 'react';
import Customer from "./Customer"

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
  
  const orderOption = props=>{
    <button
    className="assordes"
    onClick= {props.toggler}
    >
      

    </button>
  }

  const Filter = props => (
    <button 
      className="filter" 
      // style={{backgroundColor: colors[props.status]}}
      onClick={
        () => {
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
      }
      >
      {props.attr}
    </button>
  );


  const CustomerRow = props =>(
    props.list.map(customer =>
      <tr>
      <td>{customer.title}</td>
      <td>{customer.name}</td>
      <td>{customer.mobile}</td>
      <td>{customer.email}</td>
      <td>{customer.credit}</td>
    </tr>
    )
   
  );
  
  // const SorbyAttribute = props =>(
  //   <button 
  //     className="attribute" 
  //     // style={{backgroundColor: colors[props.status]}}
  //     onClick={() => {
  //       props.onClick(props.customers, props.isAscending, props.sortbyfield)}}
  //     >
  //     {props.number}
  //   </button>
  // )
  
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
    console.log(list);
  }
  }
  
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
  
  
  
  //To Do
  // search customers
  
  
  // To Do
  // render customers
  /*
  Expected result
  Title| Name| Mobile|  Email
  */
  
  // To Do
  // highlight matched fikters

  
  return(
    <div>
      {
        filterValues.map( f=> <Filter 
          attr={f}
          id={f}
          onClick={onAttributeClick}
          sortList={customerListData}
          o={order}
        
        />)
         
      } 
      <table>
        <tr>
          <td>TITLE</td>
          <td>NAME</td>
          <td>MOBILE</td>
          <td>EMAIL</td>
          <td>CREDIT</td>
        </tr>
        {
          <CustomerRow
          list={sortedCustomer}     
        />

        }
      </table>
    </div>
  )

}