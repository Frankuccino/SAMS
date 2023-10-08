"use client"

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import Alert from '@/components/Alert';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '@/schemas';
import axios from 'axios';
import { z } from "zod";
import { useRouter } from 'next/navigation';

import { DevTool } from '@hookform/devtools';

type RegisterFormData = z.infer<typeof userSchema>;

const RegisterCard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }, 
    control
  } = useForm<RegisterFormData>({
    resolver: zodResolver(userSchema),
  });
  
  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    // console.log(data); // You can submit the data to your API or perform other actions here
    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/register", data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (res.status === 200) {
      console.log('Registration Successfull', res.data);
      reset()
      router.push('/')
      } else {
      console.log('Registration failed', res.data);
      }
    } catch (error: any) {
      console.log('An error occured', error);
      setError(error.response.data.error)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
    }
  };

  const content = (
    <Card className='w-[600px] p-5'>
      <CardTitle className='text-center'>Register</CardTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error ? (
              <div>
                  <Alert value={error}/>
              </div>
          ): null}
        <div className='mt-5 grid grid-cols-2 gap-4'>
          <div>
            <Label htmlFor='email'>Email</Label>
            <Input
              className={`${errors.email ? 'text-destructive' : ''}`}
              type='email'
              id='email'
              placeholder='example@email.com'
              {...register('email')}
            />
            <CardDescription className='text-destructive'>
              {errors.email && errors.email?.message}
            </CardDescription>
          </div>
          <div>
            <Label htmlFor='username'>Username</Label>
            <Input
              className={`${errors.username ? 'text-destructive' : ''}`}
              id='username'
              placeholder='username'
              {...register('username')}
            />
            <CardDescription className='text-destructive'>
              {errors.username && errors.username?.message}
            </CardDescription>
          </div>
        </div>
  
        <div className='mt-5 grid grid-cols-2 gap-4'>
          <div>
            <Label htmlFor='firstname'>First Name</Label>
            <Input 
              className={`${errors.firstName ? 'text-destructive' : ''}`}
              id='firstname' 
              placeholder='First Name' 
              {...register('firstName')} />
            <CardDescription className='text-destructive'>
              {errors.firstName && errors.firstName?.message?.slice(7)}
            </CardDescription>
          </div>
          <div>
            <Label htmlFor='lastname'>Last Name</Label>
            <Input
              className={`${errors.lastName ? 'text-destructive' : ''}`} 
              id='lastname' 
              placeholder='Last Name' 
              {...register('lastName')} />
            <CardDescription className='text-destructive'>
              {errors.lastName && errors.lastName?.message?.slice(7)}
            </CardDescription>
          </div>
        </div>

        <div className='mt-5'>
          <Label htmlFor='password'>Password</Label>
          <Input
            className={`${errors.password ? 'text-destructive' : ''}`}
            type='password'
            id='password'
            placeholder='password'
            {...register('password')}
          />
          <CardDescription className='text-destructive'>
            {errors.password && errors.password?.message}
          </CardDescription>
        </div>

        <div className='mt-5'>
          <Label>Select Role</Label>
          <Controller
            name='role'
            control={control}
            render={({ field }) => (
              <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder='Select a role' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='user'>User</SelectItem>
                  <SelectItem value='staff'>Staff</SelectItem>
                  <SelectItem value='manager'>Manager</SelectItem>
                  <SelectItem value='admin'>Admin</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <CardDescription className='text-destructive'>{errors.role && errors.role?.message}</CardDescription>
        </div>
  
        <Button
          type='submit'
          disabled={isLoading}
          className={`mt-5 w-full bg-yellow-300 ${isLoading ? 'bg-yellow-600' : ''}`}
        >
          {isLoading ? <Loader2 className='animate-spin' /> : 'Submit'}
        </Button>
      </form>
    </Card>
  );
  

return content
};

export default RegisterCard;
