import mongoose from 'mongoose';
import 'dotenv/config';

const dbUrl:any = process.env.DB_URL;
const options: any = {
    useNewUrlParser: true,
};

mongoose.connect(dbUrl, options)
.then(() => console.log('MongoDB Database is connected successfully !'))
.catch(err => console.error('Error connecting to MongoDB:', err));


export default mongoose;