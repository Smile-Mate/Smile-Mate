import { Portal } from '@mantine/core';
import PaddingBlock from './PaddingBlock';
import { appWidth } from '@/constants/styleConst';

interface BottomPortalProps {
  children: React.ReactNode;
}

export default function BottomPortal({ children }: BottomPortalProps) {
  return (
    <Portal className={`fixed bottom-0 w-full`}>
      <PaddingBlock className={`${appWidth} mx-auto flex w-full`}>
        <div className={`mx-auto w-full py-5 }`}>{children}</div>
      </PaddingBlock>
    </Portal>
  );
}
