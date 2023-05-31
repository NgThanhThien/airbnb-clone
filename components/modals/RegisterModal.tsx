/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { use, useCallback, useState } from 'react';
import axios from 'axios';
import { AiFillGithub, AiFillFacebook } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-toastify';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/hooks/useLoginModal';
const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/register', data)
      .then(() => {
        toast.success('Success');
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false));
  };
  const handleOpenLogin = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, []);
  const bodyContent = (
    <div className="tw-flex tw-flex-col tw-gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create a new account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
  const footerContent = (
    <div className="tw-flex tw-flex-col tw-gap-4">
      <div className="tw-relative tw-mt-4 after:tw-absolute after:tw-left-0 after:tw-right-0 after:tw-top-1/2 after:tw-h-[1px] after:tw-w-full after:tw-bg-neutral-300 after:tw-z-[1] tw-flex tw-justify-center">
        <span className="tw-px-2 tw-bg-white tw-z-10 tw-inline-block">or</span>
      </div>
      <Button
        outline
        label="Continue with Facebook"
        onClick={() => signIn('facebook')}
        icon={AiFillFacebook}
      />
      <Button
        outline
        label="Continue with Google"
        onClick={() => {}}
        icon={FcGoogle}
      />
      <Button
        outline
        label="Continue with Github"
        onClick={() => signIn('github')}
        icon={AiFillGithub}
      />
      <div className="tw-mt-4 tw-text-center">
        Already have an account?{' '}
        <span
          className="tw-font-semibold tw-cursor-pointer"
          onClick={handleOpenLogin}
        >
          Login
        </span>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
