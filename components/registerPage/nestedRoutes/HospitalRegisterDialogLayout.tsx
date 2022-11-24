import { rem } from "polished";
import { FC } from "react";
import { BackOnDialogIcon, Div, Header } from "~/components";


export const HospitalRegisterDialogHeader: FC<{
  headerText?: string;
  backButton?: boolean;
  onBackButtonClick?: () => void;
}> = ({ headerText, backButton, onBackButtonClick: handleBackButtonClick }) => {
  return (
    <Header
      css={{
        display: "flex",
        justifyContent: "center",
        paddingTop: rem(30),
        h1: {
          fontSize: rem(17),
          fontWeight: "bold",
          margin: 0,
          textAlign: "center",
          lineHeight: 1,
        },
      }}
    >
      {backButton && (
        <Div
          css={{
            position: "absolute",
            top: rem(22),
            left: rem(22),
          }}
          role="button"
          onClick={handleBackButtonClick}
        >
          <BackOnDialogIcon />
        </Div>
      )}
      <h1>{headerText}</h1>
    </Header>
  );
};

export const HospitalRegisterDialogLayout: FC<{ headerText?: string }> = ({
  headerText = "병원 등록",
  children,
}) => {
  return (
    <>
      <HospitalRegisterDialogHeader
        backButton={headerText === "직접 입력" || headerText === "주소 검색"}
        onBackButtonClick={() => window.history.back()}
        headerText={headerText}
      />
      <Div
        css={{
          flex: "auto",
          position: "relative",
          display: "grid",
          gridTemplateColumns: `${rem(30)} 1fr ${rem(30)}`,
          gridAutoRows: "max-content",
          rowGap: rem(20),

          "& *": {
            gridColumn: "2/3",
          },

          ".full": {
            gridColumn: "1/4",
          },

          form: {
            flex: "auto",
            display: "flex",
            flexDirection: "column",
            gap: rem(20),
          },
          height: "100%",
        }}
      >
        {children}
      </Div>
    </>
  );
};