'use client'

import { CardHeader, Divider, CardBody, CardFooter } from '@heroui/react'
import React, { ReactNode } from 'react'

type Props = {
    header: ReactNode | string;
    body: ReactNode;
    footer?: ReactNode;
}

export default function CardInnerWrapper({header, body, footer}: Props) {
  return (
    <>
        <CardHeader>
            {typeof (header) === 'string' ? (
                <div className='text-2xl font-semibold text-secondary'>
                    {header}
                </div>
            ) : (
                <div>
                    {header}
                </div>
            )}
        </CardHeader>
        <Divider />
        <CardBody>
            {body}
        </CardBody>
        {footer && (
            <CardFooter>
                {footer}
            </CardFooter>
        )}
    </>
  )
}
