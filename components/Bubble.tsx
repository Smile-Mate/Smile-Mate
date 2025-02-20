'use client';
import { useRef, useEffect, useState } from 'react';

// TODO 말풍선 중앙정렬 필요
// NOTE 디자인도 중앙정렬이 안되어 있음. 디자인 수정 요청. 크기별 꼬리가 같은게 낫지 않을까?
export default function Bubble({ className, text }: { className?: string; text: string }) {
  const textRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 120, height: 48 });
  const [bubbleReady, setBubbleReady] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      // 텍스트 콘텐츠의 크기 측정
      const textWidth = textRef.current.offsetWidth;

      // 텍스트 주변에 여백 추가 (좌우 30px)
      const bubbleWidth = Math.max(120, textWidth + 30);

      // 높이는 고정
      const bubbleHeight = 48;

      setDimensions({ width: bubbleWidth, height: bubbleHeight });
      setBubbleReady(true);
    }
  }, [text]);

  const uniqueId = `bubble_${Math.random().toString(36).substr(2, 9)}`;
  const clipPathId = `bgblur_${uniqueId}_clip_path`;

  return (
    <div className={`${className} relative flex items-center justify-center`}>
      {/* 측정용 숨겨진 텍스트 요소 */}
      <div
        ref={textRef}
        className="absolute opacity-0 pointer-events-none px-4 text-body2 whitespace-nowrap"
        style={{ top: '-9999px', left: '-9999px' }}
      >
        {text}
      </div>

      {bubbleReady && (
        <div className="relative">
          {/* SVG 말풍선 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={dimensions.width}
            height={61}
            viewBox={`0 0 ${dimensions.width} 61`}
            fill="none"
          >
            {/* 정확한 blur 효과 적용 */}
            <foreignObject x="-40" y="-40" width={dimensions.width + 30} height="140.732">
              <div
                style={{
                  backdropFilter: 'blur(20px)',
                  clipPath: `url(#${clipPathId})`,
                  height: '100%',
                  width: '100%',
                }}
              ></div>
            </foreignObject>

            {/* 말풍선 본체 */}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d={`M18 0C8.05888 0 0 8.05888 0 18V30C0 39.9411 8.05887 48 18 48H${dimensions.width / 2 - 6}L${
                dimensions.width / 2
              } 59.379C${dimensions.width / 2 + 0.6168} 61.1831 ${dimensions.width / 2 + 3.1682} 61.1831 ${
                dimensions.width / 2 + 3.785
              } 59.379L${dimensions.width / 2 + 6} 48H${dimensions.width - 18}C${dimensions.width - 8.05888} 48 ${
                dimensions.width
              } 39.9411 ${dimensions.width} 30V18C${dimensions.width} 8.05888 ${dimensions.width - 8.05888} 0 ${
                dimensions.width - 18
              } 0H18Z`}
              fill="#232323"
              fillOpacity="0.6"
            />

            {/* 클립 패스 정의 */}
            <defs>
              <clipPath id={clipPathId}>
                <path
                  transform="translate(40 40)"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d={`M18 0C8.05888 0 0 8.05888 0 18V30C0 39.9411 8.05887 48 18 48H${dimensions.width / 2 - 6}L${
                    dimensions.width / 2
                  } 59.379C${dimensions.width / 2 + 0.6168} 61.1831 ${dimensions.width / 2 + 3.1682} 61.1831 ${
                    dimensions.width / 2 + 3.785
                  } 59.379L${dimensions.width / 2 + 6} 48H${dimensions.width - 18}C${dimensions.width - 8.05888} 48 ${
                    dimensions.width
                  } 39.9411 ${dimensions.width} 30V18C${dimensions.width} 8.05888 ${dimensions.width - 8.05888} 0 ${
                    dimensions.width - 18
                  } 0H18Z`}
                />
              </clipPath>
            </defs>
          </svg>

          {/* 텍스트 콘텐츠 */}
          <div
            className="absolute z-10 text-body2 text-neutral-50 truncate whitespace-nowrap"
            style={{
              maxWidth: dimensions.width - 60,
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          >
            {text}
          </div>
        </div>
      )}
    </div>
  );
}
