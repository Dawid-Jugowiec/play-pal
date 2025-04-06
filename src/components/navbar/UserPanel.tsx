
'use client'

import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from '@heroui/react';
import { Session } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import { signOutUser } from '@/app/actions/authActions';

type Props = {
    user: Session['user']
}


export default function UserPanel({user}: Props) {
    return (
        <Dropdown placement='bottom-end'> 
            <DropdownTrigger>
                <Avatar 
                    isBordered
                    as='button'
                    className='transition-transform'
                    color='secondary'
                    name={user?.name || 'user avatar'}
                    size='sm'
                    src={user?.image || '/images/user.png'}
                />
            </DropdownTrigger>
            <DropdownMenu variant='flat' aria-label='User actions menu'>
                <DropdownSection showDivider>
                    <DropdownItem key='signInAs' isReadOnly as='span' className='h-14 flex flex-row' aria-label='username'>
                        Signed in as {user?.name}
                    </DropdownItem>
                    <DropdownItem key='editProfile' as={Link} href='/members/edit'>
                        EditProfile
                    </DropdownItem>
                    <DropdownItem key='logout' color='danger' onPress={async () => signOutUser()}>
                        Logout
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    )
}
