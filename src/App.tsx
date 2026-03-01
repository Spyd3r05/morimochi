/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Habits from "./pages/Habits";
import Planner from "./pages/Planner";
import Wellness from "./pages/Wellness";
import Rewards from "./pages/Rewards";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="habits" element={<Habits />} />
          <Route path="planner" element={<Planner />} />
          <Route path="wellness" element={<Wellness />} />
          <Route path="rewards" element={<Rewards />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
