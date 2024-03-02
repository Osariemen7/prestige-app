import React, {useState, useEffect} from 'react';
import './App.css';
import ScreenLoad from './components/opening';
import LandPage from './components/landing';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/login';
import Signup from './components/signup';
import Verify from './components/verify';
import RegisterPage from './components/register';
import PersonalPage from './components/personal';
import Select from './components/select';
import ThankPage from './components/Thanks';
import Dashboard from './components/dash';
import FundPage from './components/fund';
import TokenPage from './components/token';
import ProjectPage from './components/project';
import PopPage from './components/pop';
import CreatePage from './components/createp';
import AddPage from './components/Addlist';
import ListPage from './components/listp';
import Frequent from './components/frequent';
import Accounts from './components/accounts.jsx';
import Transact from './components/transact';
import Pro from './components/pro';
import Club from './components/club';
import CreateClub from './components/cclub';
import Join from './components/joinc'
import Fclub from './components/fclub'
import PostMon from './components/getgrp2';
import Receipt from './components/getrec';
import GetGroup from './components/getgroup';
import Overdraft from './components/overdraft';
import Request from './components/overd';
import Display from './components/odisplay';
import Done from './components/odip';
import Save from './components/save';
import Savings from './components/savings';
import Detail from './components/detail'
import Customer from './components/customer';
import Cusdet from './components/cusdet';
import Recdet from './components/Receipt';
import Resident from './components/resident';
import Business from './components/rebout';
import Bud from './components/reboard';
import Credit from './components/credit';
import Invoice from './components/invoice';
import ProDe from './components/prodet';
import Product from './components/product';
import Inventory from './components/inventory';
import BuyP from './components/before';
import Sales from './components/pinvoice';
import Review from './components/review'
import Chat from './components/chat';
import Sale from './components/dashboard';
import Expense from './components/expense';
import Revenue from './components/revenue';
import People from './components/people'
import ProductAnalytics from './components/productanalytic';
import CustAnalytics from './components/customanalytics';
import SalesAnalytics from './components/salesanalytics';
import Getloy from './components/getloy';
import Loydet from './components/getdet';
import CreateLoyalty from './components/custloy';
import Enter from './cashback.jsx';
import Loyalty from './components/loyalty';
import View from './components/view';
import SalesVerify from './components/salesverify';
import Update from './components/update';
import Last from './components/last'
import SalesInvoice from './components/eventory';
import Tinvoice from './components/tinvoice.jsx';
import TransferVerify from './components/transferverify.jsx';
import Dailysh from './components/customer/dailyTransact.jsx';
import CustLog from './components/customer/custlog.jsx';
import Hat from './components/test.jsx';
import SuccessPage from './components/success.jsx';
import './components/analytics.js'
import './components/test.jsx'
import './components/support.jsx'
import Foam from './waitlist.jsx';
import WaitlistPage from './waitlistsuccess.jsx';

