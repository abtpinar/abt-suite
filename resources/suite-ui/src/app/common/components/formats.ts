// import { ICON_TYPE } from './base-list/components/data-area/models/icon-type';
// import { IClient } from 'src/app/clients/models/IClient';
// import { IProvider } from '../../providers/models/IProvider';

// /**
//  * Formats a boolean value denoting activity/inactivity to a proper icon.
//  * @param active Boolean value determining whethere the calling element is
//  * active or not.
//  */
// export function formatBoolean(active: any): string {
//   return active ? ICON_TYPE.ACTIVE : ICON_TYPE.INACTIVE;
// }

// export function formatNull(value) {
//   return value && value !== '' ? value : '---';
// }

/**
 * Format a certain date from sql to style day/month/year.
 * @param date Date to Format
 *
 */
export function globalFormatDate(date: any, fullDate = false): string {
  if (!!date) {
    date.trim();
    const formatedDate = date.split('-');
    const preventHours = formatedDate[2].split(' ');
    if (fullDate && preventHours.length > 1) {
      const preventMiliseconds = preventHours[1].split('.');
      return `${preventHours[0]}/${formatedDate[1]}/${formatedDate[0]} ${preventMiliseconds[0]}`;
    }
    return `${preventHours[0]}/${formatedDate[1]}/${formatedDate[0]}`;
  } else {
    return '---';
  }
}

// export function getStringFormatDate(date: Date) {
//   let day;
//   let month;
//   if (date.getDay() < 10) day = '0' + date.getDay().toString();
//   else day = date.getDay().toString();

//   if (date.getMonth() < 10) month = '0' + date.getMonth().toString();
//   else month = date.getMonth().toString();

//   let result = day + '/' + month + '/' + date.getFullYear();
//   return result;
// }

// export function formatClientFullName(client: IClient) {
//   const { name, last_name, second_last_name } = client;
//   let result = name;
//   if (last_name) {
//     result += ` ${last_name}`;
//   }
//   if (second_last_name) {
//     result += ` ${second_last_name}`;
//   }
//   return result;
// }

// export function formatProviderFullName(provider: IProvider) {
//   const { business_name, last_name, second_last_name } = provider;
//   let result = business_name;
//   if (last_name) {
//     result += ` ${last_name}`;
//   }
//   if (second_last_name) {
//     result += ` ${second_last_name}`;
//   }
//   return result;
// }

// export function formatStringUpperCase(str: any): string {
//   if (typeof str == 'string') {
//     const result = str.toUpperCase();
//     return result;
//   } else {
//     return str;
//   }
// }

// export function formatClientAddress(client: IClient) {
//   const { address_street, address_number } = client;
//   return address_street && address_number
//     ? `${address_street} #${address_number}`
//     : '';
// }

// export function formatCurrency(money) {
//   return new Intl.NumberFormat('de-DE', {
//     style: 'currency',
//     currency: 'EUR'
//   }).format(money);
// }

export function formatDecimal(money, fraction_digits, locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: fraction_digits,
    minimumFractionDigits: fraction_digits
  }).format(money);
}

// export function parseDateFromLocalDate(date: any) {

//   const [month, day, year] = date.split('/');
//   return day+'/'+month+'/'+year;
// }

// export function toStringFormatFromDate(date: string, separator: string) {
//   const [day, month, year] = date.split(separator);
//   if (separator == '-')
//     return `${year}/${month}/${day}`;
//   else
//     return `${year}-${month}-${day}`;
// }



export function parseDateFromString(date: string) {
  const [year, month, day] = date.split('-');
  const parsedDate = new Date(+year, +month - 1, +day);
  return parsedDate;
}
