import puppeteer from 'puppeteer';

interface PdfOptions {
  url: string; // 렌더링할 페이지 URL
  waitSelector?: string; // 렌더링 완료를 확인할 CSS 선택자
  cookies?: { name: string; value: string }[];
}

export const generatePdf = async (options: PdfOptions): Promise<Buffer> => {
  const { url, waitSelector, cookies } = options;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 794, height: 1123 }); // A4 px 기준

    // 인증 쿠키 전달 (로그인이 필요한 페이지인 경우)
    if (cookies?.length) {
      const pageUrl = new URL(url);
      await page.setCookie(...cookies.map((c) => ({ ...c, domain: pageUrl.hostname })));
    }

    await page.goto(url, { waitUntil: 'networkidle0' }); // 모든 네트워크 요청 완료까지 대기

    // 특정 요소가 렌더링될 때까지 대기 (데이터 로딩 완료 확인)
    if (waitSelector) {
      await page.waitForSelector(waitSelector, { timeout: 30_000 });
    }

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true, // 배경색/이미지 포함
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
    });

    return Buffer.from(pdf);
  } finally {
    await browser.close(); // 에러가 나도 반드시 브라우저 종료
  }
};
