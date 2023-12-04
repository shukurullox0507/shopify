// pages/protectedPage.tsx
import withAuth from '@/app/utils/withAuth';
import Home from '@/app/page'; // Replace with your actual protected component

const ProtectedPage = withAuth(Home);

export default ProtectedPage;
