import { useRouter } from "next/router";
import { rem } from "polished";
import { RoundedButton } from "~/components";
import { styled } from "~/stitches.config";

const Flex = styled("div", {
  display: "flex",
  width: "100%",
  fontSize: rem(17),
  color: "$gray01",
  '[aria-label="orange-text"]': { color: "$primary" },
  div: {
    textAlign: "center",
  },
});
export const PreUploadPrescription: React.FC<{
  moveToUploadPrescription: () => void;
}> = ({ moveToUploadPrescription }) => {
  const router = useRouter();

  return (
    <Flex css={{ flexDirection: "column", alignItems: "center" }}>
      <div style={{ marginBottom: rem(38) }}>
        <span aria-label="orange-text">진료</span>가{" "}
        <span aria-label="orange-text">종료</span>
        되었습니다.
        <br />
        <span aria-label="orange-text">처방전</span>과{" "}
        <span aria-label="orange-text">진료비</span>를 등록해 주세요.
      </div>
      <Flex css={{ justifyContent: "space-between", gap: rem(15) }}>
        <RoundedButton
          color="black"
          css={{ flex: `${rem(230)} 1`, maxWidth: rem(350), height: rem(50) }}
          onClick={() => router.push("/diagnosis")}
        >
          대기실로 이동
        </RoundedButton>
        <RoundedButton
          color="orange"
          css={{ flex: `${rem(230)} 1`, maxWidth: rem(350), height: rem(50) }}
          onClick={moveToUploadPrescription}
        >
          처방전&진료비 등록
        </RoundedButton>
      </Flex>
    </Flex>
  );
};
