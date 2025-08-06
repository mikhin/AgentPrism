import { type ReactElement } from "react";

export type AvatarProps = {
  /**
   * The image source for the avatar
   */
  src?: string;
  /**
   * The alt text for the avatar
   */
  alt?: string;
  /**
   * The size of the avatar
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * The border radius of the avatar
   * @default "full"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  /**
   * Background color for the letter avatar
   * @default "gray"
   */
  bgColor?:
    | "gray"
    | "red"
    | "green"
    | "blue"
    | "yellow"
    | "purple"
    | "pink"
    | "indigo";
  /**
   * Text color for the letter avatar
   * @default "white"
   */
  textColor?: "white" | "black";
  /**
   * Custom letter to display (will use first letter of alt if not provided)
   */
  letter?: string;
  /**
   * Optional className for additional styling
   */
  className?: string;
};

const sizeClasses = {
  xs: "w-4 h-4 text-xs",
  sm: "w-6 h-6 text-sm",
  md: "w-8 h-8 text-base",
  lg: "w-10 h-10 text-lg",
  xl: "w-12 h-12 text-xl",
};

const roundedClasses = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const bgColorClasses = {
  gray: "bg-gray-500",
  red: "bg-red-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
  yellow: "bg-yellow-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  indigo: "bg-indigo-500",
};

const textColorClasses = {
  white: "text-white",
  black: "text-black",
};

export const Avatar = ({
  src,
  alt = "Avatar",
  size = "md",
  rounded = "full",
  bgColor = "gray",
  textColor = "white",
  letter,
  className = "",
}: AvatarProps): ReactElement => {
  const displayLetter = letter ? letter.charAt(0) : alt.charAt(0).toUpperCase();

  return (
    <div
      className={`overflow-hidden ${sizeClasses[size]} ${roundedClasses[rounded]} ${className}`}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center ${bgColorClasses[bgColor]} ${textColorClasses[textColor]} font-medium`}
        >
          {displayLetter}
        </div>
      )}
    </div>
  );
};
