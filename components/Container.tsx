'use client';

export default function Container({
  children,
  className = '',
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return <div className={`${className} flex flex-col max-w-[500px] w-full mx-auto`}>{children}</div>;
}
