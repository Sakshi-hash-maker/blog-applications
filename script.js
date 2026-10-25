const exploreButton = document.getElementById("readButton");

exploreButton.addEventListener("click", function () {
    document.getElementById("blogs").scrollIntoView({
        behavior: "smooth"
    });
});

const readMoreButtons = document.querySelectorAll(".read-more");

readMoreButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const blogCard = button.closest(".blog-card");
        const paragraph = blogCard.querySelector("p");

        if (button.textContent === "Read More") {
            paragraph.textContent +=
                " This blog shares ideas, experiences, and useful lessons for readers.";
            button.textContent = "Show Less";
        } else {
            button.textContent = "Read More";
            location.reload();
        }
    });
});
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        document.getElementById("loginMessage").textContent =
            "Login form tested successfully! Connect a backend for real login.";
    });
}
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        document.getElementById("registerMessage").textContent =
            "Registration form tested successfully! Backend required to create an account.";
    });
}
const createBlogForm = document.getElementById("createBlogForm");

if (createBlogForm) {
    const titleInput = document.getElementById("blogTitle");
    const contentInput = document.getElementById("blogContent");
    const blogList = document.getElementById("blogList");
    const blogMessage = document.getElementById("blogMessage");

    let savedBlogs = [];

    try {
        savedBlogs = JSON.parse(
            localStorage.getItem("myBlogPosts") || "[]"
        );

        if (!Array.isArray(savedBlogs)) {
            savedBlogs = [];
        }
    } catch {
        savedBlogs = [];
    }

    function renderBlogs() {
        blogList.replaceChildren();

        if (savedBlogs.length === 0) {
            const message = document.createElement("p");
            message.textContent = "You have not published any blogs yet.";
            blogList.appendChild(message);
            return;
        }

        savedBlogs.forEach(function (blog, index) {
            const card = document.createElement("article");
            card.className = "published-blog";

            const title = document.createElement("h3");
            title.textContent = blog.title;

            const content = document.createElement("p");
            content.textContent = blog.content;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-blog";

            deleteButton.addEventListener("click", function () {
                savedBlogs.splice(index, 1);

                try {
                    localStorage.setItem(
                        "myBlogPosts",
                        JSON.stringify(savedBlogs)
                    );
                    blogMessage.textContent = "Blog deleted.";
                    renderBlogs();
                } catch {
                    blogMessage.textContent =
                        "Unable to save changes in this browser.";
                }
            });

            card.append(title, content, deleteButton);
            blogList.appendChild(card);
        });
    }

    createBlogForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const title = titleInput.value.trim();
        const content = contentInput.value.trim();

        if (!title || !content) {
            blogMessage.textContent =
                "Please enter both a title and blog content.";
            return;
        }

        savedBlogs.unshift({ title: title, content: content });

        try {
            localStorage.setItem(
                "myBlogPosts",
                JSON.stringify(savedBlogs)
            );

            createBlogForm.reset();
            blogMessage.textContent = "Your blog was published successfully!";
            renderBlogs();
        } catch {
            savedBlogs.shift();
            blogMessage.textContent =
                "Unable to save your blog. Check browser storage.";
        }
    });

    renderBlogs();
}