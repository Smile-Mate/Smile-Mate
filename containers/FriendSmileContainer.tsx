'use client';

import BackButtonHeader from '@/components/BackButtonHeader';
import BottomPortal from '@/components/BottomPortal';
import Button from '@/components/Button';
import Container from '@/components/Container';
import WebcamComponent from '@/components/dev/WebcamComponent';
import PaddingBlock from '@/components/PaddingBlock';
import PageIntro from '@/components/PageIntro';
import { Progress } from '@/components/ui/progress';
import { useFriendStore } from '@/stores/friendStore';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function FriendSmileContainer() {
  const { friend, setFriend, addScore } = useFriendStore();
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (completed) {
      setFriend({
        message: `방금 지어준 웃음은 굉장히 밝았던 것 같아!
입꼬리를 조금만 더 올려보면
더 환한 웃음이 될 것 같은데!`,
      });
      addScore(20);
    }
  }, [completed, setFriend, addScore]);

  return (
    <>
      <BackButtonHeader />
      <Container>
        <PaddingBlock>
          {!completed && <PageIntro title={`카메라를 보고\n웃음을 지어주세요`} />}
          {completed && (
            <PageIntro
              title="웃음 지어주기 성공!"
              description={`웃음을 지어준 덕분에\n${friend.name}의 기분이 조금 나아졌어요.`}
            />
          )}
          {!completed && (
            <div className="mt-20">
              <WebcamComponent setIsSuccess={() => setCompleted(true)} />
            </div>
          )}
          {completed && (
            <Image src="/images/jaerong.png" className="mx-auto mt-20" alt="jaerong" width={300} height={300} />
          )}
          {completed && (
            <div className="flex flex-col gap-1 justify-center items-center mt-5">
              <Progress value={friend.score} className="w-full" />
              <div className="text-body1 text-neutral-700">20점 상승</div>
            </div>
          )}
        </PaddingBlock>
      </Container>
      <BottomPortal>
        {/* {!completed && <Button onClick={() => setCompleted(true)}>다음으로</Button>} */}
        {completed && (
          <Link href={'/friend'}>
            <Button>홈으로</Button>
          </Link>
        )}
      </BottomPortal>
    </>
  );
}
