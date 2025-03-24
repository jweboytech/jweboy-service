import * as forge from 'node-forge';

export function getCertificateData(content: string) {
  const certData = forge.pki.certificateFromPem(content);
  const expirationDate = certData.validity.notAfter;
  const generationDate = certData.validity.notBefore;
  const sanField = certData.getExtension('subjectAltName');
  const domains = sanField.altNames.map((item) => item.value);

  return {
    expirationDate,
    generationDate,
    domain: domains[0],
  };
}
