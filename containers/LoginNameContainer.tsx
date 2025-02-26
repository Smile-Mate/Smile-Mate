'use client';

import BackButtonHeader from '@/components/BackButtonHeader';
import BottomPortal from '@/components/BottomPortal';
import Button from '@/components/Button';
import Container from '@/components/Container';
import PaddingBlock from '@/components/PaddingBlock';
import PageIntro from '@/components/PageIntro';
import { useFriendStore } from '@/stores/friendStore';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginNameContainer() {
  const { friend, setFriend } = useFriendStore();

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newName = e.target.value;
    // const nameRegex = /^[가-힣a-zA-Z]{2,8}$/;

    // // validate name
    // if (!nameRegex.test(newName)) {
    //   alert('2글자 이상 8글자 이하의 한글 또는 영문으로 입력해주세요.');
    //   return;
    // }

    setFriend({ name: newName });
  };

  return (
    <>
      <BackButtonHeader />
      <Container className="h-screen">
        <PaddingBlock className="flex flex-col">
          <PageIntro
            title={`5주간 함께할 친구의\n이름을 지어주세요`}
            description={`2글자 이상 8글자 이하의\n한글 또는 영문으로 입력해주세요.`}
          />
          <Image src="/images/jaerong.png" className="mt-10 mx-auto" width={240} height={240} alt="friend" />
          <input
            type="text"
            className="mt-5 p-3 border-[0.4px] border-neutral-500 rounded-lg"
            value={friend.name}
            onChange={handleUserNameChange}
            minLength={2}
            maxLength={8}
          />
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
