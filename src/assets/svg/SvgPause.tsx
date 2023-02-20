import { IProps } from "./Types";

export default function SvgPause({ fill }: IProps) {
  return (
    <svg
      width="33"
      height="32"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_239_31)">
        <circle
          cx="12.7994"
          cy="12.7994"
          r="12.2548"
          stroke={fill}
          strokeWidth="1.08931"
        />
        <rect x="8" y="6" width="3" height="14" fill={fill} />
        <rect x="15" y="6" width="3" height="14" fill={fill} />
      </g>
      <defs>
        <clipPath id="clip0_239_31">
          <rect width="25.5989" height="25.5989" fill={fill} />
        </clipPath>
      </defs>
    </svg>
  );
}
