import { AxiosResponse } from "axios";
import { axios } from "./baseAxiosInstance";
import { URLS } from "./urls";
import { FileUploadResponse } from "~/interfaces";

export const fileUpload = async ({
  file,
  name,
  prefix,
  suffix,
}: {
  file: File;
  name?: string;
  prefix?: string;
  suffix?: string;
}) => {
  const fileUploadData = new FormData();

  fileUploadData.append("file", file);

  if (name) {
    fileUploadData.append("name", name);
  }

  if (prefix) {
    fileUploadData.append("prefix", prefix);
  }

  if (suffix) {
    fileUploadData.append("suffix", suffix);
  }

  const res = await axios.request<
    FileUploadResponse,
    AxiosResponse<FileUploadResponse>,
    FormData
  >({
    url: URLS.FILE_UPLOAD,
    method: "POST",
    data: fileUploadData,
  });

  return res.data;
};
