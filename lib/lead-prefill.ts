export function prefillAndScrollToContact(insuranceType: string, comment: string) {
  const detail = { insuranceType, comment };
  try {
    sessionStorage.setItem("leadPrefill", JSON.stringify(detail));
  } catch {
    // sessionStorage unavailable — not critical, the event dispatch below still works
  }
  window.dispatchEvent(new CustomEvent("lead-prefill", { detail }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}
