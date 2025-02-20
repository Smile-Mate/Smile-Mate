'use client';

import BackButtonHeader from '@/components/BackButtonHeader';
import BottomPortal from '@/components/BottomPortal';
import Button from '@/components/Button';
import Container from '@/components/Container';
import PaddingBlock from '@/components/PaddingBlock';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginNameContainer() {
  return (
    <>
      <BackButtonHeader />
      <Container className="h-screen">
        <PaddingBlock className="flex flex-col gap-[14px] pt-4">
          <div className="text-display5 text-neutral-800 whitespace-pre-wrap">{`5주간 함께할 친구의
이름을 지어주세요`}</div>
          <div className="text-body2 text-neutral-600 whitespace-pre-wrap">{`2글자 이상 8글자 이하의
한글 또는 영문으로 입력해주세요.`}</div>
          <Image src="/images/jaerong.png" className="mt-5 mx-auto" width={240} height={240} alt="friend" />
          <input type="text" className="mt-5 p-3 border-[0.4px] border-neutral-500 rounded-lg" />
        </PaddingBlock>
      </Container>
      <BottomPortal>
        <Link href="/friend">
          <Button>다음으로</Button>
        </Link>
      </BottomPortal>
    </>
  );
}
