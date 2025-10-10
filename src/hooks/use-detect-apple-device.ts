'use client';
import { useEffect } from 'react';

export function useDetectAppleDevice() {
  const isIOS = /(iPhone|iPod|iPad)/i.test(navigator.userAgent);

  useEffect(() => {
    if (isIOS) {
      document.documentElement.classList.add('apple-device');
    }
  }, [isIOS]);
  return { isIOS };
}
