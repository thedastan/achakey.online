interface IProps {
  stroke?: string;
}

export default function SvgArrowTop({ stroke }: IProps) {
  return (
    <svg
      width="16"
      height="6"
      viewBox="0 0 16 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 0.818362L7.30891 4.93099C7.5441 5.0843 7.84653 5.08855 8.08594 4.94191L14.8182 0.81836"
        stroke={stroke}
        strokeWidth="1.09091"
        strokeLinecap="round"
      />
    </svg>
  );
}