import { Analytics } from '@vercel/analytics/react';
import Support from './components/support.jsx';
function App() {
  const [loading, setLoading] = useState(true)
  
 
  
    useEffect(() => {
    setTimeout(() => setLoading(false), 3000)
  }, [])
  return (
    <>
         {loading === false ? (
    
    <div className="App">
     <Routes>
        <Route path='/' element={<LandPage />}/>
        <Route path='/components/login' element={<LoginPage />}/>
        <Route path='/components/signup' element={<Signup />}/> 
        <Route path='/components/verify' element={<Verify />}/> 
        <Route path= '/components/register' element={<RegisterPage />} />
        <Route path= '/components/personal' element ={<PersonalPage />} />
        <Route path= '/components/frequent' element={<Frequent />} />
        <Route path= '/components/thanks' element={<ThankPage />} />
        <Route path='/components/dash' element={<Dashboard />} />
        <Route path='/components/fund' element={<FundPage />} />
        <Route path= '/components/token' element={<TokenPage />} />
        <Route path='/components/project' element={<ProjectPage />} />
        <Route path='/components/pop' element={<PopPage />} />
        <Route path='/components/createp' element={<CreatePage />} />
        <Route path='/components/Addlist' element={<AddPage />} />
        <Route path='/components/listp' element={<ListPage />} />
        <Route path='/components/select' element={<Select />} />
        <Route path='/components/accounts' element={<Accounts />} />
        <Route path="/components/transact" element={<Transact />} />
        <Route path ='/components/Addlist' element={<Transact />} />
        <Route path='/components/pro' element={<Pro />} />
        <Route path='/components/club' element={<Club />}/>
        <Route path='/components/joinc' element={<Join />} />
        <Route path='/components/cclub' element={<CreateClub />} />
        <Route path='/components/fclub' element={<Fclub />} />
        <Route path='/components/getgrp2' element={<PostMon />} />
        <Route path='/components/getrec' element={<Receipt />} />
        <Route path='/components/getgroup' element={<GetGroup />} />
        <Route path='/components/overdraft' element={<Overdraft />} />
        <Route path='/components/overd' element={<Request />} />
        <Route path='/components/odisplay' element={<Display />} />
        <Route path='/components/odip' element={<Done />} />
        <Route path='/components/save' element={<Save />} />
        <Route path='/components/savings' element={<Savings />} />
        <Route path='/components/detail' element={<Detail />} />
        <Route path='/components/customer' element={<Customer />} />
        <Route path='/components/cusdet' element={<Cusdet />} />
        <Route path='/components/Receipt' element={<Recdet />} />
        <Route path='/components/resident' element={<Resident />} />
        <Route path='/components/rebout' element={<Business />} />
        <Route path='/components/reboard' element={<Bud />} />
        <Route path='/components/credit' element={<Credit />} />
        <Route path='/components/inventory' element={<Inventory />} />
        <Route path='/components/product' element={<Product />} />
        <Route path='/components/prodet' element={<ProDe />} /> 
        <Route path='/components/invoice' element={<Invoice />} /> 
        <Route path='/components/before' element={<BuyP />} /> 
        <Route path='/components/pinvoice' element={<Sales />} />
        <Route path='/components/review' element={<Review />} />
        <Route path='/components/chat' element={<Chat />} />  
        <Route path='/components/dashboard' element={<Sale />} />
        <Route path='/components/expense' element={<Expense />} />
        <Route path='/components/revenue' element={<Revenue />} />
        <Route path='/components/people' element={<People />} />
        <Route path='/components/productanayltic' element={<ProductAnalytics />} />
        <Route path='/components/salesanalytics' element={<SalesAnalytics />} />
        <Route path='/components/customanalytics' element={<CustAnalytics />} />
        <Route path='/components/getloy' element={<Getloy />} />
        <Route path='/components/getdet' element= {<Loydet />} />
        <Route path='/components/custloy' element={<CreateLoyalty />} />
        <Route path= '/cashback' element={<Enter/>} />
        <Route path='/components/loyalty' element={<Loyalty />} />
        <Route path='/components/view' element={<View />} />
        <Route path='/components/salesverify' element={<SalesVerify />} />
        <Route path='/components/update' element={<Update />} />
        <Route path='/components/last' element={<Last />} />
       <Route path='/components/eventory' element={<SalesInvoice />} /> 
         <Route path='/components/tinvoice' element={<Tinvoice />} />
         <Route path='/components/transferverify' element={<TransferVerify />} />
       <Route path='/components/customer/dailyTransact' element={<Dailysh />} />
        <Route path='/components/customer/custlog' element={<CustLog />} />
        <Route path='/components/success' element={<SuccessPage />} />
        <Route path='/components/test' element={<Hat />} />
        <Route path='/components/support' element={<Support />} />
        <Route path='/waitlist' element={<Foam />} />
        <Route path='/waitlistsuccess' element={<WaitlistPage />} />

     </Routes>
      
    </div>
    ) : (
        <ScreenLoad/>
      )}
      <Analytics />
      </>
  );
}


export default App;
