
import { SummaryApi } from "../common/summaryApi";
import Axios from "./Axios";

const uploadImage = async (image) => {
    try {
        const formdata = new FormData();
        formdata.append('image', image);
        
        const response = await Axios({
            ...SummaryApi.uploadImage,
            data: formdata
        })
        return response;
    }
    catch(err) {
        return err;
    }
}

export default uploadImage;