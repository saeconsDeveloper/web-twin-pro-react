import { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";
interface PrivateRoutesProps {
  browseWithoutLogin: boolean;
}


const PrivateRoutes: FC<PrivateRoutesProps> = ({browseWithoutLogin}) => {
  let auth = localStorage.getItem("Token");
  console.log(browseWithoutLogin)
  if(browseWithoutLogin){
    return  <Outlet />
  }
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
