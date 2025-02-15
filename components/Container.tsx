"use client";

export default function Container({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="flex max-w-[500px] w-full mx-auto">{children}</div>;
}
