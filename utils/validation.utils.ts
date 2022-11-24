export const validateImageFile = (
  file: File
):
  | { valid: true }
  | {
      valid: false;
      message: {
        name: string;
        size: string;
        fileType: string;
      };
    } => {
  const { type, name, size } = file;

  const message = {
    fileType: "",
    name: "",
    size: "",
  };

  if (!type.includes("image")) {
    message.fileType = `${name} 파일은 이미지 파일이 아닙니다.`;
  }

  if (size > 5_000_000) {
    message.size = `${name} 파일의 용량이 5MB를 초과하였습니다.`;
  }

  // if (name.length > 20) {
  //   message.name = `${name} 파일의 이름이 20자 제한을 초과하였습니다.`;
  // }

  if (message.fileType || message.size || message.name) {
    return {
      valid: false,
      message,
    };
  }

  console.log(`${name}은 업로드 가능합니다.`);

  return {
    valid: true,
  };
};
