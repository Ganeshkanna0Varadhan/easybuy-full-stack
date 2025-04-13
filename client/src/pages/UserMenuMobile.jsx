import React, { } from 'react'
import UserMenu from '../component/userMenu'
import { IoClose } from 'react-icons/io5'

const UserMenuMobile = () => {

    return (
        <section className='bg-white h-full py-8'>
            <button onClick={() => { window.history.back()}} className='text-neutral-800 block w-fit ml-auto mx-1'>
                <IoClose size={28}/>
            </button>
            <div className='container mx-auto px-3 pb-8'>
                <UserMenu/>
            </div>
        </section>
    )
}

export default UserMenuMobile