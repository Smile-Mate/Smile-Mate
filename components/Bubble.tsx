'use client';

export default function Bubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* 내용 */}
      <div className="absolute top-3 text-body2 text-neutral-50">{children}</div>
      {/* 말풍선 */}
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="170" height="61" viewBox="0 0 170 61" fill="none">
          <foreignObject x="-40" y="-40" width="250" height="140.732">
            <div
              // xmlns="http://www.w3.org/1999/xhtml"
              style={{
                backdropFilter: 'blur(20px)',
                clipPath: 'url(#bgblur_0_2_565_clip_path)',
                height: '100%',
                width: '100%',
              }}
            ></div>
          </foreignObject>
          <path
            // data-figma-bg-blur-radius="40"
            // fill-rule="evenodd"
            // clip-rule="evenodd"
            d="M18 0C8.05888 0 0 8.05888 0 18V30C0 39.9411 8.05887 48 18 48H78.3849L82.275 59.379C82.8918 61.1831 85.4432 61.1831 86.0599 59.379L89.9501 48H152C161.941 48 170 39.9411 170 30V18C170 8.05888 161.941 0 152 0H18Z"
            fill="#232323"
            fillOpacity="0.6"
          />
          <defs>
            <clipPath id="bgblur_0_2_565_clip_path">
              <path
                transform="translate(40 40)"
                // fill-rule="evenodd"
                // clip-rule="evenodd"
                d="M18 0C8.05888 0 0 8.05888 0 18V30C0 39.9411 8.05887 48 18 48H78.3849L82.275 59.379C82.8918 61.1831 85.4432 61.1831 86.0599 59.379L89.9501 48H152C161.941 48 170 39.9411 170 30V18C170 8.05888 161.941 0 152 0H18Z"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}
