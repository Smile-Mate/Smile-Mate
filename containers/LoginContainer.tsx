'use client';

import BackButtonHeader from '@/components/BackButtonHeader';
import BottomPortal from '@/components/BottomPortal';
import Button from '@/components/Button';
import Container from '@/components/Container';
import PaddingBlock from '@/components/PaddingBlock';
import PageIntro from '@/components/PageIntro';
import Link from 'next/link';

export default function LoginContainer() {
  return (
    <>
      <BackButtonHeader />
      <Container className="h-screen">
        <PaddingBlock className="flex flex-col">
          <PageIntro
            title="식별 번호를 입력해주세요"
            description={`식별 번호는 사전에 안내드린\n문자 메시지에서 확인할 수 있어요.`}
          />
          <input type="text" className="mt-20 p-3 border-[0.4px] border-neutral-500 bg-[#F4F4F4] rounded-lg" />
          <input type="text" className="mt-5 p-3 border-[0.4px] border-neutral-500 rounded-lg" />
          <input type="text" className="mt-5 p-3 border-neutral-500 rounded-lg" />
        </PaddingBlock>
      </Container>
      <BottomPortal>
        <Link href="/login/name">
          <Button>다음으로</Button>
        </Link>
      </BottomPortal>
    </>
  );
}
