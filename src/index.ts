import express from 'express';
import router from "./routes/router";

const app = express();
const port = process.env.PORT || 3000;

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
