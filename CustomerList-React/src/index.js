import React from 'react'; // JSX will be converted to react calls hence need to import react
import ReactDOM from 'react-dom';

import CustomerService from './components/CustomerService';

ReactDOM.hydrate(
  <CustomerService />,
  document.getElementById('mountNode')
);