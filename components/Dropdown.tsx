import { rem } from "polished";
import { ComponentProps, useEffect } from "react";
import Select, { GroupBase, Props } from "react-select";
import { PROFILE_PIC_FILE_SIZE } from "~/utils/form.utils";

const customStyles: ComponentProps<typeof Dropdown>["styles"] = {
  placeholder: (provided) => ({
    ...provided,
    fontSize: rem(15),
    color: "var(--colors-gray05)",
    paddingLeft: rem(20),
  }),
  control: (base) => ({
    ...base,
    border: "1px solid #eee",
    borderRadius: rem(100),
    boxShadow: "none",
    backgroundColor: "$white",
    "&:hover": {
      borderBottom: "1px solid $black10",
    },
    "&:focus": {
      borderBottom: "1px solid $black10",
    },
    fontSize: rem(17),
    color: "$gray05",
  }),
  container: (base) => ({
    ...base,
    width: "100%",
  }),
  valueContainer: (base, state) => ({
    ...base,
    padding: 0,
    color: state.hasValue ? "var(--colors-primary)" : base.color,
  }),
  input: (base) => ({
    ...base,
    color: "transparent",
  }),
  singleValue: (base) => ({
    ...base,
    paddingLeft: rem(20),
    paddingBottom: rem(2),
    color: "inherit",
  }),
  indicatorsContainer: (base, state) => ({
    ...base,
    paddingRight: rem(20),
    stroke: state.hasValue ? "var(--colors-primary)" : "var(--colors-gray05)",
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    border: "none",
  }),
  indicatorSeparator: (base) => ({
    display: "none",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 20,
    paddingTop: 0,
    overflow: "hidden",
  }),
  menuList: (base) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  option: (base, state) => ({
    ...base,
    fontSize: rem(16),
    paddingLeft: rem(30),
    height: rem(47),
    lineHeight: 1.8,
    borderBottom: "1px solid var(--colors-gray06)",
    color:
      state.isFocused && state.isSelected
        ? "var(--colors-white)"
        : state.isFocused
          ? "var(--colors-primary)"
          : base.color,
  }),
};

export type DropdownOnChange = ComponentProps<typeof Dropdown>["onChange"];

const DropdownIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m4 7 6.5 6.5L17 7"
      stroke="inherit"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type DropdownOption = { label: string; value: string; };
export const Dropdown = ({
  id,
  options,
  onChange,
  styles,
  ...props
}: Props<DropdownOption, false, GroupBase<DropdownOption>>) => {
  return (
    <Select
      id={id}
      instanceId={id}
      onChange={onChange}
      styles={{ ...customStyles, ...styles }}
      options={options}
      components={{
        DropdownIndicator: DropdownIcon,
      }}
      classNamePrefix="react-select"
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "var(--colors-primary)",
          primary25: "rgba(235, 84, 30, 0.06)",
        },
        spacing: {
          ...theme.spacing,
          controlHeight: 50,
        },
      })}
      {...props}
    />
  );
};
