"use client"

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { Label } from '@radix-ui/react-label';
import { Card, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Alert from '@/components/Alert';

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginCard() {
    const [error, setError] = useState("")

    const router = useRouter();
    
    const { register, handleSubmit } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    console.log(data);
    
    try {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false, // Prevent automatic redirection
      });
      if(res?.error) return setError(res.error);
      router.replace('/profile');

      router.push('/profile'); // Redirect manually if login is successful
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='flex h-screen items-center justify-center'>
      <Card className='w-[350px] p-3'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className='text-center text-2xl'>Login</CardHeader>
            {error ? (
                <div>
                    <Alert value={error}/>
                </div>
            ): null}
          <Label htmlFor='email'>Email</Label>
          <Input
            type='text'
            placeholder='Email'
            id='email'
            {...register('email', { required: true })}
          />

          <Label htmlFor='password'>Password</Label>
          <Input
            type='password'
            placeholder='Password'
            id='password'
            {...register('password', { required: true })}
          />
          <Button type='submit' className='mt-5 w-full p-3'>
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}
