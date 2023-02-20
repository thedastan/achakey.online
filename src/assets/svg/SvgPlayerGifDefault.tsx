import { IProps } from "./Types";

export function SvgPlayerGifDefault({ fill }: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <rect x="4" y="12" width="2.7" height="8" fill="#0eeb24" />
      <rect x="9" y="4" width="2.7" height="16" fill="#0eeb24" />
      <rect x="14" y="9" width="2.7" height="11" fill="#0eeb24" />
    </svg>
  );
}
