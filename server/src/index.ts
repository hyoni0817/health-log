import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pdfRouter from './routes/pdf';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.FRONTEND_URL })); // Next.js 개발 서버
app.use(express.json());
app.use('/pdf', pdfRouter);

app.listen(PORT, () => {
  console.log(`PDF server running on port ${PORT}`);
});
