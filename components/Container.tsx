'use client';

import { appWidth } from '@/constants/styleConst';
import { defaultBackgroundColor } from '@/constants/themeConst';

export default function Container({
  children,
  className = '',
  backgroundColor = defaultBackgroundColor,
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
