import { useRouter } from "next/router";
import { rem } from "polished";
import { PrivateIcon_Big } from "~/components";
import { styled } from "~/stitches.config";

const Button = styled("button", {
  position: "relative",
  width: "100%",
  height: rem(111),
  backgroundColor: "$black01",
  boxShadow: `0 ${rem(3)} ${rem(3)} 0 rgba(140, 140, 140, 0.2)`,
  borderRadius: rem(20),
  border: "none",
  marginTop: rem(17),
  padding: `${rem(33)} ${rem(15)} ${rem(20)}`,
  textAlign: "center",
  fontSize: "$p6-12",
  lineHeight: "1.4",
  color: "rgba(255, 255, 255, 0.8)",
  ".bold-text": {
    display: "block",
    fontSize: "$p4-14",
    fontWeight: "bold",
    marginBottom: rem(4),
  },
  svg: {
    position: "absolute",
    top: rem(-5),
    left: "50%",
    transform: "translateX(-50%)",
  },
  "&:hover": {
    backgroundColor: "$primary",
  },
});

export const Button_Reservation = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push("/private/reservation")}>
      <span className="bold-text">예약 접수</span>
      <span>
        프라이빗 진료를 <br />
        시작하세요!
      </span>
      <PrivateIcon_Big />
    </Button>
  );
};
