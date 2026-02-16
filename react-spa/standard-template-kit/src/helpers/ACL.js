import { getAPIBase } from "./AppHelpers";

export async function aclCheck(
  allowedGroups = [],
  deniedGroups = [],
  hideComponent = false
) {
  // Ako odmah znamo da je hideComponent true, nema potrebe za daljom logikom
  if (hideComponent === true || hideComponent === "true") {
    return false;
  }

  // Ako ni allowed ni denied nisu prosleđeni, uvek prikazujemo
  if (allowedGroups.length === 0 && deniedGroups.length === 0) {
    return true;
  }

  const apiBase = getAPIBase();
  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;

  // 1. Povlačenje informacija o korisniku iz dva kraja:
  const [orgUnitNameResponse, vdbGroupNameResponse] = await Promise.all([
    fetch(`${baseUrl}/rest/administration/users/current`).then((res) => res.json()),
    fetch(`${baseUrl}/rest/sso/users/current`).then((res) => res.json()),
  ]);

  // 2. Formiramo nazive grupa (puteve) u kojima se korisnik nalazi
  const orgUnitName = "/BM_" + orgUnitNameResponse.orgUnitName;         // npr. "/BM_BrandMaker"
  const vdbGroupName = "/VDBG_" + vdbGroupNameResponse.vdbGroupName;   // npr. "/VDBG_Standard"

  // 3. Skup korisničkih grupa
  const userGroups = [orgUnitName, vdbGroupName];

  // console.log("User groups =>", userGroups);
  // console.log("Allowed =>", allowedGroups);
  // console.log("Denied =>", deniedGroups);

  // 4. Jednostavna logika za odobravanje / odbijanje
  // Da li je korisnik uopšte u nekoj od dopuštenih?
  const isInAllowed = userGroups.some((g) => allowedGroups.includes(g));
  // Da li je korisnik u nekoj zabranjenoj?
  const isInDenied = userGroups.some((g) => deniedGroups.includes(g));

  // Ako je korisnik u nekoj denied grupi, a nije ni u jednoj allowed, blokiraj.
  if (isInDenied && !isInAllowed) {
    return false;
  }

  // Ako postoje allowedGroups, a korisnik nije ni u jednoj od njih – blokiraj.
  if (allowedGroups.length > 0 && !isInAllowed) {
    return false;
  }

  // U svim ostalim slučajevima dozvoli prikaz.
  return true;
}
