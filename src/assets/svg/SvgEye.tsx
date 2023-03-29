type IProps = {
  eye: boolean;
};

export default function SvgEyeInput({ eye }: IProps) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.8834 10.3449C21.6747 11.3242 21.6747 12.6758 20.8834 13.6551C19.4481 15.431 16.5804 18 12 18C7.41962 18 4.55188 15.431 3.11662 13.6551C2.32526 12.6758 2.32526 11.3242 3.11662 10.3449C4.55188 8.56897 7.41962 6 12 6C16.5804 6 19.4481 8.56897 20.8834 10.3449Z"
        stroke="black"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3" stroke="black" strokeLinecap="round" />
      {eye && <path d="M3 21L20 4" stroke="black" strokeLinecap="round" />}
    </svg>
  );
}
