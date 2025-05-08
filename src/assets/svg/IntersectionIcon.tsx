const IntersectinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { className, ...rest } = props;

  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      className={`bi bi-sign-intersection-side ${className}`}
      viewBox="3.5 3.5 9 9"
    >
      <path d="M6.25 4v8h1.5V8.75H11v-1.5H7.75V4z" />
    </svg>
  );
};

export default IntersectinIcon;
