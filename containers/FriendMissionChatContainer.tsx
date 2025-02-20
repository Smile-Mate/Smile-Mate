'use client';

import BackButtonHeader from '@/components/BackButtonHeader';
import BottomPortal from '@/components/BottomPortal';
import Container from '@/components/Container';
import PaddingBlock from '@/components/PaddingBlock';
import Image from 'next/image';

export default function FriendMissionChatContainer() {
  return (
    <>
      <Image src="/images/mission/mission1-blur.jpg" className="mx-auto -z-50" fill alt="friend" />
      <BackButtonHeader variant="transparent" />
      <Container backgroundColor="transparent">
        <PaddingBlock>
          <div className="flex flex-col mt-5">
            <div className="bg-neutral-50 rounded-full w-10 h-10 flex items-center justify-center">
              <Image src="/images/jaerong.png" width={30} height={30} alt="friend" />
            </div>
          </div>
        </PaddingBlock>
      </Container>
      <BottomPortal isDefaultPadding={false}>
        <div className="bg-[#FDFDFD]/70 backdrop-blur-lg px-3 py-2.5">
          <div className="flex gap-2.5">
            <input
              type="text"
              className="px-4 py-2.5 border-neutral-500 rounded-[18px] w-full text-sm font-semibold leading-[26px]"
              placeholder="메세지를 입력해주세요."
            />
            <Image src="/svg/arrow-up.svg" width={40} height={40} alt="friend" />
          </div>
        </div>
      </BottomPortal>
    </>
  );
}
