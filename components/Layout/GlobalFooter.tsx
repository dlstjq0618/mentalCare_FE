import { rem } from "polished";
import { useEffect } from "react";
import { CopyrightIcon, Div, Footer } from "~/components";

export const GlobalFooter = () => {
  useEffect(() => {
    const contentEl = document.getElementById("content");
    if (contentEl) {
      document.documentElement.style.setProperty(
        "--footer-width",
        rem(contentEl.clientWidth)
      );
    }
  }, []);

  return (
    <Footer
      css={{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "auto",
        paddingTop: rem(10),
        paddingBottom: rem(30),
      }}
    >
      <Div
        css={{
          flexBasis: "var(--footer-width)",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <CopyrightIcon />
      </Div>
    </Footer>
  );
};
