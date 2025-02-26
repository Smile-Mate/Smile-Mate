'use client';

import BottomPortal from '@/components/BottomPortal';
// import Bubble from '@/components/Bubble';
import Button from '@/components/Button';
import Container from '@/components/Container';
import PaddingBlock from '@/components/PaddingBlock';
import { useFriendStore } from '@/stores/friendStore';
import Image from 'next/image';
import Link from 'next/link';

// TODO 폰트 적용하기
export default function FriendContainer() {
  const { friend } = useFriendStore();

  return (
    <>
      <Image src="/images/mission/mission1.jpg" className="mx-auto -z-50" fill alt="friend" />
      <Container backgroundColor="transparent">
        <PaddingBlock>
          <div className="mt-10 flex flex-col p-5 backdrop-blur-lg bg-neutral-700/60 rounded-[20px]">
            <div className="flex flex-col items-center gap-2">
              <div className="text-headline text-white mx-auto">{friend.name}</div>
              <Image src={'/svg/fooProgress.svg'} width={295} height={295} alt="progress" />
            </div>
          </div>
        </PaddingBlock>
        {/* <div className="flex flex-col gap-3 mt-20">
          <Bubble text="나랑 놀아줘!!" className="mr-40" />
          <Bubble text="오늘 기분은 어때?" className="ml-36" />
          <Bubble text="나를 누르면 대화할 수 있어!" className="mr-24" />
        </div> */}
      </Container>
      <BottomPortal>
        <div className="flex flex-col gap-4">
          <Link href="/friend/mission/1">
            <Image src="/images/jaerong.png" className="mx-auto" width={240} height={240} alt="friend" />
          </Link>
          <div className="flex flex-col gap-[16px] py-6 px-5 backdrop-blur-lg bg-neutral-700/60 rounded-[20px]">
            <div className="whitespace-pre-wrap text-body2 text-white">{`재롱이는 현재 매우 우울한 상태이다.
길거리에서 무뚝뚝한 표정을 지으며 앉아 있다…`}</div>
            <Link href="/friend/smile">
              <Button>웃음 지어주기</Button>
            </Link>
          </div>
        </div>
      </BottomPortal>
    </>
  );
}
