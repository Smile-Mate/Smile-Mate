'use client';

import { appWidth } from '@/constants/styleConst';

export default function Container({
  children,
  className = '',
  backgroundColor = '#f4f4f4',
}: Readonly<{ children: React.ReactNode; className?: string; backgroundColor?: string }>) {
  return (
    <div
      className={`${className} flex flex-col ${appWidth} w-full mx-auto`}
      style={{ backgroundColor: backgroundColor }}
    >
      {children}
    </div>
  );
}
