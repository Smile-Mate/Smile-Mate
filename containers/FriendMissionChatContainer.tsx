'use client';

import BottomPortal from '@/components/BottomPortal';
import Button from '@/components/Button';
import Container from '@/components/Container';
import Link from 'next/link';

export default function FriendMissionChatContainer() {
  return (
    <>
      <Container>
        <div>friend</div>
      </Container>
      <BottomPortal>
        <Link href="/">
          <Button>시작하기</Button>
        </Link>
      </BottomPortal>
    </>
  );
}
