export const getCurrentYear = () => new Date().getFullYear();

export const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const is31DaysMonth = (month: number) => {
  month = Number(month);
  return (
    month === 1 ||
    month === 3 ||
    month === 5 ||
    month === 7 ||
    month === 8 ||
    month === 10 ||
    month === 12
  );
};

export const getDaysInMonth = (yearStr: string, monthStr: string) => {
  const year = Number(yearStr);
  const month = Number(monthStr);

  if (month && is31DaysMonth(Number(month))) {
    return 31;
  }

  if (year && isLeapYear(year) && month === 2) {
    return 29;
  }

  if (year && month === 2) {
    return 28;
  }

  return 30;
};

const currentYear = getCurrentYear();

const possibleYear = {
  from: currentYear - 110,
  to: currentYear - 19,
};

export const makeArrayLengthOf = (length: number) =>
  Array.from(Array(length).keys());

export const getYearOptions = () =>
  makeArrayLengthOf(100)
    ?.map((_, index) => {
      return {
        label: `${index + possibleYear.from}`,
        value: `${index + possibleYear.from}`,
      };
    })
    .filter((year) => Number(year.value) < possibleYear.to)
    .reverse();

export const getMonthOptions = () =>
  makeArrayLengthOf(12)?.map((_, index) => ({
    label: `${index + 1}`,
    value: `${index + 1}`,
  }));

export const getDayOptions = (days: string) => {
  return makeArrayLengthOf(Number(days))?.map((_, index) => ({
    label: `${index + 1}`,
    value: `${index + 1}`,
  }));
};
