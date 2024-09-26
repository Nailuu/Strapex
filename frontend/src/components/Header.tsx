"use client";

import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { createAvatar } from '@dicebear/core';
import type { Result } from '@dicebear/core';
import { botttsNeutral } from '@dicebear/collection';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { FileSliders, LogOut } from 'lucide-react';
import { logoutAction } from '@/actions/auth-actions';
import { getUserMeLoaderClient } from '@/services/userLocal';
import { IUser } from '@/services/user';
import { getStrapiData, getStrapiURL } from '@/services/data';
import qs from "qs";
import Link from 'next/link';

const baseURL: string = getStrapiURL();

const query = qs.stringify({
  fields: ["Title", "Tagline"],
});

export const Header = () => {
  const [metadata, setMetadata] = useState<{ title: string, tagline: string | null } | null>(null);
  const [user, setUser] = useState<IUser>({ ok: false, data: null, error: null });
  const [avatar, setAvatar] = useState<Result | null>(null);

  useEffect(() => {
    getStrapiData("/api/general-information", query)
      .then((res) => setMetadata({
        title: res.data.Title,
        tagline: res.data.Tagline === "" ? null : res.data.Tagline
      }));

    getUserMeLoaderClient()
      .then((user) => setUser(user));
  }, []);

  useEffect(() => {
    if (user.ok) {
      const res = createAvatar(botttsNeutral, {
        seed: user.data.username,
      });

      setAvatar(res);
    }
  }, [user]);

  if (!metadata)
    return (<header></header>);

  return (
    <header className={`w-full py-4 px-8 flex items-center ${(user.ok && avatar) ? "justify-between" : "justify-center"}`}>
      {(user.ok && avatar) && (
        <div className="w-10" />
      )}
      <Link href="/">
        <div className='flex flex-col items-center cursor-pointer' style={{ fontFamily: 'var(--font-jua)' }}>
          <h1 className="text-3xl text-primary font-bold">{metadata.title}</h1>
          {metadata.tagline && (
            <p className='text-muted-foreground'>{metadata.tagline}</p>
          )}
        </div>
      </Link>
      {(user.ok && avatar) && (
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
              {user.data?.role?.name === "Owner" && (
                <a href={baseURL + "/admin/content-manager/collection-types/api::article.article"} target="_blank">
                  <DropdownMenuItem className='cursor-pointer'>
                    <FileSliders className="mr-2 h-4 w-4" />
                    <span>Admin Panel</span>
                  </DropdownMenuItem>
                </a>
              )}
              <DropdownMenuItem className='text-red-500 cursor-pointer' onClick={() => {
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