import { enGB } from 'date-fns/locale';
import { format } from 'date-fns';

export const formatDate = (date: string) => {
  const formattedDate = format(new Date(date), 'dd/MM/yyyy, HH:mm:ss', {
    locale: enGB,
  });
  return formattedDate;
};
