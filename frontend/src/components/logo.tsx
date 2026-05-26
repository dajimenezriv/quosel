import * as React from 'react';
import favicon from '@/assets/favicon.png';

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
}

export function Logo({ size = 24, className, ...props }: LogoProps) {
  return <img src={favicon} width={size} height={size} alt="Logo" className={className} {...props} />;
}
