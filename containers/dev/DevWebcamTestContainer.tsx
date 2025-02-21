'use client';

import BottomPortal from '@/components/BottomPortal';
import Container from '@/components/Container';
import EmotionModal from '@/components/dev/EmotionModal';
import { useState } from 'react';

export default function DevWebcamTestContainer() {
  const [isEmotionModalOpened, setIsEmotionModalOpened] = useState<boolean>(true);
  const [isDailyEmotionSuccess, setIsDailyEmotionSuccess] = useState<boolean>(false);

  return (
    <>
      <Container>
        <div>
          {isEmotionModalOpened && (
            <EmotionModal
              isDailyEmotionSuccess={isDailyEmotionSuccess}
              setIsEmotionModalOpened={setIsEmotionModalOpened}
              setIsDailyEmotionSuccess={setIsDailyEmotionSuccess}
            />
          )}
        </div>
      </Container>
      <BottomPortal>
        <div></div>
      </BottomPortal>
    </>
  );
}
