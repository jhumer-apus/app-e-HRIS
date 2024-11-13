import { INTERNAL_USER_ROLE } from "@/types/types-store";

export * from "@/data/statistics-cards-data";
export * from "@/data/statistics-charts-data";
export * from "@/data/projects-table-data";
export * from "@/data/orders-overview-data";
export * from "@/data/platform-settings-data";
export * from "@/data/conversations-data";
export * from "@/data/projects-data";
export * from "@/data/authors-table-data";

export const roles = [
    {
        id: INTERNAL_USER_ROLE.Developer,
        role_name: "Developer"
    },
    {
        id: INTERNAL_USER_ROLE.HR_Super_Admin,
        role_name: "HR Super Admin"
    },
    {
        id: INTERNAL_USER_ROLE.HR_Director_Manager,
        role_name: "HR Director / Manager"
    },
    {
        id: INTERNAL_USER_ROLE.HR_Staff,
        role_name: "HR Staff"
    },
    {
        id: INTERNAL_USER_ROLE.Manager,
        role_name: "Department Manager / Director"
    },
    {
        id: INTERNAL_USER_ROLE.Employee,
        role_name: "Employee"
    },
]