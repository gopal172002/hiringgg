import { authkitMiddleware } from '@workos-inc/authkit-nextjs';

export default authkitMiddleware();


export const config = {
  matcher: [
    '/',  
    '/test',
    '/contact',
    '/about',
    '/upload',
    '/resume',
    '/upload-photos',
    '/new-listing',  
    '/new-listing/:orgId*',  
    '/new-company',  
    '/jobs/:orgId*',  
    '/jobs/edit/:jobId*',  
    '/show/:jobId*',  
    '/your-other-paths',  
  ],
};
