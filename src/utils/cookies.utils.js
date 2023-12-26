export const setCookie = (name, value) => {
  const cookieValue = encodeURIComponent(value) + "; path=/";

  document.cookie = name + "=" + cookieValue;
};

export const deleteCookie = (name) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

export const getCookie = (name) => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // Check if this cookie starts with the desired name
    if (cookie.startsWith(name + "=")) {
      // Extract and return the cookie value
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  // Return null if the cookie with the specified name is not found
  return null;
};
