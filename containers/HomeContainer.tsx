'use client';

import BottomPortal from '@/components/BottomPortal';
import Button from '@/components/Button';
import Container from '@/components/Container';
import Image from 'next/image';
import Link from 'next/link';

export default function HomeContainer() {
  return (
    <>
      <Container>
        <div className="flex h-[100vh] w-full flex-col">
          <Image src={'/svg/logo.svg'} alt="Logo" width={200} height={200} className="m-auto" />
          <div className="h-20" />
        </div>
      </Container>
      <BottomPortal>
        <Link href="/login">
          <Button>시작하기</Button>
        </Link>
      </BottomPortal>
    </>
  );
}
