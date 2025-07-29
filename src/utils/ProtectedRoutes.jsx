import { Navigate, Outlet, useLocation } from "react-router";

const ProtectedRoutes = ({ children, loggedInUser }) => {
  // hook to capture the route path current user is or trying to go
  const location = useLocation();

  // (\/[^/]+): This captures a forward slash / followed by one or more characters that are not a forward slash. The parentheses () create a capture group.

  //  {2}: This quantifier matches exactly two occurrences of the preceding capture group.
  const regexPattern = /(\/[^/]+){2}/;
  const inputString = location?.pathname; // Input string to match against the regex

  const matchResult = inputString.match(regexPattern);

  if (matchResult) {
    let result = matchResult[0];
    // console.log(result); // "/web-twinprocms/file-library"
  } else {
    console.log("No matches found");
  }

  let allowedRoutes = [];

  // checking the user role and providing the access accordingly
  switch (loggedInUser?.role[0]) {
    case "Uberadmin":
      allowedRoutes = ["/web-twinprocms", "/web-twinprocms/"];
      break;

    case "Experience Designer":
      allowedRoutes = [
        "/web-twinprocms",
        "/web-twinprocms/",
        "/web-twinprocms/dashboard",
        "/web-twinprocms/dashboard/",
        "/web-twinprocms/file-library",
        "/web-twinprocms/file-library/",
        "/web-twinprocms/unity",
        "/web-twinprocms/unity/",
      ];
      break;

    case "Viewer":
      return <Navigate to="/unauthorized" replace />;

    case "Product Manager":
      allowedRoutes = [
        "/web-twinprocms",
        "/web-twinprocms/",
        "/web-twinprocms/file-library",
        "/web-twinprocms/file-library/",
        "/web-twinprocms/dashboard",
        "/web-twinprocms/dashboard/",
        "/web-twinprocms/product",
        "/web-twinprocms/product/",
      ];
      break;

    case "Developer":
      allowedRoutes = [
        "/web-twinprocms",
        "/web-twinprocms/",
        "/web-twinprocms/dashboard",
        "/web-twinprocms/dashboard/",
        "/web-twinprocms/unity",
        "/web-twinprocms/unity/",
      ];
      break;

    case "Superadmin":
      allowedRoutes = [
        "/web-twinprocms",
        "/web-twinprocms/",
        "/web-twinprocms/dashboard",
        "/web-twinprocms/dashboard/",
        "/web-twinprocms/users",
        "/web-twinprocms/users/",
        "/web-twinprocms/scene",
        "/web-twinprocms/scene/",
        "/web-twinprocms/product",
        "/web-twinprocms/product/",
        "/web-twinprocms/products",
        "/web-twinprocms/products/",
        "/web-twinprocms/unity",
        "/web-twinprocms/unity/",
        "/web-twinprocms/interaction",
        "/web-twinprocms/interaction/",
        "/web-twinprocms/categories",
        "/web-twinprocms/categories/",
        "/web-twinprocms/category",
        "/web-twinprocms/category/",
        "/web-twinprocms/file-library",
        "/web-twinprocms/file-library/",
      ];
      break;

    default:
      return <Navigate to="/unauthorized" replace />;
  }

  if (matchResult === null || typeof matchResult !== "undefined") {
    return children;
  }

  if (allowedRoutes.includes(matchResult[0])) {
    return children ? children : <Outlet />;
  } else {
    return <Navigate to="/unauthorized" replace />;
  }
};

export default ProtectedRoutes;


// import { Outlet } from "react-router";

// const ProtectedRoutes = ({ children }) => {
//   return children ? children : <Outlet />;
// };

// export default ProtectedRoutes;
