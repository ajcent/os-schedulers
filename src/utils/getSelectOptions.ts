// This function acceps an enum, and then turn it into entries

function getSelectOptions<T extends Record<string, string | number>>(
  enumObj: T,
  remove?: (keyof T)[]
): [keyof T, T[keyof T]][] {
  let entries = Object.entries(enumObj) as [keyof T, T[keyof T]][];
  if (!remove) return entries;

  return entries.filter((entry) => !remove.includes(entry[0]));
}

export default getSelectOptions;
