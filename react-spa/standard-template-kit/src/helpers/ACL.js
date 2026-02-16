import { getAPIBase } from "./AppHelpers";

export async function aclCheck(
  allowedGroups = [],
  deniedGroups = [],
  hideComponent = false
) {
  if (hideComponent === true || hideComponent === "true") {
    return false;
  }

  if (allowedGroups.length === 0 && deniedGroups.length === 0) {
    return true;
  }

  const apiBase = getAPIBase();
  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;

  const [orgUnitNameResponse, vdbGroupNameResponse] = await Promise.all([
    fetch(`${baseUrl}/rest/administration/users/current`).then((res) => res.json()),
    fetch(`${baseUrl}/rest/sso/users/current`).then((res) => res.json()),
  ]);

  const orgUnitName = "/BM_" + orgUnitNameResponse.orgUnitName;
  const vdbGroupName = "/VDBG_" + vdbGroupNameResponse.vdbGroupName;

  const userGroups = [orgUnitName, vdbGroupName];

  const isInAllowed = userGroups.some((g) => allowedGroups.includes(g));
  const isInDenied = userGroups.some((g) => deniedGroups.includes(g));

  if (isInDenied && !isInAllowed) {
    return false;
  }

  if (allowedGroups.length > 0 && !isInAllowed) {
    return false;
  }

  return true;
}
