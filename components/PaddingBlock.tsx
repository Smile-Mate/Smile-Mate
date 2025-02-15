import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function PaddingBlock({ children, className }: Props) {
  return <div className={`${className} px-5`}>{children}</div>;
}
