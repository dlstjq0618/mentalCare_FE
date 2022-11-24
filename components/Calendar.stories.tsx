import { ComponentMeta } from "@storybook/react";
import { ScheduleCalendar } from "./Calendar";

export default {
  title: "Components/ScheduleCalendar",
  component: ScheduleCalendar,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ScheduleCalendar>;

export const Basic = () => {
  return <ScheduleCalendar />;
};
