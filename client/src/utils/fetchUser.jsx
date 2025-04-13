import Axios from "./Axios"
import { SummaryApi } from "../common/summaryApi"

export const fetchUserDetails = async () => {
    try {
        const response = await Axios({
            ...SummaryApi.user_details
        });

        return response.data;
    }
    catch(err) {
        console.log(err);
    }
}