import { useRouter } from "next/router";
import { Title, Text } from "./Styles";
import { BackButton, PrivateIcon_Title } from "~/components";

export const PrivateImmediatelyHeader = () => {
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.back();
  };

  return (
    <div>
      <Title>
        <BackButton onClick={handleBackButtonClick} />
        <span>즉시 접수</span>
        <PrivateIcon_Title />
      </Title>
      <Text>
        <span>병원에서 환자에게 비대면진료를 위한 접수를 요청합니다.</span>{" "}
        <br />
        <span aria-label="orange-text">
          우주약방 앱을 설치할 수 있는 환자(또는 보호자)의 휴대폰 번호를
          입력해주세요.
        </span>
      </Text>
    </div>
  );
};
