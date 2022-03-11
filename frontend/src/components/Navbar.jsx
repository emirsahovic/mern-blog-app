import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { FaSignOutAlt, FaSignInAlt, FaUser, FaBlogger } from 'react-icons/fa';

const Navbar = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
    }

    return (
        <nav className="bg-sky-500 p-4">
            <div className="container mx-auto flex items-center justify-between flex-wrap ">
                {user ? (
                    <>
                        <Link to='/dashboard' className='flex items-center'>
                            <h2 className="text-white font-bold text-xl mr-2">Blog</h2>
                            <FaBlogger className='text-3xl text-white pt-1' />
                        </Link>
                        <div className='flex space-x-8 items-center'>
                            <p className='text-white font-bold'>Hello, {user.name} |</p>
                            <button onClick={onLogout} className='text-white font-semibold text-lg flex items-center hover:opacity-75'>
                                <FaSignOutAlt className='mr-2' /> Logout
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to='/dashboard' className='flex items-center'>
                            <h2 className="text-white font-bold text-xl mr-2">Blog</h2>
                            <FaBlogger className='text-3xl text-white pt-1' />
                        </Link>
                        <div className='flex space-x-8'>
                            <Link to='/login' className='text-white font-semibold text-lg flex items-center hover:opacity-75'>
                                <FaSignInAlt className='mr-2' /> Login
                            </Link>
                            <Link to='/' className='text-white font-semibold text-lg flex items-center hover:opacity-75'>
                                <FaUser className='mr-2' /> Register
                            </Link>
                        </div>
                    </>
                )}
            </div >
        </nav >
    )
}

export default Navbar;
