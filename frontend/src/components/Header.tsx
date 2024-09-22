"use client";

import React from 'react'
import { getStrapiData } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Jua } from 'next/font/google'
import { getUserMeLoader } from '@/services/user';
import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { logoutAction } from '@/actions/auth-actions';

const jua = Jua({
  weight: ['400'],
  subsets: ['latin'],
  style: ['normal'],
  variable: '--font-jua',
});


export const Header = async () => {
  const res = await getStrapiData("/api/general-information");
  const metadata = res.data.attributes;

  const user = await getUserMeLoader();

  let avatar: any;

  if (user.ok) {
    avatar = createAvatar(thumbs, {
      seed: user.data.username,
    });
  }

  return (
    <header className={`w-full py-4 px-8 flex items-center ${user.ok ? "justify-between" : "justify-center"}`}>
        <div className="w-10" />
        <div className='flex flex-col items-center'>
          <h1 className="text-3xl text-primary font-bold" style={{ fontFamily: 'var(--font-jua)' }}>{metadata.Title}</h1>
          { metadata.Tagline && (
            <p className='text-muted-foreground'>{metadata.Tagline}</p>
          )}
        </div>
        { user.ok && (
          <form action={logoutAction} id='logout'>
          <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Avatar className="w-10 h-10">
            <AvatarImage className='rounded-full' src={avatar.toDataUri()} alt="User avatar" />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{user.data.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => {
              const form = document.getElementById('logoutForm') as HTMLFormElement;
              form.submit();
            }}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </form>)}
  </header>
  )
}