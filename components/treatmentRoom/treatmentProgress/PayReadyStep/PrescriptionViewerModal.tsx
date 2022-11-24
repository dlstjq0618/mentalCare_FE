import { rem } from "polished";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { styled } from "~/stitches.config";

export const CloseIcon = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="25" cy="25" r="25" fill="#000" fillOpacity=".3" />
    <path
      d="m14.703 14.706 20.588 20.588M14.703 35.293l20.588-20.588"
      stroke="#fff"
      strokeWidth="2"
    />
  </svg>
);

const Overlay = styled(DialogOverlay, {
  "&[data-reach-dialog-overlay]": {
    zIndex: "3",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
});

const Content = styled(DialogContent, {
  "&[data-reach-dialog-content]": {
    width: rem(576),
    height: rem(815),
    "@bp1": {
      width: rem(820),
      height: "907px",
    },
    position: "relative",
    padding: 0,
    span: {
      width: "100% !important",
      height: "100% !important",
      position: "relative !important",
      overflow: "scroll !important",
    },
    img: {
      width: "100% !important",
      height: "auto !important",
      maxHeight: "min-content !important",
      top: "0 !important",
      margin: "0 !important",
    },
    ".close-button": {
      button: {
        width: rem(34),
        height: rem(34),
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
      },
      position: "absolute",
      top: rem(30),
      right: rem(50),
      zIndex: "1",
    },
    iframe: {
      ".embed-pdf-viewer": { width: "100% !important" },
    },
  },
});
interface Props {
  showDialog: boolean;
  url?: string;
  close: () => void;
}

export const PrescriptionViewerModal: React.FC<Props> = ({
  showDialog,
  url,
  close,
}) => {
  return (
    <Overlay isOpen={showDialog} onDismiss={close}>
      <Content>
        <div
          className="close-button"
          style={{ textAlign: "right", height: rem(34) }}
        >
          <button onClick={close}>
            <CloseIcon />
          </button>
        </div>
        <iframe
          src={`${url}#view=fitH&toolbar=0`}
          id="prescription"
          width="100%"
          height="100%"
        ></iframe>
      </Content>
    </Overlay>
  );
};
