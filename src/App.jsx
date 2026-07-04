import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { LoanProvider } from "./pages/LoanContext";
import { LoanFormScreen } from "./components/dashboard/LoanFormScreen";
import LoanDetail from "./pages/LoanDetail";
import Disbursement from "./pages/Disbursement";
import { OnboardingProvider } from "./pages/task2/OnboardingContext";
import Onboarding from "./pages/task2/Onboarding";
import Review from "./pages/task2/Review";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Application Routes sharing LoanProvider */}
        <Route
          path="/"
          element={
            <LoanProvider>
              <Outlet />
            </LoanProvider>
          }
        >
          <Route index element={<LoanFormScreen />} />
          <Route path="loan-detail" element={<LoanDetail />} />
          <Route path="disbursement" element={<Disbursement />} />
        </Route>

        {/* Task 2: Onboarding Flow Routes sharing OnboardingProvider */}
        <Route
          path="/task2"
          element={
            <OnboardingProvider>
              <Outlet />
            </OnboardingProvider>
          }
        >
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="review" element={<Review />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
