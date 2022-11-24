import { rem } from "polished";
import {
  ChangeEventHandler,
  ComponentProps,
  useEffect,
  useState,
  VFC,
} from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Span } from "./Elements";
import { CheckedIcon, Li, Ul, Input, Div } from "~/components";
import { styled } from "~/stitches.config";

const CheckboxItem = styled(RadixCheckbox.Root, {
  height: rem(50),
  borderRadius: rem(100),
  border: `1px solid`,
  borderColor: "$gray06",
  backgroundColor: "transparent",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingInlineStart: rem(24),
  paddingInlineEnd: rem(12),
  '&[aria-checked="true"]': {
    borderColor: "$primary",
    ".uncheckedIcon": {
      display: "none",
    },
  },
});

const CheckboxIndicator = styled(RadixCheckbox.Indicator, {
  display: "flex",
  alignItems: "center",
});

export const CheckboxGroup: VFC<
  ComponentProps<typeof Div> & {
    items: { label: string; value: string; checked: boolean }[];
    handleCheck: (selectedIds: string[]) => void;
  }
> = ({ items, handleCheck, ...props }) => {
  const [selected, setSelected] = useState<string[]>([]);
  useEffect(() => {
    setSelected(
      items.filter((item) => item.checked)?.map((item) => item.value)
    );
  }, [items]);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked) {
      setSelected((prev) => [...prev, e.target.value]);
    } else {
      setSelected((prev) =>
        prev.filter((item) => {
          return item !== e.target.value;
        })
      );
    }
  };

  useEffect(() => {
    handleCheck(selected);
  }, [handleCheck, selected]);

  return (
    <Div {...props} onChange={handleChange}>
      {items?.map((item) => (
        <CheckboxItem
          key={item.value}
          defaultChecked={item.checked}
          value={item.value}
        >
          {item.label}
          <CheckboxIndicator>
            <CheckedIcon />
          </CheckboxIndicator>
          <Span
            className="uncheckedIcon"
            css={{
              display: "flex",
              svg: {
                path: {
                  stroke: "$gray06",
                },
              },
            }}
          >
            <CheckedIcon />
          </Span>
        </CheckboxItem>
      ))}
    </Div>
  );
};
