import NextImage from "next/image";
import NextLink from "next/link";
import { ComponentProps, FC } from "react";
import { styled } from "~/stitches.config";

export const Address = styled("address", {});
export const Aside = styled("aside", {});
export const Article = styled("article", {});
export const Div = styled("div", {
  '&[role="button"]': {
    cursor: "pointer",
  },
});
export const Dl = styled("dl", {
  margin: 0,
});
export const Dt = styled("dt", {});
export const Dd = styled("dd", {
  margin: 0,
});
export const Form = styled("form", {});
export const Footer = styled("footer", {});
export const Header = styled("header", {});
export const Heading = styled("h1", {
  margin: 0,
  padding: 0,
});
export const Link: FC<
  ComponentProps<typeof NextLink> & Pick<ComponentProps<typeof Span>, "css">
> = ({ as, css, children, ...props }) => (
  <Span css={{ pointerEvents: "none", cursor: "pointer", ...css }}>
    <NextLink {...props}>{children}</NextLink>
  </Span>
);
export const Main = styled("main", {});
export const P = styled("p", {
  margin: 0,
  padding: 0,
});
export const Section = styled("section", {});
export const Span = styled("span", {});
export const TextArea = styled("textarea", {});
export const Ul = styled("ul", {
  padding: 0,
  margin: 0,
  listStyleType: "none",
});
export const Li = styled("li", {
  padding: 0,
  margin: 0,
});

export const Image = styled(NextImage, {});

export const Table = styled("table", {});
export const Thead = styled("thead", {});
export const Tbody = styled("tbody", {});
export const Tr = styled("tr", {});
export const Th = styled("th", {});
export const Td = styled("td", {});
