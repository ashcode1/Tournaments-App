import theme from '../theme';

export function calcNumOfColumns(width: number): number {
  let numOfColumns;
  if (width > 720) {
    console.log('2');
    numOfColumns = 2;
  } else {
    console.log('1');

    numOfColumns = 1;
  }
  return numOfColumns;
}

export function calcWidthPercentage(width: number) {
  let widthPercentage;
  if (width > 720) {
    widthPercentage = theme.percentage[50];
  } else {
    widthPercentage = theme.percentage[100];
  }
  return widthPercentage;
}
