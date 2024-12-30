import { Routes, Route } from 'react-router-dom';
import { MembershipForm } from './pages/MembershipForm';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<MembershipForm />} />
    </Routes>
  );
}