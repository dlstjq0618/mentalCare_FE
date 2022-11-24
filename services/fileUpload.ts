import camelcaseKeys from "camelcase-keys";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FileUploadResponse } from "~/interfaces";
import { HOST, URLS } from "~/woozooapi/urls";

export const fileApi = createApi({
  reducerPath: "file",
  baseQuery: fetchBaseQuery({
    baseUrl: HOST,
  }),
  endpoints: (builder) => ({
    fileUpload: builder.mutation<
      FileUploadResponse,
      {
        file: File;
        name?: string;
        prefix?: string;
        suffix?: string;
      }
    >({
      query: ({ file, name, prefix, suffix }) => {
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
        return {
          url: URLS.FILE_UPLOAD,
          method: "POST",
          body: fileUploadData,
        };
      },
    }),
  }),
});

export const { useFileUploadMutation } = fileApi;
