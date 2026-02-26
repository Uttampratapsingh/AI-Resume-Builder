import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader';
import Login from './Login';
import { useSelector } from 'react-redux';

const Layout = () => {

  const {user,loading} = useSelector(state => state.auth); // here we are using the useSelector hook to get the user and loading state from the auth slice of the redux store. this will allow us to conditionally render the navbar based on whether the user is logged in or not.

  if(loading){
    return <Loader/>;
  }

  return (
    <> 
    {
      user ? 
      <div className='min-h-screen bg-gray-50'>
        <Navbar/>
        <Outlet/>
      </div>
      :
      <Login/>
    }
    
    </>
  )
}

export default Layout