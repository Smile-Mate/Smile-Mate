'use client';

const Button = ({ children, onClick, className }: { children: string; onClick?: () => void; className?: string }) => {
  return (
    <div
      className={`${className} bg-primary-500 text-white text-center text-base font-semibold rounded-[12px] py-4 cursor-pointer h-[56px]`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
