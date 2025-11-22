export interface IUserName {
  firstName: string;
  lastName: string;
}

export function getFirstNameAndLastName(fullName: string): IUserName {
  const names = fullName.trim().split(' ');
  const firstName = names.at(0) || '';
  const lastName = names.length > 1 ? names.slice(1).join(' ') : '';

  return {
    firstName,
    lastName,
  };
}

export function getInitial(
  firstName: IUserName['firstName'],
  lastName: IUserName['lastName'],
): string {
  const firstLatterFirstName = firstName[0].toUpperCase();
  const firstLatterLastName = lastName[0].toUpperCase();

  return `${firstLatterFirstName}${firstLatterLastName}`;
}
