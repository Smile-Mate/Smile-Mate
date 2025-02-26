'use client';

import BottomPortal from '@/components/BottomPortal';
import Button from '@/components/Button';
import Container from '@/components/Container';
import PaddingBlock from '@/components/PaddingBlock';
import { Progress } from '@/components/ui/progress';
import { useFriendStore } from '@/stores/friendStore';
import { josa } from 'es-hangul';
import Image from 'next/image';
import Link from 'next/link';

const getFooMessage = (level: number, friendName: string) => {
  switch (level) {
    case 1:
      return `${josa(friendName, '은/는')} 현재 매우 우울한 상태이다. 길거리에서 무뚝뚝한 표정을 지으며 앉아 있다...`;
    case 2:
      return `${josa(friendName, '은/는')} 현재 다소 우울하다. 무뚝뚝한 표정을 지으며 앉아 있다...`;
    case 3:
      return `${josa(friendName, '은/는')} 현재 기분이 좋은 상태이다. 그치만 더 행복해질 수 있을 것 같다!`;
    case 4:
      return `${josa(friendName, '은/는')} 지금 매우 행복하다! 당신이 기쁜 웃음을 지어줘서 행복하게 있다!`;
    default:
      return `${friendName}의 기분을 알 수 없습니다.`;
  }
};

// TODO 폰트 적용하기
export default function FriendContainer() {
  const { friend, setFriend, getLevel } = useFriendStore();

  return (
    <>
      <Image src="/images/mission/mission1.jpg" className="mx-auto -z-50" fill alt="friend" />
      <Container backgroundColor="transparent">
        <PaddingBlock className="relative">
          <div className="mt-10 flex flex-col p-5 backdrop-blur-lg bg-neutral-700/60 rounded-[20px]">
            <div className="flex flex-col items-center gap-2">
              <div className="text-headline text-white mx-auto">{friend.name}</div>
              <Progress value={friend.score} className="w-full" />
              <div className="absolute top-[58.5px] right-9 text-neutral-700 text-caption1">{friend.score}점</div>
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
          {friend.message && (
            <div>
              <div className="text-body2 bg-white/30 px-[30px] py-3 rounded-[18px] backdrop-blur-lg whitespace-pre-wrap text-center">
                {friend.message}
              </div>
            </div>
          )}

          <Link href="/friend/mission/1">
            <Image src="/images/jaerong.png" className="mx-auto" width={240} height={240} alt="friend" />
          </Link>
          <div className="flex flex-col gap-[16px] py-6 px-5 backdrop-blur-lg bg-neutral-700/60 rounded-[20px]">
            <div className="whitespace-pre-wrap text-body2 text-white">{getFooMessage(getLevel(), friend.name)}</div>
            <Link href="/friend/smile">
              <Button
                onClick={() => {
                  setFriend({ message: undefined });
                }}
              >
                웃음 지어주기
              </Button>
            </Link>
          </div>
        </div>
      </BottomPortal>
    </>
  );
}
