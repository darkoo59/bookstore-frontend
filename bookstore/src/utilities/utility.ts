export const getToken = () => {
  return document.cookie
    .match("(^|;)\\s*accessToken\\s*=\\s*([^;]+)")
    ?.pop() || "";
}