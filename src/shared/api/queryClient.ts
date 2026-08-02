import { environmentManager, QueryClient } from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR 환경에서는 staleTime이 0이면 하이드레이션 직후 곧바로 refetch가 일어나므로
        // 서버에서 미리 받아온 데이터가 낭비되지 않도록 0보다 큰 값을 설정한다
        staleTime: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (environmentManager.isServer()) {
    // 서버: 하나의 인스턴스를 여러 요청이 공유하면 다른 사용자의 캐시가 노출될 수 있으므로
    // 요청마다 새로 생성한다
    return makeQueryClient();
  } else {
    // 브라우저: 초기 렌더 중 React가 서스펜드하면 이 함수가 다시 실행되는데,
    // 그때마다 새로 만들면 캐시가 통째로 사라지므로 한 번 만든 인스턴스를 재사용한다
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
