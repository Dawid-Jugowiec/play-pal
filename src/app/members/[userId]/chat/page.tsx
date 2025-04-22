import React from 'react';
import { CardBody, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { getMemberByUserId } from '@/app/actions/memberActions';
import { notFound } from 'next/navigation';

export default async function ChatPage({params}: {params: Promise<{userId: string}>}) {
    const { userId } = await params;
    
    const member = await getMemberByUserId(userId);
    if (!member) return notFound();
  return (
    <>
        <CardHeader className='text-2xl font-semibold text-secondary'>
            Chat
        </CardHeader>
        <Divider />
        <CardBody>
            Chat goes here
        </CardBody>
    </>
  )
}
