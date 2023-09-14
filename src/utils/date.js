import moment from "moment";


export const dateToString = (date) => moment(date).format('DD-MM-YYYY');

export const stringToFormatDate = (date) =>  moment(date,'DD-MM-YYYY')
