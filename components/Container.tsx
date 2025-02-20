'use client';

import { appWidth } from '@/constants/styleConst';
import { defaultBackgroundColor } from '@/constants/themeConst';

export default function Container({
  children,
  className = '',
  backgroundColor = defaultBackgroundColor,
  fullHeight = true,
}: Readonly<{ children: React.ReactNode; className?: string; backgroundColor?: string; fullHeight?: boolean }>) {
  return (
    <div
      className={`${className} ${fullHeight ? 'min-h-screen' : ''} flex flex-col ${appWidth} w-full mx-auto`}
      style={{ backgroundColor: backgroundColor }}
    >
      {children}
    </div>
  );
}
