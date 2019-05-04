// import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import Popper from 'popper.js';
import React, { Component, useState, useEffect } from 'react';
import Customer from "./Customer"


// initialize a list  of customers



// create customer service list
export default class CustomerService extends React.Component {

  constructor(props){
  //   const customerListData = [ new Customer("Mr", "John", "abc@john.com", "040370402", 536),
  // new Customer("Mr", "Chris", "abc@john.com", "040370102", 436),
  // new Customer("Mr", "Jason", "abc@john.com", "041171402", 936),
  // new Customer("Ms", "Lyn", "abc@john.com", "04037002", 366),
  // new Customer("Mrs", "Brown", "abc@john.com", "040370402", 236),
  // new Customer("Mrs", "Brown", "abc@john.com", "040370402", 1636)];
    super(props);
    this.filterValues = ["Default","Title", "Name", "Email", "Mobile", "Credit"];
    this.state={
      "sortedCustomer":[ new Customer("Mr", "John", "abc@john.com", "040370402", 536),
      new Customer("Mr", "Ben", "abc@john.com", "040370102", 436),
      new Customer("Mr", "Sam", "abc@john.com", "041171402", 936),
      new Customer("Ms", "Lyn", "abc@john.com", "04037002", 366),
      new Customer("Mrs", "Brown", "abc@john.com", "040370402", 236)]
    }
    this.resetSortedCustomerList=this.resetSortedCustomerList.bind(this);
    this.onClickFilter=this.onClickFilter.bind(this);
    this.handleSearch=this.handleSearch.bind(this);

  }

 
  resetSortedCustomerList(){
    this.setState({"sortedCustomer":[ new Customer("Mr", "John", "abc@john.com", "040370402", 536),
    new Customer("Mr", "Ben", "abc@john.com", "040370102", 436),
    new Customer("Mr", "Sam", "abc@john.com", "041171402", 936),
    new Customer("Ms", "Lyn", "abc@john.com", "04037002", 366),
    new Customer("Mrs", "Brown", "abc@john.com", "040370402", 236)]})
  }
  compare(a, b) {
    if (isNaN(a) && typeof a === "string") return a.localeCompare(b);
    else if (!isNaN(a)) return a - b;
  };
  
  //order customers
  onClickFilter(isAscending, sortbyfield){
      this.setState(prevState=>{
        if (sortbyfield){
          const attr = sortbyfield.toLowerCase(sortbyfield)
          const sortedCustomer = prevState.sortedCustomer.sort((a, b) => { 
          return isAscending
            ? this.compare(a[attr], b[attr])
            : this.compare(b[attr], a[attr]);
        });
        return({sortedCustomer})  
        }
         
  })
}
  
  // search customers
  handleSearch (filterString){
    this.setState((prevState)=>{
      
      console.log(filterString);
      const sortedCustomer = prevState.sortedCustomer.filter(item=>{
        for(var attri in item){
          if(isNaN(item[attri])&& item[attri].toLowerCase().includes(filterString)){
            return true
          }
          if(!isNaN(item[attri]) && typeof item[attri] === "string" && item[attri].includes(filterString)){
            return true
          }
          if (item[attri] === filterString) return true
        }
      })
  
      return ({sortedCustomer})
    })
   

  }

    // To Do
  // render customers
  /*
  Expected result
  Title| Name| Mobile|  Email
  */
  render(){
    return(
      <div>
        <Search 
          handleSearch={this.handleSearch}
          reset={this.resetSortedCustomerList}

        /> 
        {
          this.filterValues.map( f=> <Filter 
            attr={f}
            id={f}
            onClick={this.onClickFilter}
            reset={this.resetSortedCustomerList}          
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
            list={this.state.sortedCustomer}     
          />
  
          }
        </table>
      </div>
    )  
  }
}

class Filter extends React.Component {
  constructor(props){
    super(props)
    this.state={
      "order":false
    }
  }

  toggleOrder(o){
    this.setState((preveState)=>({"order":!preveState.order}));
  }

  render(){
    return (
      <button 
      className="filter" 
      // style={{backgroundColor: colors[props.status]}}
      onClick={
        () => {
          console.log(this.props.attr)
          if(this.props.attr === "Default"){
            this.props.reset();
          }
          else{
            console.log(this.props.attr);
            this.toggleOrder(this.state.order);
            this.props.onClick(this.state.order, this.props.attr);
    
          }
        }
      }
      >
      {this.props.attr}
      </button>
      )
  }
}
  


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


// class Search extends React.Component{
//   constructor(props){
//     super(props)
//     this.searchString=this.searchString.bind(this)
//   }
//    searchString (){
//     console.log(filterString);
//     const filterString = document.getElementById("searchvalue").value.trim();;
//     console.log(filterString);
//     this.props.handleSearch(filterString)
//   }
//   render (){
//     return(

//     <div >
//       <input type="text" name="search" id="searchvalue"/>
//       <button onClick={this.searchString}>search</button>   
//       <button onClick={this.props.reset}>Show All</button>  
//     </div>
//     )
//   }

// }

const Search = (props)=>{
  const searchString= ()=> {
    console.log(filterString);
    const filterString = document.getElementById("searchvalue").value.trim();;
    console.log(filterString);
    props.handleSearch(filterString)
    document.getElementById("searchvalue").value="";
  }
  return(

    <div >
      <input type="text" name="search" id="searchvalue"/>
      <button onClick={searchString}>search</button>   
      <button onClick={props.reset}>Show All</button>  
    </div>
    )
}