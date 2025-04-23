'use client'

import React from 'react';
import { RegisterSchema, registerSchema } from '@/lib/schemas/registerSchema';
import { Button, Card, CardBody, CardHeader, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { GiPadlock } from 'react-icons/gi';
import { registerUser } from '@/app/actions/authActions';
import { handleFormServerErrors } from '@/lib/util';

export default function RegisterForm() {
    const { register, handleSubmit, setError, formState: {errors, isValid, isSubmitting} } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: 'onTouched'
    });

    const onSubmit = async (data: RegisterSchema) => {
        const result = await registerUser(data);
        
        if(result.status === 'success') {
            console.log("User registered successfully");
        } else {
           handleFormServerErrors(result, setError);
        }
    };

    return (
        <Card className='w-2/5 mx-auto'> 
            <CardHeader className='flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center text-secondary'>
                    <div className='flex flex-row items-center gap-3'>
                        <GiPadlock size={30} />
                        <h1 className='text-3xl font-semibold'>Login</h1>
                    </div>
                    <p className='text-neutral-500'>Welcome back to the PlayPal</p>
                </div>
            </CardHeader>
            <CardBody>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className='space-y-4'>
                        <Input
                            defaultValue='' 
                            label='Name'
                            variant='bordered'
                            {...register('name')}
                            isInvalid={!!errors.name}
                            errorMessage={errors.name?.message}
                        />
                        <Input
                            defaultValue='' 
                            label='Email'
                            variant='bordered'
                            {...register('email')}
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message}
                        />
                        <Input 
                            defaultValue=''
                            label='Password'
                            variant='bordered'
                            type='password'
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message}
                            {...register('password')}
                        />
                        {errors.root?.serverError && (
                            <p className='text-danger text-sm'>{errors.root.serverError.message}</p>
                        )}
                        <Button 
                            isDisabled={!isValid} 
                            fullWidth 
                            color='secondary' 
                            type='submit'
                            isLoading={isSubmitting}
                        >
                            Register
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}
