'use client';

import BottomPortal from '@/components/BottomPortal';
import Bubble from '@/components/Bubble';
import Button from '@/components/Button';
import Container from '@/components/Container';
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
        <div className="flex flex-col gap-3 mt-20">
          <Bubble text="나랑 놀아줘!!" className="mr-40" />
          <Bubble text="오늘 기분은 어때?" className="ml-36" />
          <Bubble text="나를 누르면 대화할 수 있어!" className="mr-24" />
        </div>

        <Link href="/friend/mission/1">
          <Image src="/images/jaerong.png" className="mx-auto" width={300} height={300} alt="friend" />
        </Link>
      </Container>
      <BottomPortal>
        <div className="flex flex-col gap-[30px] py-4 px-5 backdrop-blur-lg bg-neutral-700/60 rounded-[20px]">
          <div className="flex flex-col items-center gap-2">
            <div className="text-headline text-white mx-auto">{friend.name}</div>
            <Image src={'/svg/fooProgress.svg'} width={295} height={295} alt="progress" />
          </div>
          <Link href="/friend/smile">
            <Button>웃음 지어주기</Button>
          </Link>
        </div>
      </BottomPortal>
    </>
  );
}
