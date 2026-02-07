import { useSelector } from 'react-redux';

import { selectUserInfo } from 'features/auth/authSlice';

/**
 * Roles that have admin access to quiz management (create, edit, delete)
 * for categories, subcategories, quizzes, and questions.
 */
export const QUIZ_ADMIN_ROLES = [
  'Super Admin',
  'General Manager',
  'Department Head',
  'Branch Head',
];

/**
 * Additional emails that have admin access regardless of role
 */
const QUIZ_ADMIN_EMAILS = ['sona.madoyan@fnet.am'];

/**
 * Hook to determine if the current user has quiz admin privileges
 * @returns {{ isQuizAdmin: boolean, userType: string | null, userEmail: string | undefined }}
 */
export const useQuizAdmin = () => {
  const userInfo = useSelector(selectUserInfo);
  const userType = localStorage.getItem('userType');
  const userEmail = userInfo?.email;

  const isQuizAdmin =
    QUIZ_ADMIN_ROLES.includes(userType) || QUIZ_ADMIN_EMAILS.includes(userEmail);

  return {
    isQuizAdmin,
    userType,
    userEmail,
  };
};

/**
 * Utility function to check quiz admin status without hook (for use outside React components)
 * @param {string | null} userType - User type from localStorage
 * @param {string | undefined} userEmail - User email
 * @returns {boolean}
 */
export const checkQuizAdminAccess = (userType, userEmail) => {
  return QUIZ_ADMIN_ROLES.includes(userType) || QUIZ_ADMIN_EMAILS.includes(userEmail);
};

export default useQuizAdmin;
