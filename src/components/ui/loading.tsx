import { Loader2 } from "lucide-react";
import { StyleHTMLAttributes } from "react";

type LoadingProps = { size?: number } & StyleHTMLAttributes<HTMLDivElement>;

export const Loading = ({ size, ...rest }: LoadingProps) => (
  <div
    {...rest}
    className={`grid place-items-center${!rest?.style ? " h-screen" : ""}`}
  >
    <Loader2 size={size || 64} className={`animate-spin`} />
  </div>
);
