'use client';

import BackButtonHeader from '@/components/BackButtonHeader';
import BottomPortal from '@/components/BottomPortal';
import Button from '@/components/Button';
import Container from '@/components/Container';
import PaddingBlock from '@/components/PaddingBlock';

export default function LoginContainer() {
  return (
    <>
      <BackButtonHeader />
      <Container className="h-screen">
        <PaddingBlock className="flex flex-col gap-[14px] pt-4">
          <div className="text-display5 text-neutral-800">식별 번호를 입력해주세요</div>
          <div className="text-body2 text-neutral-600 whitespace-pre-wrap">{`식별 번호는 사전에 안내드린
문자 메시지에서 확인할 수 있어요.`}</div>
          <input type="text" className="mt-10 p-3 border-[0.4px] border-neutral-500 rounded-lg" />
        </PaddingBlock>
      </Container>
      <BottomPortal>
        <Button>다음으로</Button>
      </BottomPortal>
    </>
  );
}
