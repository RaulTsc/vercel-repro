import * as React from "react";

interface IGetStylesOptions {
  bgImgUrl?: string;
  height?: string | number;
  width?: string | number;
}
const getStyles = ({ bgImgUrl, height, width }: IGetStylesOptions): any => ({
  root: {
    height,
    width: width || "initial",
    overflow: "hidden",
    textAlign: "center",
    position: "relative",
  },
  imageDiv: {
    backgroundImage: bgImgUrl ? `url(${bgImgUrl})` : undefined,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "50% 50%",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

export interface IResponsiveImageProps {
  src: string;
  height?: number | string;
  width?: number | string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}
export const ResponsiveImage = ({
  src = "",
  height = 300,
  width,
  style,
  className,
  onClick,
}: IResponsiveImageProps) => (
  <div
    style={{ ...getStyles({ height, width }).root, ...style }}
    className={className}
    onClick={onClick}
  >
    <div style={getStyles({ bgImgUrl: src }).imageDiv} />
  </div>
);
(ResponsiveImage as React.StatelessComponent).displayName = "ResponsiveImage";
