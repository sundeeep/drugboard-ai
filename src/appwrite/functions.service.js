import { toast } from "react-toastify";
import { appwriteClient } from ".";
import { Functions } from "appwrite";

class AppWriteFunction {
    functions;
    constructor() {
        this.functions = new Functions(appwriteClient);
    }

    async ExecuteFunction(FUNCTION_ID, PAYLOAD) {
        try {
            // console.log(FUNCTION_ID, PAYLOAD)
            let executionResponse = await this.functions.createExecution(FUNCTION_ID, PAYLOAD);
            let jsonResponse = JSON.parse(executionResponse.response);
            console.log(jsonResponse);
            if (jsonResponse?.error === true) return toast.error(jsonResponse.message);
            if (jsonResponse?.success === true) {
                toast.success(jsonResponse.message);
                return jsonResponse;
            }
        } catch (error) {
        console.log(error);
        // console.log("ERROR:: FUNCTIONS :: ExecuteFunc:: ", error.message);
        console.log("ERROR:: FUNCTIONS :: ExecuteFunc:: ", error.response);
        }
    }
}

export default AppWriteFunction;
