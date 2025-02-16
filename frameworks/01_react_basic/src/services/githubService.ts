import { OrganizationMember } from "../types/types";

export const fetchOrganizationMembers = async (
    organizationName: string,
    perPage: number = 5,
    page: number = 1
): Promise<OrganizationMember[]> => {
    const apiUrl = `https://api.github.com/orgs/${organizationName}/members?per_page=${perPage}&page=${page}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch members: ${response.statusText}`);
        }

        const data: OrganizationMember[] = await response.json();
        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
    }
};
