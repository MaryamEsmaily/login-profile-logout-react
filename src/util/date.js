import * as moment from "jalali-moment";

const convertDateToObj = (date) => {
  const day = moment(date, "jYYYYjMMjDD").jDate();
  const month = moment(date, "jYYYYjMMjDD").jMonth();
  const year = moment(date, "jYYYYjMMjDD").jYear();
  return { day, month: month + 1, year };
};

const fixedSingleNumber = (num) => {
  const strNum = String(num);
  const length = strNum.length;
  if (length === 2) return num;
  return `0${num}`;
};

const convertObjToData = (date) => {
  const year = date.year;
  const month = date.month;
  const day = date.day;
  return +`${year}${fixedSingleNumber(month)}${fixedSingleNumber(day)}`;
};

export { convertDateToObj, convertObjToData };
