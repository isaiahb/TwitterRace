// import Link from 'next/link'
import clsx from "clsx";

const baseStyles = {
  solid:
    "group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none",
  outline:
    "group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none",
};

const variantStyles = {
  solid: {
    slate:
      "bg-slate-100 text-black hover:bg-slate-200 hover:text-black active:bg-slate-200 active:text-black ",
    blue: "bg-blue-400 text-white hover:text-white hover:bg-blue-500 active:bg-blue-600 active:text-white ",
    white:
      "bg-white text-slate-900 hover:bg-slate-50 active:bg-slate-200 active:text-slate-600 ",
  },
  outline: {
    slate:
      "ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600",
    white:
      "ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 ",
  },
};

const disabledStyles = {
  solid:
    "bg-slate-300 text-white cursor-not-allowed hover:bg-slate-300 active:bg-slate-300 ",
    // "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300 hover:text-gray-500 active:bg-gray-300 active:text-gray-500",
  outline:
    "text-gray-300 ring-gray-300 cursor-not-allowed hover:text-gray-300 hover:ring-gray-300 active:text-gray-300 active:ring-gray-300",
};

export function Button({
  variant = "solid",
  color = "slate",
  className,
  disabled = false,
  href,
  ...props
}: {
  variant?: keyof typeof variantStyles;
  color?:
    | keyof (typeof variantStyles)["outline"]
    | keyof (typeof variantStyles)["solid"];
  className?: string;
  href?: string;
  [key: string]: any;
}) {
  const className2 = clsx(
    baseStyles[variant],

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    variantStyles[variant][color],
    className,
    "select-none"
  );

  if (disabled) {
    const disabledStyle = disabledStyles[variant];
    return (
      <button className={clsx(baseStyles[variant], disabledStyle, className)} disabled {...props}>
        {props.children}
      </button>
    );
  }

  return href ? (
    <a href={href} className={className2} {...props} />
  ) : (
    <button className={className2} {...props} />
  );
}
