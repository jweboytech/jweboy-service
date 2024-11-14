export function getCertificateData(data: any) {
  const expirationDate = data.validity.notAfter;
  const generationDate = data.validity.notBefore;
  const sanField = data.getExtension('subjectAltName');
  const domains = sanField.altNames.map((item) => item.value);

  return {
    expirationDate,
    generationDate,
    domain: domains[0],
  };
}
