"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface AdProps {
  desktopAdUnit: string;
  mobileAdUnit: string;
  adWidthDesktop: string;
  adHeightDesktop: string;
  adWidthMobile: string;
  adHeightMobile: string;
}

export default function Ad({
  desktopAdUnit,
  mobileAdUnit,
  adWidthDesktop,
  adHeightDesktop,
  adWidthMobile,
  adHeightMobile,
}: AdProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 768); // 768px 기준으로 모바일 여부 판단
    };

    updateSize(); // 초기 크기 설정
    window.addEventListener("resize", updateSize); // 리사이즈 이벤트 리스너 추가
    return () => window.removeEventListener("resize", updateSize); // 클린업
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up on unmount
    };
  }, []);

  return (
    <Box
      className="kakao_ad_area"
      style={{ display: "block" }}
      data-ad-unit={isMobile ? mobileAdUnit : desktopAdUnit}
      data-ad-width={isMobile ? adWidthMobile : adWidthDesktop}
      data-ad-height={isMobile ? adHeightMobile : adHeightDesktop}
    />
  );
}
