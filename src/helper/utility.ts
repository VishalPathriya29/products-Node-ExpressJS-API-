import moment from "moment";
import 'moment-timezone';
import 'dotenv/config';
import config from "../config/config";

export const utcDate = () => {
    const format = "YYYY-MM-DD HH:mm:ss";
    const date = new Date();
    date.setFullYear(date.getFullYear());

    const utc = moment(date).tz('utc').format(format);
    // const utc = moment(date).tz('Asia/Kolkata').format(format);
    return utc;
};

// ====================================================================================================
// ====================================================================================================

