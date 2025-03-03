import { format, parseISO  } from 'date-fns';

const formatDate = (dateStr: string): string => {
    const parsedDate = parseISO(dateStr);
    return format(parsedDate, 'yyyy-MM-dd');
};

export default formatDate;