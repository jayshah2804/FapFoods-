let initial;
  let interval = setInterval(() => {
    initial = Math.round(new Date().getTime() / 1000);
    window.addEventListener("mousemove", () => {
      let current = Math.round(new Date().getTime() / 1000);
      console.log(current, initial);
      if (current - initial > 10) {
        alert("Your session has been expired");
        sessionStorage.setItem("login", false);
        history.push("/");
      }
      initial = Math.round(new Date().getTime() / 1000);
    });
    clearInterval(interval);
  }, 1000);
