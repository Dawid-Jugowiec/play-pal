import React from 'react'
import MessagesSideBar from './MessagesSideBar'
import { getMessagesByContainer } from '../actions/messageActions'
import MessagesTable from './MessagesTable';

export default async function MessagesPage({searchParams}: {searchParams: Promise<{container:string}>}) {
  const {container} = await searchParams;
  const messages = await getMessagesByContainer(container);
  
    return (
      <div className='grid grid-cols-12 gap-5 h-[80vh] mt-10'>
        <div className='col-span-2'>
          <MessagesSideBar />
        </div>
        <div className='col-span-10'>
          <MessagesTable initialMessages={messages} />
        </div>
      </div>
    )
}
