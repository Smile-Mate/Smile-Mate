'use client';

import BackButtonHeader from '@/components/BackButtonHeader';
import BottomPortal from '@/components/BottomPortal';
import Bubble from '@/components/Bubble';
import Button from '@/components/Button';
import Container from '@/components/Container';
import Image from 'next/image';
import Link from 'next/link';

export default function FriendMissionContainer() {
  return (
    <>
      <Image src="/images/mission/mission1-blur.jpg" className="mx-auto -z-50" fill alt="friend" />
      <BackButtonHeader variant="transparent" />
      <Container backgroundColor="transparent">
        <div className="flex flex-col items-center mt-5">
          <div className="flex flex-col items-center gap-2.5">
            <div className="text-[#FED7AA] text-subhead1 bg-[#FED7AA]/20 border-[1px] px-2.5 py-1 rounded-[20px] border-[#FED7AA]">
              Chapter 1
            </div>
            <div className="text-display4 text-neutral-50">길에서 만난 재롱이</div>
            <div className="text-body2 text-neutral-100 whitespace-pre-wrap text-center">{`재롱이와 길에서 만났어요!\n이러쿵 저러쿵 한번 이야기해볼까요?`}</div>
          </div>
          <Bubble text="나를 집으로 데려가라" className="mt-10" />
          <Image src="/images/jaerong.png" width={300} height={300} alt="friend" />
        </div>
      </Container>
      <BottomPortal>
        <Link href="/friend/mission/1/chat">
          <Button>시작하기</Button>
        </Link>
      </BottomPortal>
    </>
  );
}
