'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactSchema, ContactInput } from '@/lib/schemas';
import axiosClient from '@/lib/axiosClient';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactInput>({ resolver: zodResolver(ContactSchema) });

  const onSubmit = async (data: ContactInput) => {
    const res = await axiosClient.post('/api/contact', data);
    if (res.status === 200) {
      reset();
    }
  };

  return (
    <div className="container max-w-xl">
      <h1 className="mb-4 text-3xl font-bold">Contact Us</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input className="mt-1 w-full rounded border p-2" {...register('name')} />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input className="mt-1 w-full rounded border p-2" type="email" {...register('email')} />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea className="mt-1 w-full rounded border p-2" rows={5} {...register('message')} />
          {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
        {isSubmitSuccessful && <p className="text-green-700">Thanks! We will be in touch.</p>}
      </form>
    </div>
  );
}

