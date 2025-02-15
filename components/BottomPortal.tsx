import { Portal } from "@mantine/core";
import PaddingBlock from "./PaddingBlock";

interface BottomPortalProps {
  children: React.ReactNode;
}

export default function BottomPortal({ children }: BottomPortalProps) {
  return (
    <Portal className={`fixed bottom-0 w-full`}>
      <PaddingBlock>
        <div key={"bottom-portal"}>
          <div className="flex w-full">
            <div className={`mx-auto w-full py-5 }`}>{children}</div>
          </div>
        </div>
      </PaddingBlock>
    </Portal>
  );
}
