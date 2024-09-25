"use client";

import React, { useEffect, useState } from 'react'
import { getStrapiData, getStrapiURL } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Jua } from 'next/font/google'
import { createAvatar } from '@dicebear/core';
import type { Result } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { FileSliders, LogOut } from 'lucide-react';
import { logoutAction } from '@/actions/auth-actions';
import { getUserMeLoaderClient } from '@/services/userLocal';
import { IUser } from '@/interfaces/IUser';

const jua = Jua({
  weight: ['400'],
  subsets: ['latin'],
  style: ['normal'],
  variable: '--font-jua',
});

export const Header = () => {
  const [metadata, setMetadata] = useState<{title: string, tagline: string | null} | null>(null);
  const [user, setUser] = useState<IUser>({ok: false, data: null, error: null});
  const [avatar, setAvatar] = useState<Result | null>(null);

  useEffect(() => {
    getStrapiData("/api/general-information")
      .then((res) => setMetadata({
        title: res.data.Title,
        tagline: res.data.Tagline === "" ? null : res.data.Tagline
      }));

    getUserMeLoaderClient()
      .then((user) => setUser(user));
  }, []);

  useEffect(() => {
    if (user.ok) {
      const res = createAvatar(thumbs, {
        seed: user.data.username,
      });

      setAvatar(res);
    }
  }, [user]);

  if (!metadata)
    return (<header></header>);

  return (
    <header className={`w-full py-4 px-8 flex items-center ${(user.ok && avatar) ? "justify-between" : "justify-center"}`}>
        { (user.ok && avatar) && (
          <div className="w-10" />
        )}
        <div className='flex flex-col items-center'>
          <h1 className="text-3xl text-primary font-bold" style={{ fontFamily: 'var(--font-jua)' }}>{metadata.title}</h1>
          { metadata.tagline && (
            <p className='text-muted-foreground'>{metadata.tagline}</p>
          )}
        </div>
        { (user.ok && avatar) && (
            <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Avatar className="w-10 h-10">
            <AvatarImage className='rounded-full' src={avatar.toDataUri()} alt="User avatar" />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <form action={logoutAction} id="logoutForm">
          <DropdownMenuLabel>{user.data.username} ({user.data.email})</DropdownMenuLabel>
          <DropdownMenuSeparator />
          { user.data?.role?.name === "Owner" && (
              <a href={getStrapiURL()} target="_blank">
                <DropdownMenuItem>
                  <FileSliders className="mr-2 h-4 w-4" />
                  <span>Admin Panel</span>
                </DropdownMenuItem>
              </a>
          )}
          <DropdownMenuItem className='text-red-500' onClick={() => {
              const form = document.getElementById('logoutForm') as HTMLFormElement;
              form.requestSubmit();
            }}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
      )}
  </header>
  )
}