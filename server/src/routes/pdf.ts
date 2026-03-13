import { Router, Request, Response } from 'express';
import { generatePdf } from '../services/pdfService';

const router = Router();

router.post('/blood-sugar', async (req: Request, res: Response) => {
  const { periodType, days, month, startDate, endDate, cookies } = req.body;

  // 파라미터 검증
  if (periodType === 'DAY' && !days) {
    res.status(400).json({ message: '일 단위 기간 파라미터가 필요합니다.' });
    return;
  }

  if (periodType === 'RANGE' && !startDate && !endDate) {
    res.status(400).json({ message: '기간 파라미터가 필요합니다.' });
    return;
  }

  try {
    // Next.js 앱의 PDF 전용 렌더링 페이지로 이동
    const params = new URLSearchParams({
      ...(periodType && { periodType }),
      ...(days && { days: String(days) }),
      ...(month && { month }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    });

    const url = `${process.env.FRONTEND_URL}/documenet/blood-sugar?${params}`;

    const pdfBuffer = await generatePdf({
      url,
      waitSelector: '.blood-sugar-analysis-document', // 렌더링 완료 확인용 선택자
      cookies,
    });

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="blood-sugar.pdf"',
      'Content-Length': pdfBuffer.length,
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error('PDF 생성 실패:', err);
    res.status(500).json({ message: 'PDF 생성에 실패했습니다.' });
  }
});

export default router;
