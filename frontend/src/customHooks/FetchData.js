//custom fetch hook that fetch data from url using fetch method and if response is ok it returns the data
// and if response is not ok it redirect user to error page with error message

export const FetchData = async (url, method) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: { "content-type": "application/json" },
    });
    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    }
    const message = `${response.status} : Failed to Fetch item`;
    window.location.href = `/custom_error/${message}`;
  } catch (error) {
    const message = `500 : ${error.message}`;
    window.location.href = `/custom_error/${message}`;
  }
};
