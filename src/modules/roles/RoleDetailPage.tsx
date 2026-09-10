import {
    useEffect,
    useState
}
from "react";

import { RoleService }
from "./RoleService";

interface Props {

    roleId: string;
}

const roleService =
    new RoleService();

export default function RoleDetailPage(
    props: Props
) {

    const [role, setRole] =
        useState<any>(null);

    useEffect(() => {

        loadRole();

    }, []);

    async function loadRole() {

        const result =
            await roleService.getRoleById(
                props.roleId
            );

        setRole(result);
    }

    if (!role) {

        return (
            <div>
                Loading...
            </div>
        );
    }

    return (

        <div
            style={{
                padding: "40px"
            }}
        >

            <h1>
                Role Detail
            </h1>

            <p>
                Role Name:
                {role.roleName}
            </p>

            <p>
                Description:
                {role.description}
            </p>

            <p>
             User Count:
               {role.userRoles?.length ?? 0}
            </p>


            <h2>
                Assigned Users
            </h2>

            <ul>

                {role.userRoles?.map(
                    (userRole: any) => (

                        <li
                            key={userRole.id}
                        >
                            {userRole.userId}
                        </li>
                    )
                )}

            </ul>

        </div>
    );
}