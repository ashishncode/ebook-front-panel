import { post, get, del, put } from "./client";

const loginAuthor = (data) => {
  post();
};

const totalBookCount = () => {
  return get(`counttotalbooks`);
};

const getTotalAuthorCount = () => {
  return get(`countAuthors`);
};

const getTotalUserCount = () => {
  return get(`totalusercount`);
};

const getFriendRequest = (authorEmail) => {
  return get(`author/pending/requests/${authorEmail}`);
};

const getAcceptedBookForUser = (userEmail) => {
  return get(`author/acceptedbooksdetails/${userEmail}`);
};

const viewBook = (id) => {
  return get(`authorviewbook/${id}`);
};

const getProgressData = () => {
  return get(`totalcompletedbookspercentage`);
};

const deleteAuthorData = (authorEmail) => {
  return del(`delete/author/${authorEmail}`);
};

const deleteUserData = (userEmail) => {
  return del(`delete-user-account/${userEmail}`);
};

const getAuthorProfile = (token) => {
  return get(`get-author-profile/${token}`);
};

const getUserProfile = (userEmail) => {
  return get(`get-user-profile/${userEmail}`);
};

const logOutAuthor = (token) => {
  return post(`logout/author/${token}`);
};

const logOutUser = () => {
  return post(`logoutuser`);
};

const contactForm = (data) => {
  return post(`add/contact`, data);
};

const latestBooklistofUser = (userEmail) => {
  return get(`latest-books/byuser/${userEmail}`);
};

const countIncompleteBook = () => {
  return get(`count-incompletebooks`);
};

const countCompletedBook = () => {
  return get(`count-completedbooks`);
};

const getAuthorAllRequest = (authorEmail) => {
  return get(`author/all/requests/${authorEmail}`);
};

const getAcceptedBookDetail = (authorId) => {
  return get(`acceptedbooksdetails/${authorId}`);
};

const updateAuthorProfie = (modifiedData) => {
  return put(`update-author-profile`, modifiedData);
};

const updateUserProfile = (data) => {
  return put(`update-user-profile`, data);
};

const getEditAuthorData = (authorEmail) => {
  return get(`getauthorprofile-data/${authorEmail}`);
};
const getEditUserData = (userEmail) => {
  return get(`getUserProfile-data/${userEmail}`);
};

const forgotPasswordUser = (data) => {
  return post(`forgot-password`, data);
};

const resetPasswordUser = (token, body) => {
  return post(`reset-password/${token}`, body);
};

const forgotPasswordAuthor = (data) => {
  return post(`forgot-password-author`, data);
};

const ResetAuthorPassword = (token, body) => {
  return post(`reset-password-author/${token}`, body);
};
export {
  totalBookCount,
  getTotalAuthorCount,
  getTotalUserCount,
  getFriendRequest,
  getAcceptedBookForUser,
  viewBook,
  getProgressData,
  deleteAuthorData,
  deleteUserData,
  getAuthorProfile,
  getUserProfile,
  logOutAuthor,
  logOutUser,
  contactForm,
  latestBooklistofUser,
  countIncompleteBook,
  countCompletedBook,
  getAuthorAllRequest,
  getAcceptedBookDetail,
  updateAuthorProfie,
  updateUserProfile,
  getEditAuthorData,
  getEditUserData,
  resetPasswordUser,
  forgotPasswordUser,
  forgotPasswordAuthor,
  ResetAuthorPassword,
};
