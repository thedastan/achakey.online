import { IProps } from "./Types";
import "./style.css";

export function SvgPlayerGif({ fill }: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <rect
        className="eq-bar eq-bar--1"
        x="4"
        y="4"
        width="2.7"
        height="8"
        fill="#49DEFF"
      />
      <rect
        className="eq-bar eq-bar--2"
        x="9"
        y="4"
        width="2.7"
        height="16"
        fill="#49DEFF"
      />
      <rect
        className="eq-bar eq-bar--3"
        x="14"
        y="4"
        width="2.7"
        height="11"
        fill="#49DEFF"
      />
    </svg>
  );
}
