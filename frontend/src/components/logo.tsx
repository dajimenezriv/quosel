import favicon from '@/assets/favicon.png';

interface Props {
  size: number;
}

export function Logo({ size }: Props) {
  return <img src={favicon} width={size} height={size} alt="Logo" />;
}
