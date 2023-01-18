import { rem } from "polished";
import {
  DialogOverlay as ReachDialogOverlay,
  DialogContent as ReachDialogContent,
} from "@reach/dialog";
import "@reach/dialog/styles.css";
import { ComponentProps } from "@stitches/react";
import {
  Article,
  Heading,
  RoundedButton,
  ModalCloseIcon,
  Div,
} from "~/components";
import { styled } from "~/stitches.config";

const Overlay = styled(ReachDialogOverlay, {
  "&[data-reach-dialog-overlay]": {
    zIndex: "5",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
});

const Content = styled(ReachDialogContent, {
  position: "relative",
  "&[data-reach-dialog-content]": {
    width: rem(376),
    marginTop: "10%",
    marginLeft: "47%",
    "@bp1": {
      width: rem(436),
    },
    minHeight: "fit-content",
    borderRadius: rem(20),
    padding: `${rem(22)} ${rem(30)}`,
    ".close-button": {
      width: rem(34),
      height: rem(34),
      border: "none",
      backgroundColor: "transparent",
      cursor: "pointer",
      "&:hover": {
        svg: {
          path: {
            stroke: "$primary",
          },
        },
      },
    },
  },
});

const Flex = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 0,
});

interface Props {
  focusLock?: boolean;
  showDialog: boolean;
  dialogTitle?: string;
  backOption?: boolean;
  buttonTitle?: string;
  close: () => void;
}

export const BaseDialog: React.FC<Props & ComponentProps<typeof Content>> = ({
  showDialog,
  close,
  children,
  ...props
}) => {
  return (
    <Overlay isOpen={showDialog} >
      <Content {...props} aria-label="">
        <Div
          role="button"
          onClick={close}
          css={{
            display: "flex",
            position: "absolute",
            top: rem(22),
            right: rem(22),
            fontSize: rem(34),
          }}
        >
          <ModalCloseIcon />
        </Div>
        <Div css={{ height: rem(34) }} />
        <Flex>{children}</Flex>
      </Content>
    </Overlay>
  );
};
export const BaseDialog2: React.FC<Props & ComponentProps<typeof Content>> = ({
  showDialog,
  close,
  children,
  ...props
}) => {
  return (
    <Overlay isOpen={showDialog} >
      <Content {...props} >
        <Div
          role="button"
          onClick={close}
          css={{
            display: "flex",
            position: "absolute",
            top: rem(22),
            right: rem(22),
            fontSize: rem(34),
          }}
        >
          <ModalCloseIcon />
        </Div>
        <Div css={{ height: rem(34) }} />
        <Flex style={{ alignItems: "normal" }}>{children}</Flex>
      </Content>
    </Overlay>
  );
};

export const LoadDialog: React.FC<Props & ComponentProps<typeof Content>> = ({
  showDialog,
  close,
  children,
  ...props
}) => {
  return (
    <Overlay isOpen={showDialog} >
      <Content {...props}>
        <Div
          role="button"
          onClick={close}
          css={{
            display: "flex",
            position: "absolute",
            top: rem(22),
            right: rem(22),
            fontSize: rem(34),
          }}
        >
          {/* <ModalCloseIcon /> */}
        </Div>
        <Div css={{ height: rem(34) }} />
        <Flex style={{
          height: rem(376),
          textAlignLast: "center"
        }}>{children}</Flex>
      </Content>
    </Overlay>
  );
};

export const DialogWithCloseButton: React.FC<
  Props & ComponentProps<typeof Content>
> = ({ focusLock = true, showDialog, close, css, children, ...props }) => {
  return (
    <Overlay
      isOpen={showDialog}
      onDismiss={close}
      css={{
        position: "relative",
        display: "grid",
        placeItems: "center",
        ".close-button": {
          display: "flex",
          position: "absolute",
          top: rem(22),
          right: rem(22),
          padding: 0,
          margin: 0,
        },
      }}
      dangerouslyBypassFocusLock={!focusLock}
    >
      <Content css={css} {...props}>
        <Div
          role="button"
          css={{
            fontSize: rem(34),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: rem(22),
            right: rem(22),
            margin: 0,
            padding: 0,
          }}
          onClick={close}
        >
          <ModalCloseIcon />
        </Div>
        <Flex css={{ alignItems: "initial", flex: "auto" }}>{children}</Flex>
      </Content>
    </Overlay>
  );
};

export const AlertDialog: React.FC<
  {
    focusLock?: boolean;
  } & ComponentProps<typeof Overlay>
> = ({ focusLock = true, onDismiss, css, children, ...props }) => {
  return (
    <Overlay
      css={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        ".close-button": {
          display: "flex",
          position: "absolute",
          top: rem(22),
          right: rem(22),
          padding: 0,
          margin: 0,
        },
        "&[data-reach-dialog-content]": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        },
      }}
      dangerouslyBypassFocusLock={!focusLock}
      onDismiss={onDismiss}
      {...props}
    >
      <Content css={{ height: rem(255), width: rem(376) }}>
        <Div
          role="button"
          css={{
            fontSize: rem(34),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: rem(22),
            right: rem(22),
            margin: 0,
            padding: 0,
          }}
          onClick={onDismiss}
        >
          <ModalCloseIcon />
        </Div>
        <Article
          css={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            flex: 1,
            height: "100%",
            wordBreak: "keep-all",
            whiteSpace: "pre-wrap",
          }}
        >
          <Heading
            css={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontSize: rem(17),
              height: "100%",
            }}
          >
            {children}
          </Heading>
          <RoundedButton
            color="orange"
            onClick={onDismiss}
            css={{ flexBasis: rem(50), height: rem(50), width: "100%" }}
          >
            확인
          </RoundedButton>
        </Article>
      </Content>
    </Overlay>
  );
};

export const TermsDialog: React.FC<Props & ComponentProps<typeof Content>> = ({
  focusLock = true,
  showDialog,
  close,
  css,
  children,
  ...props
}) => {
  return (
    <Overlay
      isOpen={showDialog}
      onDismiss={close}
      css={{
        position: "relative",
        display: "grid",
        placeItems: "center",
      }}
      dangerouslyBypassFocusLock={!focusLock}
    >
      <Content
        aria-label="약관 보기 다이얼로그"
        css={{
          display: "flex",
          flexDirection: "column",
          "&[data-reach-dialog-content]": {
            width: rem(660),
            height: "80vh",
            paddingBlock: rem(62),
            paddingBlockEnd: rem(40),
            paddingInline: rem(40),
            paddingInlineEnd: rem(10),
          },
        }}
        {...props}
      >
        <Div
          role="button"
          css={{
            fontSize: rem(34),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: rem(22),
            right: rem(22),
            margin: 0,
            padding: 0,
          }}
          onClick={close}
        >
          <ModalCloseIcon />
        </Div>
        {children}
      </Content>
    </Overlay>
  );
};

export const DialogOverlay = Overlay;
export const DialogContent = Content;
