import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import PageLoader from 'components/pageLoader';

export default function Layout() {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </>
  );
}
