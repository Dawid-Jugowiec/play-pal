

import { Navbar, NavbarBrand, NavbarContent } from '@heroui/navbar'
import { Button } from '@heroui/button';
import Link from 'next/link'
import React from 'react'
import { GiMatchTip } from 'react-icons/gi'
import NavLink from './NavLink'
import { auth } from '@/auth'
import UserPanel from './UserPanel';
import { getUserInfoForNav } from '@/app/actions/userActions';

export default async function TopNav() {
    const session = await auth();
    const userInfo = session?.user && await getUserInfoForNav();
   
  return (
    <Navbar
        maxWidth='xl'
        className='bg-gradient-to-r from-blue-400 to-blue-600'
        classNames={{
            item: [
                'text-xl',
                'text-white',
                'uppercase',
                'data-[active=true]:text-yellow-200'
            ]
        }}
    >  
        <NavbarBrand as={Link} href='/'>
            <GiMatchTip size={40} className='text-gray-200'/>
            <div className='font-bold text-3xl flex'>   
                <span className='text-gray-900'>Play</span>   
                <span className='text-gray-200'>Pal</span>   
            </div>
        </NavbarBrand>
        <NavbarContent justify='center'>
            <NavLink href='/members' label='Matches'/>
            <NavLink href='/lists' label='Lists'/>
            <NavLink href='/messages' label='Messages'/>
        </NavbarContent>
        <NavbarContent justify='end'>
            {userInfo ? (
                <UserPanel userInfo={userInfo} />
            ):(
                <>
                    <Button as={Link} href='/login' variant='bordered' className='text-white'>
                        Login
                    </Button>
                    <Button as={Link} href='/register' variant='bordered' className='text-white'>
                        Register
                    </Button>
                </>
            )}
            
        </NavbarContent>
    </Navbar>
  )
}
