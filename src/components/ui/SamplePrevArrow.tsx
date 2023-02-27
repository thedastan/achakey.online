interface IPorpsPrev {
  className?: string;
  style?: any;
  onClick?: () => void;
}

export function SamplePrevArrow(props: IPorpsPrev) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "green" }}
      onClick={onClick}
    />
  );
}
