interface IconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  size?: string;
}

const Icon: React.FC<IconProps> = ({ name, className = '', style, size }) => {
  return (
    <span
      className={`material-symbols-rounded ${className}`}
      style={{ fontSize: size, ...style }}
    >
      {name}
    </span>
  );
};

export default Icon;
