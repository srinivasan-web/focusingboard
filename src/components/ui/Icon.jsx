export default function Icon({
  icon: IconComponent,
  size = 18,
  strokeWidth = 1.8,
  className = "",
  ...props
}) {
  return (
    <IconComponent
      aria-hidden="true"
      focusable="false"
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    />
  );
}
