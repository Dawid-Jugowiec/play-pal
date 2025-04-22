import { Spinner } from '@heroui/react'
import React from 'react'

export default function LoadingComponents({label}: {label?: string}) {
  return (
    <div className='fixed inset-0 justify-center items-center'>
        <Spinner 
            label={label || 'Loading...' }
            color='secondary'
            labelColor='secondary'
        />
    </div>
  )
}
