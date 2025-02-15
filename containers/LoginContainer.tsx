'use client';

import BackButtonHeader from '@/components/BackButtonHeader';
import BottomPortal from '@/components/BottomPortal';
import Button from '@/components/Button';
import Container from '@/components/Container';

export default function LoginContainer() {
  return (
    <>
      <BackButtonHeader />
      <Container>
        <div></div>
      </Container>
      <BottomPortal>
        <Button>다음으로</Button>
      </BottomPortal>
    </>
  );
}
