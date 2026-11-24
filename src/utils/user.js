const capitalize = (word = '') => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

// "ABDUFATTOH SOBIROV ..." → { shortName: "A. Sobirov", initials: "AS", department }
export function getUserDisplay(user) {
  const [firstName = '', lastName = ''] = (user?.fullName ?? '').trim().split(/\s+/);

  return {
    shortName: lastName ? `${firstName.charAt(0)}. ${capitalize(lastName)}` : capitalize(firstName),
    initials: `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase(),
    department: user?.department ?? '',
  };
}