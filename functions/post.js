async function post(url) {
  const response = fetch("/getImages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
    }),
  });
}

export default post;
