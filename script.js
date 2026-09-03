const contactForm = document.getElementById("contactForm");

if (contactForm) {

  contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const formStatus = document.getElementById("formStatus");
    const submitButton = contactForm.querySelector("button[type='submit']");

    // Replace this with YOUR private Apps Script /exec URL
    const scriptURL = "https://script.google.com/macros/s/AKfycbzV28yAGR35k0hj0xDt5B1o4rS8zT0tUBzXGB92zbRA7hvTSZr2ZOVdhol7cWppaU7nSA/exec";

    const formData = new FormData(contactForm);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message")
    };

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formStatus.textContent = "";

    try {

      const response = await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        }
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Submission failed.");
      }

      formStatus.textContent =
        "Thank you! Your message has been sent.";

      formStatus.className = "form-status success";

      contactForm.reset();

    } catch (error) {

      console.error("Form submission error:", error);

      formStatus.textContent =
        "Something went wrong. Please try again.";

      formStatus.className = "form-status error";

    } finally {

      submitButton.disabled = false;
      submitButton.textContent = "Send Message";

    }

  });

}
