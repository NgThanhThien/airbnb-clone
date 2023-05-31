/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { use, useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';
import { AiFillGithub, AiFillFacebook } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-toastify';
import Button from '../Button';
import useLoginModal from '@/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import useRegisterModal from '@/hooks/useRegisterModal';
const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success('Logged In');
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };
  const handleOpenRegister = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, []);
  const bodyContent = (
    <div className="tw-flex tw-flex-col tw-gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Login to your account" />
      <Input
        id="email"
        label="Email"
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
        First time using Airbnb?{' '}
        <span
          className="tw-font-semibold tw-cursor-pointer"
          onClick={handleOpenRegister}
        >
          Create an account
        </span>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
