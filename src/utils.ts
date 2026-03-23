export const MONTHS_NL = [
  "januari", "februari", "maart", "april", "mei", "juni",
  "juli", "augustus", "september", "oktober", "november", "december"
];

export const DAYS_NL = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const ORDINALS: { [key: number]: string } = {
  1: "first", 2: "second", 3: "third", 4: "fourth", 5: "fifth",
  6: "sixth", 7: "seventh", 8: "eighth", 9: "ninth", 10: "tenth",
  11: "eleventh", 12: "twelfth", 13: "thirteenth", 14: "fourteenth", 15: "fifteenth",
  16: "sixteenth", 17: "seventeenth", 18: "eighteenth", 19: "nineteenth", 20: "twentieth",
  21: "twenty-first", 22: "twenty-second", 23: "twenty-third", 24: "twenty-fourth", 25: "twenty-fifth",
  26: "twenty-sixth", 27: "twenty-seventh", 28: "twenty-eighth", 29: "twenty-ninth", 30: "thirtieth",
  31: "thirty-first"
};

export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function generateDate() {
  const monthIndex = Math.floor(Math.random() * 12);
  const daysInMonth = new Date(2024, monthIndex + 1, 0).getDate(); // Use leap year to allow Feb 29
  const day = Math.floor(Math.random() * daysInMonth) + 1;
  const date = new Date(2024, monthIndex, day);
  const dayOfWeekIndex = date.getDay();
  
  return { day, monthIndex, dayOfWeekIndex };
}

export function getCorrectAnswers(day: number, monthIndex: number, dayOfWeekIndex: number) {
  const month = MONTHS[monthIndex];
  const ordinal = ORDINALS[day];
  const dayName = DAYS[dayOfWeekIndex];

  // British: [Day], the [ordinal] of [month]
  const british = `${dayName}, the ${ordinal} of ${month}`;
  
  // American: [Day], [month] the [ordinal]
  const american = `${dayName}, ${month} the ${ordinal}`;

  return { british, american };
}
