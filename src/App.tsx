import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { SideBarRoutes } from "./components/Sidebar/Routes";
import MainContainer from "./layout/DashboardLayout";

const App: React.FC = () => {
  return (
    <Routes>
      {SideBarRoutes?.map((route) => (
        <Route
          key={route.name}
          path={route.path}
          element={
            <MainContainer>
              <Suspense fallback={<div>Loading page...</div>}>
                <route.load />
              </Suspense>
            </MainContainer>
          }
        />
      ))}
    </Routes>
  );
};

export default App;
