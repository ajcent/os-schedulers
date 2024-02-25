export default function countFalse(boolArray: boolean[]): number {
  let count = 0;
  for (const value of boolArray) {
    if (!value) {
      count++;
    }
  }
  return count;
}
