'use client';

import BackButtonHeader from '@/components/BackButtonHeader';
import BottomPortal from '@/components/BottomPortal';
import Button from '@/components/Button';
import Container from '@/components/Container';
import PaddingBlock from '@/components/PaddingBlock';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function FriendSmileContainer() {
  const [completed, setCompleted] = useState(false);

  return (
    <>
      <BackButtonHeader />
      <Container>
        <PaddingBlock className="mt-5">
          <div className="text-display5 text-neutral-800 whitespace-pre-wrap">
            {completed ? `웃음 지어주기 성공!` : `카메라를 보고\n웃음을 지어주세요`}
          </div>
          {completed && (
            <div className="text-body2 text-neutral-600 whitespace-pre-wrap">{`식별 번호는 사전에 안내드린\n문자 메시지에서 확인할 수 있어요.`}</div>
          )}
          <Image src="/images/jaerong.png" className="mx-auto mt-20" alt="jaerong" width={300} height={300} />
          {completed && (
            <div className="flex flex-col gap-1 justify-center items-center mt-5">
              <Image src={'/svg/fooProgress2.svg'} width={295} height={295} alt="progress" />
              <div className="text-body1 text-neutral-700">20% 상승</div>
            </div>
          )}
        </PaddingBlock>
      </Container>
      <BottomPortal>
        {!completed && <Button onClick={() => setCompleted(true)}>다음으로</Button>}
        {completed && (
          <Link href={'/friend'}>
            <Button>홈으로</Button>
          </Link>
        )}
      </BottomPortal>
    </>
  );
}
