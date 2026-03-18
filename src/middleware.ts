export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/settings/:path*', '/subscription/:path*', '/api/user/:path*'],
};
