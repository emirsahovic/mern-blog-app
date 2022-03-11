import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUser, FaBlogger } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="bg-sky-500 p-4">
            <div className="container mx-auto flex items-center justify-between flex-wrap ">
                <Link to='/dashboard' className='flex items-center'>
                    <h2 className="text-white font-bold text-xl mr-2">Blog</h2>
                    <FaBlogger className='text-3xl text-white pt-1' />
                </Link>
                <div className='flex space-x-8'>
                    <Link to='/login' className='text-white font-semibold text-lg flex items-center'>
                        <FaSignInAlt className='mr-2' /> Login
                    </Link>
                    <Link to='/' className='text-white font-semibold text-lg flex items-center'>
                        <FaUser className='mr-2' /> Register
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
