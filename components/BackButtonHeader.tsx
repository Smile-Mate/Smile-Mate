'use client';

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { defaultBackgroundColor } from '@/constants/themeConst';

export default function BackButtonHeader({
  children = null,
  className = '',
  title = '',
  variant = 'default',
}: {
  children?: ReactNode;
  className?: string;
  title?: string;
  variant?: 'default' | 'transparent';
}) {
  const router = useRouter();
  const backgroundColor = variant === 'default' ? defaultBackgroundColor : 'transparent';
  return (
    // <div className={`${className} fixed top-0 w-full flex justify-between h-[50px] pr-[26px]`}>
    <>
      {/* NOTE 영역차치 */}
      <div className="h-[50px]"></div>
      {/* NOTE 헤더바 */}
      <div className="fixed top-0 w-full z-50">
        <div
          className={`${className} flex justify-between h-[50px] pr-[26px] relative`}
          style={{ backgroundColor: backgroundColor }}
        >
          {title && (
            <div className="absolute w-64 mx-auto left-0 right-0 top-0 bottom-0 flex items-center font-semibold text-base text-neutral-600">
              <div className="mx-auto">{title}</div>
            </div>
          )}
          <div className="my-auto">
            <div onClick={() => router.back()} className="cursor-pointer flex justify-center items-center w-16 h-10">
              {variant === 'default' && <Image src="/svg/chevron-left.svg" alt="back" width={12} height={12} />}
              {variant === 'transparent' && (
                <Image src="/svg/chevron-left-light.svg" alt="back" width={12} height={12} />
              )}
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
