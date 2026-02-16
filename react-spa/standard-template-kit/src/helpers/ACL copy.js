import { async } from "@magnolia/react-editor/build/mgnl-react-editor";
import { getAPIBase } from "./AppHelpers";

export async function aclCheck(allowedGroups, deniedGroups, hideComponent) {

  const apiBase = getAPIBase();
  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW; 

  // const [userName, setUserName] = useState();
  // const [users, setUsers] = useState();

  // useEffect(() => {
  //   fetch("https://dg-test.brandmaker.com/rest/administration/users/_current")
  //     .then(response => response.json())
  //     .then(data => {
  //       setUserName(data);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch(`${apiBase}/.rest/delivery/users`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setUsers(data.results);
  //     });
  // }, [apiBase]);

  let orgUnitName = null;  
  let orgUnitIdMgnl = null;
  let vdbGroupId = null;
  let vdbGroupName = null;
  let vdbGroupIdMgnl = null;
  let currentUser = null;
  let users = null;  

  async function fetchOrgUnitName() {
    const response = await fetch(
      `${baseUrl}/rest/administration/users/current`
    );
    const data = await response.json();
    orgUnitName = "BM_" + data.orgUnitName;
  }

  await fetchOrgUnitName();

  async function fetchVdbGroupId() {
    const response = await fetch(
      `${baseUrl}/rest/administration/users/_current`
    );
    const data = await response.json();
    currentUser = data;
    vdbGroupId = data.vdbGroupId;    
  }

  await fetchVdbGroupId();

  async function fetchVdbGroupName() {
    const response = await fetch(
      `${baseUrl}/rest/administration/virtual-database-groups`
    );
    const data = await response.json();
    
    const vdbGroup = data.find(item => item.id === vdbGroupId);
    vdbGroupName = "VDBG_" + vdbGroup.name;
  }

  await fetchVdbGroupName();    

  async function fetchUsers() {
    const response = await fetch(`${apiBase}/.rest/delivery/users`);
    const data = await response.json();
    users = data.results;
  }

  await fetchUsers();

  async function fetchMagnoliaUserGroups() {
    const response = await fetch(`${apiBase}/.rest/delivery/usergroups`);
    const data = await response.json();
    const vdbGroupMgnl = data.results.find(item => item["@name"] === vdbGroupName);
    vdbGroupIdMgnl = vdbGroupMgnl["@id"];
    const orgUnitMgnl = data.results.find(item => item["@name"] === orgUnitName);
    orgUnitIdMgnl = orgUnitMgnl["@id"];
  }

  await fetchMagnoliaUserGroups();

  var userGroupsIds = new Array(vdbGroupIdMgnl, orgUnitIdMgnl);

  console.log("orgUnitName");
  console.log(orgUnitName);
  console.log("vdbGroupId");
  console.log(vdbGroupId);
  console.log("vdbGroupName");
  console.log(vdbGroupName);
  console.log("vdbGroupIdMgnl");
  console.log(vdbGroupIdMgnl);
  console.log("orgUnitIdMgnl");
  console.log(orgUnitIdMgnl);

  async function checkACL() {

    let allowed_check = "false";
    let denied_check = "false";
    let showComponent = "true";

    if (hideComponent === "false" || hideComponent === false) {
      if (allowedGroups?.length === 0 && deniedGroups?.length === 0) {
        showComponent = true;
      } else if (allowedGroups?.length !== 0 || deniedGroups?.length !== 0) {
        allowedGroups?.forEach((allowedGroup) => {
            userGroupsIds.forEach((groupId) => {  
            if (groupId === allowedGroup) {
              allowed_check = "true";
              return;
            }
          });
          if (allowed_check === "true") {
            return;
          }
        });

        deniedGroups?.forEach((deniedGroup) => {
          userGroupsIds.forEach((groupId) => {
            if (groupId === deniedGroup) {
                denied_check = "true";
                return;
            }
          });
          
          if (denied_check === "true") {
          }
       });

        if (denied_check === "true" && allowed_check === "false") {
          showComponent = false;
        } else if (allowed_check === "true") {
          showComponent = true;
        } else if (allowedGroups.length !== 0 && allowed_check === "false") {
          showComponent = false;
        } else if (allowed_check === "false") {
          showComponent = true;
        }
      }
    } else {
      showComponent = false;
    }
    return showComponent;
  }

  return await checkACL();
}
