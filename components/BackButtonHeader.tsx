'use client';

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function BackButtonHeader({
  children = null,
  className = '',
  title = '',
}: {
  children?: ReactNode;
  className?: string;
  title?: string;
}) {
  const router = useRouter();
  return (
    // <div className={`${className} fixed top-0 w-full flex justify-between h-[50px] pr-[26px]`}>
    <div className={`${className} flex justify-between h-[50px] pr-[26px] relative`}>
      {title && (
        <div className="absolute w-64 mx-auto left-0 right-0 top-0 bottom-0 flex items-center font-semibold text-base text-neutral-600">
          <div className="mx-auto">{title}</div>
        </div>
      )}
      <div className="my-auto">
        <div onClick={() => router.back()} className="cursor-pointer flex justify-center items-center w-16 h-10">
          <Image src="/svg/chevron-left.svg" alt="back" width={12} height={12} />
        </div>
      </div>
      {children}
    </div>
  );
}
