import Link from "next/link";
import { rem } from "polished";
import { styled } from "~/stitches.config";

export const StyledButton = styled("a", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "$p4-14",
  color: "$white",
  fontStyle: "none",
  padding: rem(5),
  border: "none",
  borderRadius: rem(16),
  margin: `0 ${rem(10)}`,
  width: rem(70),
  height: rem(70),
  cursor: "pointer",
  backgroundColor: "$black01",
  "&:hover": {
    backgroundColor: "$gray09",
    boxShadow: "0 8px 8px 0 $black10",
    color: "$white",
  },
  "&:active": {
    fontWeight: "bold",
    backgroundColor: "$black01",
    svg: {
      path: {
        stroke: "$primary",
        strokeWidth: "2",
      },
      circle: {
        stroke: "$primary",
      },
    },
    span: {
      color: "$primary",
    },
  },
  variants: {
    visiting: {
      true: {
        fontWeight: "bold",
        backgroundColor: "$black01",
        svg: {
          path: {
            stroke: "$primary",
            strokeWidth: "2",
          },
          circle: {
            stroke: "$primary",
          },
        },
        span: {
          color: "$primary",
        },
      },
    },
  },
  span: {
    fontSize: rem(22),
  },
});
export const SideBarButtons: React.FC<{ href: string; visiting: boolean }> = ({
  children,
  href,
  visiting,
}) => {
  return (
    <Link href={href} passHref>
      <StyledButton visiting={visiting}>{children}</StyledButton>
    </Link>
  );
};
