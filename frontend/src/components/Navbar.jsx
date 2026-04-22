import {Link} from 'react-router'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

function Navbar() {
return (
    <nav className='navbar sticky top-0 bg-gray-100/80 flex justify-between items-center'>
        <a className='text-xl font-bold' href='/'>CodeHouse</a>
        <div className='flex items-center gap-5'>
            <Link className='text-gray-700 hover:text-blue-500' to='/'>Home</Link>
            <Link className='text-gray-700 hover:text-blue-500' to='/dashboard'>Dashboard</Link>
            <Show when="signed-out">
                <SignInButton fallbackRedirectUrl='/dashboard' mode='modal'><button className='btn btn-primary rounded-lg'>Login / Register</button></SignInButton>
            </Show>
            <Show when="signed-in">
                <UserButton />
            </Show>
        </div>
    </nav>
)}

export default Navbar