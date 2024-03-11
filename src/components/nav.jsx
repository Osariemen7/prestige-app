import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';


export const Nav =()=> {
const navigate = useNavigate()
  const [sidebar, setSidebar] = useState('')
  const [showMoreItems, setShowMoreItems] = useState(false);

  const showMore = () => {
    setShowMoreItems(!showMoreItems);
  };
  const showSidebar = () => setSidebar(!sidebar)
  let tok= JSON.parse(localStorage.getItem("user-info"));
   
  let sub_account = tok.user.has_default_sub_accounts
  const subAccount = () => {
    const redirectTo = sub_account ? '/components/savings' : '/components/reboard';
    navigate(redirectTo);
  };
  
  return(
    <div>
        <i onClick={showSidebar} class="fa-solid fa-bars ac"></i>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-item'>
                    <li className='nav-close'>
                    <i onClick={showSidebar} class="fa-solid fa-x"></i>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/inventory' className='nav-text'><i class="fa-solid fa-house"></i>
                      <p className='dfp'>Home</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/accounts' className='nav-text'><i class="fa-solid fa-wallet home"></i>
                      <p className='dfp'>Account</p></Link>
                    </li>
                    <li className='nav-list'>
                    <div onClick={subAccount} className='nav-text'><i class="fa-solid fa-money-bill"></i>
                      <p className='dfp'>Sub-Account</p></div>
                    </li>  
                    <li className='nav-list'>
                    <Link to='/components/product' className='nav-text'><i class="fa-solid fa-cart-flatbed"></i>
                      <p className='dfp'>Inventory</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/customer' className='nav-text'><i class="fa-solid fa-people-roof"></i>
                      <p className='dfp'>Customers</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/dash' className='nav-text'><i class="fa-solid fa-chart-line"></i>
                    <p className='dfp'>Analytics</p></Link>
                    </li>
                   
                    <li className='nav-list'>
                    <Link to='/components/chat' className='nav-text'><i class="fa-solid fa-user-tie"></i>
                  <p className='dfp'>Assistant</p></Link>
                    </li>

                    <li className='nav-list' onClick={showMore}>
        <Link className='nav-text'>
        <i class="fa-solid fa-caret-down"></i>
        <p className='dfp'>More</p>
        </Link>
      </li>
      
      {showMoreItems && (
        <div>
        <li className='nav-list'>
            <Link to='/components/support' className='nav-text'>
            <i class="fa-solid fa-phone"></i>
              <p className='dfp'>Support & Referral</p>
            </Link>
          </li>
          <li className='nav-list'>
            <Link to='/components/login' className='nav-text'>
              <i className="fa-solid fa-share"></i>
              <p className='dfp'>Log Out</p>
            </Link>
          </li>
        </div>
      )} 
                </ul>
            </nav>
      
    </div>
  )
}
export const ShareApp = ({ inviteCode }) => {
    const handleShare = () => {
      if (navigator.share) {
        navigator.share({
          title: 'Prestige Finance',
          text: `Sign up on prestige finance!, use invite code ${inviteCode}`,
          url: 'https://play.google.com/store/apps/details?id=co.prestigefinance.biz',
        })
          .then(() => console.log('App shared successfully.'))
          .catch((error) => console.log('Error sharing app:', error));
      } else {
        console.log('Web Share API is not supported in this browser.');
      }
    };;
  
    return (
        <ChakraProvider>
      <Button colorScheme='blue' w='35%'  onClick={handleShare}>Share</Button>
      </ChakraProvider>
    );
  };
  
  