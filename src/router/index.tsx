import Layout from "@/layouts";
import Main from "@/pages/Main";
import { Routes, Route } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/*" element={<Main />} />
      </Route>
    </Routes>
  );
};

export default Router;
