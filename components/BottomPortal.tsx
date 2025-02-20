import { Portal } from '@mantine/core';
import PaddingBlock from './PaddingBlock';
import { appWidth } from '@/constants/styleConst';

interface BottomPortalProps {
  children: React.ReactNode;
  isDefaultPadding?: boolean;
}

export default function BottomPortal({ children, isDefaultPadding = true }: BottomPortalProps) {
  return (
    <Portal className={`fixed bottom-0 w-full`}>
      {isDefaultPadding && (
        <PaddingBlock className={`${appWidth} mx-auto flex w-full`}>
          <div className={`mx-auto w-full py-5`}>{children}</div>
        </PaddingBlock>
      )}
      {!isDefaultPadding && (
        <div className={`${appWidth} mx-auto flex w-full`}>
          <div className={`mx-auto w-full`}>{children}</div>
        </div>
      )}
    </Portal>
  );
}
