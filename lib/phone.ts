export function formatRuPhone(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits === "") {
    return "";
  }
  if (digits.startsWith("8")) {
    digits = "7" + digits.slice(1);
  } else if (!digits.startsWith("7")) {
    digits = "7" + digits;
  }
  digits = digits.slice(0, 11);
  const rest = digits.slice(1);

  let formatted = "+7";
  if (rest.length > 0) formatted += ` (${rest.slice(0, 3)}`;
  if (rest.length >= 3) formatted += ")";
  if (rest.length > 3) formatted += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) formatted += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) formatted += `-${rest.slice(8, 10)}`;
  return formatted;
}

export function isCompleteRuPhone(phone: string): boolean {
  return phone.replace(/\D/g, "").length === 11;
}
