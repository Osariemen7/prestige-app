import { Link } from "react-router-dom";

const Fclub =()=> {
    return (
        <div>
          <h3 className='head'>Community</h3>  
          <p className='cl'>Join or Create a lending group</p>
          <p className='clt'>You have no active plan yet. Click on button to create plan</p>
          <div>
           <Link to='/components/cclub'> <button className='but1'>Create Club</button></Link>
           <Link to='/components/joinc'> <button className='cut'>Join an existing Club</button></Link>
          </div>
          <footer className='dflex2'>
                <div>
                <Link to='/components/dash'><i class="fa-solid fa-house home"></i></Link>  
                  <p className='dfp'>Home</p>
                </div>
                <div>
                <Link to='/components/project'><i class="fa-solid fa-layer-group home"></i></Link>
                  <p className='dfp'>Project</p>
                </div>
                <div>
                  <i class="fa-solid fa-people-group home1"></i>
                  <p className='dfp'>Club</p>
                </div>
                <div>
                <Link to='/components/accounts'><i class="fa-solid fa-wallet home"></i></Link>
                  
                  <p className='dfp'>Account</p>
                </div> 
            </footer>
        </div>
    )
}
export default Fclub