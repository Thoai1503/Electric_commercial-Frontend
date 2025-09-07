// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate, useLocation } from "react-router-dom";
// import type { RootState } from "../store/store";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   requiredRole?: number | number[];
//   redirectTo?: string;
// }

// interface AuthGuardProps {
//   children: React.ReactNode;
//   roles?: number[];
//   redirectTo?: string;
// }

// // Protected Route Component
// export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
//   children,
//   requiredRole,
//   redirectTo = "/login",
// }) => {
//   const { user, isAuthenticated } = useSelector(
//     (state: RootState) => state.authen
//   );
//   const location = useLocation();

//   // Check if user is authenticated
//   if (!isAuthenticated || !user) {
//     // Save the attempted URL for redirect after login
//     return <Navigate to={redirectTo} state={{ from: location }} replace />;
//   }

//   // Check role requirements if specified
//   if (requiredRole) {
//     const userRole = user.rule;
//     const allowedRoles = Array.isArray(requiredRole)
//       ? requiredRole
//       : [requiredRole];

//     if (userRole === null || !allowedRoles.includes(userRole)) {
//       return <Navigate to="/unauthorized" replace />;
//     }
//   }

//   return <>{children}</>;
// };

// // Admin Route Component
// export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   return (
//     <ProtectedRoute requiredRole={1} redirectTo="/login">
//       {children}
//     </ProtectedRoute>
//   );
// };

// // User Route Component (Admin or Regular User)
// export const UserRoute: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   return (
//     <ProtectedRoute requiredRole={[1, 2]} redirectTo="/login">
//       {children}
//     </ProtectedRoute>
//   );
// };

// // Auth Guard Hook
// export const useAuthGuard = () => {
//   const { user, isAuthenticated } = useSelector(
//     (state: RootState) => state.authen
//   );

//   const hasRole = (role: number | number[]): boolean => {
//     if (!user) return false;

//     const allowedRoles = Array.isArray(role) ? role : [role];
//     return user.rule !== null && allowedRoles.includes(user.rule);
//   };

//   const isAdmin = (): boolean => {
//     return hasRole(1);
//   };

//   const isUser = (): boolean => {
//     return hasRole([1, 2]);
//   };

//   return {
//     isAuthenticated,
//     user,
//     hasRole,
//     isAdmin,
//     isUser,
//   };
// };

// // Auth Guard Component
// export const AuthGuard: React.FC<AuthGuardProps> = ({
//   children,
//   roles,
//   redirectTo = "/login",
// }) => {
//   const { isAuthenticated, user } = useAuthGuard();
//   const location = useLocation();

//   if (!isAuthenticated || !user) {
//     return <Navigate to={redirectTo} state={{ from: location }} replace />;
//   }

//   if (roles && (user.rule === null || !roles.includes(user.rule))) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <>{children}</>;
// };

// // Optional Auth Component (for pages that work with or without auth)
// export const OptionalAuth: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   // This component doesn't redirect, just renders children
//   return <>{children}</>;
// };

// // Login Redirect Component (redirects authenticated users away from login page)
// export const LoginRedirect: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const { isAuthenticated, user } = useAuthGuard();
//   const location = useLocation();

//   if (isAuthenticated && user) {
//     // Redirect to the page they were trying to access, or dashboard
//     const from =
//       (location.state as any)?.from?.pathname ||
//       (user.rule === 1 ? "/admin/dashboard" : "/");
//     return <Navigate to={from} replace />;
//   }

//   return <>{children}</>;
// };

// // Unauthorized Page Component
// export const UnauthorizedPage: React.FC = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
//             Access Denied
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             You don't have permission to access this page.
//           </p>
//           <div className="mt-4">
//             <button
//               onClick={() => window.history.back()}
//               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
//             >
//               Go Back
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default useAuthGuard;

import React, { useEffect, type PropsWithChildren } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { refreshToken } from "../store/store";
import type { RootState, AppDispatch } from "../store/store";
import { refreshToken } from "../reducers/authenReducer";
import { Outlet } from "react-router-dom";

const AuthApp: React.FC = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch<AppDispatch>();
  const { accessToken, loading } = useSelector(
    (state: RootState) => state.authen
  );

  useEffect(() => {
    console.log("AuthApp - Checking access token:", accessToken);
    if (!accessToken) {
      console.log("AuthApp - No access token found, dispatching refreshToken");
    }
    dispatch(refreshToken());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  // If admin → render children or nested routes
  return <>{children ? children : <Outlet />}</>;
};

export default AuthApp;
