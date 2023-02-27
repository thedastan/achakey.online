import { Box } from "@chakra-ui/react";
import "./style.css";

interface IPropsNext {
  className?: string;
  style?: any;
  onClick?: () => void;
}

export function SampleNextArrow(props: IPropsNext) {
  const { className, style, onClick } = props;
  return (
    <svg
      width="10"
      height="36"
      viewBox="0 0 10 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="slick-next"
      style={{ right: "-15px" }}
      onClick={onClick}
    >
      <path
        d="M1.24805 1.25L9.24805 17.75L1.24805 34.75"
        stroke="#9D9D9D"
        stroke-linecap="round"
      />
    </svg>
  );
}
