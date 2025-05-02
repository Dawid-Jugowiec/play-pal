import { Spinner } from '@heroui/react'
import React from 'react'

export default function LoadingComponent({label}: {label?: string}) {
  return (
    <div className='justify-center items-center vertical-center'>
        <Spinner 
            label={label || 'Loading...' }
            color='secondary'
            labelColor='secondary'
        />
    </div>
  )
}
