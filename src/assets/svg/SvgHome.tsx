import { IProps } from "./Types";

export default function SvgHome({ fill }: IProps) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.9225 2.74697C13.6513 2.73197 12.4063 3.15198 11.5238 4.03573L2.8513 12.902C2.4788 13.2832 2.37879 13.832 2.61754 14.3095L3.75005 16.5745L3.71129 23.7232C3.71129 25.137 4.8438 26.262 6.25004 26.262H10.235C11.4813 26.262 12.5 25.2432 12.5 23.997V19.8632C12.5 18.5644 13.5525 17.512 14.8513 17.512H15.1488C16.4475 17.512 17.5 18.5644 17.5 19.8632V23.997C17.5 25.2432 18.5188 26.262 19.765 26.262H23.75C25.1563 26.262 26.2888 25.1295 26.2888 23.7232L26.25 16.5745L27.3825 14.3095C27.6238 13.8282 27.5288 13.2445 27.1488 12.8632C26.8238 12.5382 19.18 4.89449 18.3988 4.11324C17.4925 3.20699 16.1925 2.76072 14.9225 2.74697Z"
        fill={fill}
      />
    </svg>
  );
}
