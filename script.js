$(document).ready(function () {
  $("#addUser").on("click", function () {
    // Clear previous error messages
    $(".errorMessage").remove();

    const name = $("#nameInput").val();
    const email = $("#emailInput").val();
    const password = $("#passwordInput").val();

    let isValid = true;

    // Validation checks
    if (!name) {
      $("#nameInput").after(
        '<p class="errorMessage">Please enter a name.</p>'
      );
      isValid = false;
    }

    if (!email) {
      $("#emailInput").after(
        '<p class="errorMessage">Please enter an email.</p>'
      );
      isValid = false;
    } else if (!isValidEmail(email)) {
      $("#emailInput").after(
        '<p class="errorMessage">Please enter a valid email.</p>'
      );
      isValid = false;
    }

    if (!password) {
      $("#passwordInput").after(
        '<p class="errorMessage">Please enter a password.</p>'
      );
      isValid = false;
    }

    if (isValid) {
      const userItem = `
            <li class='userItem'>
              <div>Name: ${name}</div>
              <div>Email: ${email}</div>
              <div>Password: ${password}</div>
              <div class="buttons">
                <button class="editUser">Edit</button>
                <button class="deleteUser">Delete</button>
              </div>
            </li>`;

      $("#userList").append(userItem);
      $("#nameInput").val("");
      $("#emailInput").val("");
      $("#passwordInput").val("");
    }
  });

  $(document).on("click", ".editUser", function () {
    const userItem = $(this).closest("li");
    const name = userItem
      .find("div:nth-child(1)")
      .text()
      .replace("Name:", "")
      .trim();
    const email = userItem
      .find("div:nth-child(2)")
      .text()
      .replace("Email:", "")
      .trim();
    const password = userItem
      .find("div:nth-child(3)")
      .text()
      .replace("Password:", "")
      .trim();

    $("#nameInput").val(name);
    $("#emailInput").val(email);
    $("#passwordInput").val(password);

    userItem.remove();
  });

  $(document).on("click", ".deleteUser", function () {
    $(this).closest("li").remove();
  });
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
