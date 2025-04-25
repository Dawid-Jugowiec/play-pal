import React from 'react';
import { Image } from '@heroui/image';

import { getMembersPhotosByUsersId } from '@/app/actions/memberActions';
import { notFound } from 'next/navigation';
import { transformImageUrl } from '@/lib/util';
import CardInnerWrapper from '@/components/CardInnerWrapper';


export default async function PhotosPage({params}: {params: Promise<{userId: string}>}) {
    const { userId } = await params;
    
    const photos = await getMembersPhotosByUsersId(userId);
    if (!photos) return notFound();
  return (
    <>
        <CardInnerWrapper 
            header="Photos"
            body={<div className='grid grid-cols-5 gap-3'>
                {photos && photos.map(photo => (
                    <div key={photo.id}> 
                        <Image 
                            width={300}
                            src={transformImageUrl(photo.url) ?? undefined}
                            alt='Image of the member'
                            className='object-cover aspect-square'
                        />
                    </div>
                ))}
           </div>}
        />
    </>
  )
}
