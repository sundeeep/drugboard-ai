import { appwriteClient } from ".";
import { Teams } from "appwrite";
import { toast } from "react-toastify";

class AppWriteTeams {
    team;
    constructor() {
        this.team = new Teams(appwriteClient);
    }

    async createMember(TEAM_ID, EMAIL, ROLES_ARRAY) {
        try {
        const response = await this.team.createMembership(
            TEAM_ID,
            EMAIL,
            ROLES_ARRAY
        );
        console.log(response);
        return response;
        } catch (error) {
        console.log("ERROR in getAllDocs():: ", error.response);
        toast.error(error.message);
        }
    }

    async getAllMembers(TEAM_ID) {
        try {
        const response = await this.team.listMemberships(TEAM_ID);
        console.log(response);
        return response;
        } catch (error) {
        // console.log("ERROR in getAllDocs():: ", error.response)
        // toast.error(error.message);
        }
    }

    async getMember(TEAM_ID, MEMBER_ID) {
        try {
        const response = await this.team.getMembership(TEAM_ID, MEMBER_ID);
        console.log(response);
        return response;
        } catch (error) {
        console.log("ERROR in getAllDocs():: ", error.response);
        toast.error(error.message);
        }
    }

    async upadateRoles(TEAM_ID, MEMBER_ID, UPDATED_ROLES_ARRAY) {
        try {
        const response = await this.team.updateMembershipRoles(
            TEAM_ID,
            MEMBER_ID,
            UPDATED_ROLES_ARRAY
        );
        console.log(response);
        return response;
        } catch (error) {
        console.log("ERROR in getAllDocs():: ", error.response);
        toast.error(error.message);
        }
    }
}

export default AppWriteTeams;
