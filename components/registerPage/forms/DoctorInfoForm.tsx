import { Result } from "antd";
import { rem } from "polished";
import { Reducer, ReducerState, useEffect, useReducer, useState } from "react";
import { useFormContext } from "react-hook-form";
import { PhoneNumberCertificationResult } from "~//interfaces";
import {
  Dropdown,
  RegisterFormRowItem,
  FormRowItemWrapper,
  RegisterFormSection,
  FileDropInput,
  Label,
  PhoneNumberCertificationButton,
  CheckedIcon,
  ProfilePic,
  PlaceHolder,
  LicenceField,
  Input,
  DropdownOnChange,
  FormFieldErrorMessage,
} from "~/components";
import { SPECIAL_OPTIONS } from "~/utils/constants";
import { validateImageFile } from "~/utils/validation.utils";
import { api } from "~/woozooapi";

const reducer: Reducer<
  {
    doctorLicenseFileName: string;
    specialLicenseFileName: string;
  },
  {
    type: string;
    payload: any;
  }
> = (state, action) => {
  switch (action.type) {
    case "setDoctorLicenceFileName":
      return { ...state, doctorLicenseFileName: action.payload };
    case "setSpecialLicenseFileName":
      return { ...state, specialLicenseFileName: action.payload };
    default:
      return state;
  }
};

const initialState: ReducerState<typeof reducer> = {
  doctorLicenseFileName: "",
  specialLicenseFileName: "",
};

export const DoctorInfoForm = () => {
  const [registerFormState, dispatch] = useReducer(reducer, initialState);
  const { register, setValue, setError, trigger, getValues, formState } =
    useFormContext();
  const [profilePicUrl, setProfilePicUrl] = useState<string | undefined>();


  useEffect(() => {
    const profilePic = getValues("profilePic");
    if (typeof profilePic === "string" && profilePic.includes("aws")) {
      setProfilePicUrl(profilePic);
    }
  }, [getValues, formState]);

  const handleProfilePicUpload = async (file: File) => {
    const result = validateImageFile(file);

    if (!result.valid) {
      setError("profilePic", {
        types: result.message,
      });
      return;
    }

    const doctorName = getValues("name");

    const res = await api.fileUpload({
      file,
      prefix: "profile",
      name: doctorName,
    }).then((data) => { setValue("profilePic", data.url) }).catch(() => alert("이름을 입력해주세요,"))
    // setValue("profilePic", res.url);
    await trigger("profilePic");
  };
  const [textValue, setTextValue] = useState("");

  const handleDoctorLicenseUpload = async (file: File) => {
    const result = validateImageFile(file);

    if (!result.valid) {
      setError("certificate_image", {
        types: result.message,
      });
      return;
    }

    dispatch({ type: "setDoctorLicenceFileName", payload: file.name });

    const response = await api.fileUpload({
      file,
      name: "doctor-license",
    });

    setValue("certificate_image", response.url);
    await trigger("certificate_image");
  };

  const handleSpecialLicenseUpload = async (file: File) => {
    const result = validateImageFile(file);

    if (!result.valid) {
      setError("specialLicense", {
        types: result.message,
      });
      return;
    }

    dispatch({ type: "setSpecialLicenseFileName", payload: file.name });

    const response = await api.fileUpload({
      file,
      name: "special-license",
    });

    setValue("specialLicense", response.url);
    await trigger("specialLicense");
  };

  const handleDoctorLicenseDelete = async () => {
    setValue("certificate_image", undefined);
    await trigger("certificate_image");
    dispatch({ type: "setDoctorLicenceFileName", payload: "" });
  };


  const onlyNumberText = (data: string) => {
    setTextValue(data)
    if (data) {
      const replaceData = data.replace(/[^0-9]/g, "")
      return setTextValue(replaceData)
    }
  };

  return (
    <RegisterFormSection>
      <RegisterFormRowItem
        label="이름"
        placeholder="이름을 입력해 주세요."
        autoComplete="off"
        id="username"
        type="text"
        required
        {...register("username")}
      />
      <RegisterFormRowItem
        value={textValue}
        label="휴대폰 번호"
        placeholder="숫자만 입력해주세요."
        maxLength={11}
        type="mobile"
        required
        {...register("mobile", {
          onChange: (e) => {
            onlyNumberText(e.target.value)
          }
        })}
      >
      </RegisterFormRowItem>
      <RegisterFormRowItem
        id="email"
        type="email"
        label="이메일(아이디)"
        autoComplete="off"
        placeholder="이메일을 입력해 주세요."
        required
        {...register("email")}
      />
      <RegisterFormRowItem
        id="password"
        type="password"
        label="비밀번호"
        autoComplete="new-password"
        placeholder="비밀번호를 입력해 주세요."
        required
        {...register("password")}
      />
      <RegisterFormRowItem
        id="password2"
        type="password"
        label="비밀번호 확인"
        autoComplete="off"
        placeholder="비밀번호를 한번 더 입력해 주세요."
        required
        {...register("password2")}
      />
      <LicenceField
        required
        name="certificate_image"
        label="상담사 자격증"
        fileName={registerFormState.doctorLicenseFileName}
        handleUpload={handleDoctorLicenseUpload}
        handleDelete={handleDoctorLicenseDelete}
      />
    </RegisterFormSection>
  );
};
