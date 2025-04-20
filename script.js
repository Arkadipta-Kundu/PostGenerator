document.addEventListener("DOMContentLoaded", () => {
    const postForm = document.getElementById("postForm");
    const resourceContainer = document.querySelector(".resourceContainer");
    const addResourceBtn = document.querySelector(".add-resource-btn");
    const addTopicBtn = document.querySelector(".add-topic-btn");
    const generateBtn = document.querySelector(".generate-btn");
    const outputDiv = document.getElementById("output");
    const editBtn = document.querySelector(".edit-btn");
    const copyBtn = document.querySelector(".copy-btn");

    // Function to save form data to localStorage
    const saveFormData = () => {
        const formData = new FormData(postForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        localStorage.setItem("postFormData", JSON.stringify(data));
    };

    // Function to load form data from localStorage
    const loadFormData = () => {
        const savedData = localStorage.getItem("postFormData");
        if (savedData) {
            const data = JSON.parse(savedData);
            for (const key in data) {
                const element = postForm.querySelector(`[name="${key}"]`);
                if (element) {
                    element.value = data[key];
                }
            }
        }
    };

    // Load form data on page load
    loadFormData();

    // Save form data on input change
    postForm.addEventListener("input", saveFormData);

    // Function to add a new resource input
    addResourceBtn.addEventListener("click", (event) => {
        event.preventDefault();

        const newResource = document.createElement("div");
        newResource.classList.add("flex", "gap-2", "mt-2");
        newResource.innerHTML = `
            <select class="resource-type p-2 border border-gray-300 rounded">
                <option value="YouTube">YouTube</option>
                <option value="Article">Article</option>
                <option value="Official Documentation">Official Documentation</option>
                <option value="Udemy Course">Udemy Course</option>
            </select>
            <input type="text" class="resource-link p-2 border border-gray-300 rounded w-full" placeholder="Resource Link">
            <button class="remove-resource text-red-500">❌</button>
        `;
        resourceContainer.appendChild(newResource);

        // Remove resource button functionality
        newResource.querySelector(".remove-resource").addEventListener("click", (e) => {
            e.preventDefault();
            newResource.remove();
            saveFormData();
        });

        saveFormData();
    });

    // Function to add a new topic section
    addTopicBtn.addEventListener("click", (event) => {
        event.preventDefault();

        const newTopic = document.createElement("div");
        newTopic.classList.add("topic", "p-4", "border", "border-gray-300", "rounded-lg", "mb-4");
        newTopic.innerHTML = `
            <h6 class="font-semibold text-lg mb-2">📌 What I Learned</h6>
            <input type="text" class="learned w-full p-2 border border-gray-300 rounded" placeholder="Topic Name" required>

            <h6 class="font-semibold text-lg mt-4">📅 When did you learn this?</h6>
            <input type="text" class="learned-date w-full p-2 border border-gray-300 rounded" placeholder="e.g., Last week, past month, etc." required>

            <h6 class="font-semibold text-lg mt-4">📚 Resources</h6>
            <div class="resourceContainer"></div>
            <button class="add-resource-btn bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600">Add Resource</button>

            <h6 class="font-semibold text-lg mt-4">💻 Code I Wrote</h6>
            <div class="githubContainer"></div>
            <button class="add-github-btn bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600">Add GitHub Repo</button>

            <h6 class="font-semibold text-lg mt-4">📝 My Articles (if any)</h6>
            <div class="articlesContainer"></div>
            <button class="add-article-btn bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600">Add Article</button>

            <button class="remove-topic bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600">Remove Topic</button>
        `;

        postForm.insertBefore(newTopic, addTopicBtn);

        // Add event listener to the new "Add Resource" button inside this topic
        newTopic.querySelector(".add-resource-btn").addEventListener("click", (e) => {
            e.preventDefault();
            const newResource = document.createElement("div");
            newResource.classList.add("flex", "gap-2", "mt-2");
            newResource.innerHTML = `
                <select class="resource-type p-2 border border-gray-300 rounded">
                    <option value="YouTube">YouTube</option>
                    <option value="Article">Article</option>
                    <option value="Official Documentation">Official Documentation</option>
                    <option value="Udemy Course">Udemy Course</option>
                </select>
                <input type="text" class="resource-link p-2 border border-gray-300 rounded w-full" placeholder="Resource Link">
                <button class="remove-resource text-red-500">❌</button>
            `;
            newTopic.querySelector(".resourceContainer").appendChild(newResource);

            // Remove resource button functionality
            newResource.querySelector(".remove-resource").addEventListener("click", (ev) => {
                ev.preventDefault();
                newResource.remove();
                saveFormData();
            });

            saveFormData();
        });

        // Add event listener to the new "Add GitHub Repo" button inside this topic
        newTopic.querySelector(".add-github-btn").addEventListener("click", (e) => {
            e.preventDefault();
            const githubContainer = newTopic.querySelector(".githubContainer");
            const newRepo = document.createElement("div");
            newRepo.classList.add("github-repo", "p-4", "border", "border-gray-300", "rounded", "mb-4");
            newRepo.innerHTML = `
                <input type="text" class="github-link w-full p-2 border border-gray-300 rounded mb-2" 
                    placeholder="GitHub repo - Link">
                <textarea class="github-description w-full p-2 border border-gray-300 rounded" 
                    placeholder="Optional: Add details about the code"></textarea>
                <button class="remove-github-btn text-red-500 mt-2">❌ Remove Repo</button>
            `;

            githubContainer.appendChild(newRepo);

            // Add functionality to remove the GitHub repository
            newRepo.querySelector(".remove-github-btn").addEventListener("click", (ev) => {
                ev.preventDefault();
                newRepo.remove();
                saveFormData();
            });

            saveFormData();
        });

        // Add event listener to the new "Add Article" button inside this topic
        newTopic.querySelector(".add-article-btn").addEventListener("click", (e) => {
            e.preventDefault();
            const articlesContainer = newTopic.querySelector(".articlesContainer");
            const newArticle = document.createElement("div");
            newArticle.classList.add("article", "p-4", "border", "border-gray-300", "rounded", "mb-4");
            newArticle.innerHTML = `
                <div class="flex gap-4 my-2">
                    <label><input type="radio" class="article-type" name="article-type-${Date.now()}" value="Hashnode"> Hashnode</label>
                    <label><input type="radio" class="article-type" name="article-type-${Date.now()}" value="Dev.to"> Dev.to</label>
                    <label><input type="radio" class="article-type" name="article-type-${Date.now()}" value="LinkedIn"> LinkedIn</label>
                </div>
                <input type="text" class="article-link w-full p-2 border border-gray-300 rounded" placeholder="Article Link">
                <button class="remove-article-btn text-red-500 mt-2">❌ Remove Article</button>
            `;

            articlesContainer.appendChild(newArticle);

            // Add functionality to remove the article
            newArticle.querySelector(".remove-article-btn").addEventListener("click", (ev) => {
                ev.preventDefault();
                newArticle.remove();
                saveFormData();
            });

            saveFormData();
        });

        // Remove topic functionality
        newTopic.querySelector(".remove-topic").addEventListener("click", (e) => {
            e.preventDefault();
            newTopic.remove();
            saveFormData();
        });

        saveFormData();
    });

    // Delegate event listener for "Add Article" button
    document.getElementById("postForm").addEventListener("click", (event) => {
        if (event.target.classList.contains("add-article-btn")) {
            event.preventDefault();

            // Find the closest articlesContainer for the clicked button
            const articlesContainer = event.target.closest(".topic").querySelector(".articlesContainer");

            const newArticle = document.createElement("div");
            newArticle.classList.add("article", "p-4", "border", "border-gray-300", "rounded", "mb-4");
            newArticle.innerHTML = `
                <div class="flex gap-4 my-2">
                    <label><input type="radio" class="article-type" name="article-type-${Date.now()}" value="Hashnode"> Hashnode</label>
                    <label><input type="radio" class="article-type" name="article-type-${Date.now()}" value="Dev.to"> Dev.to</label>
                    <label><input type="radio" class="article-type" name="article-type-${Date.now()}" value="LinkedIn"> LinkedIn</label>
                </div>
                <input type="text" class="article-link w-full p-2 border border-gray-300 rounded" placeholder="Article Link">
                <button class="remove-article-btn text-red-500 mt-2">❌ Remove Article</button>
            `;

            articlesContainer.appendChild(newArticle);

            // Add functionality to remove the article
            newArticle.querySelector(".remove-article-btn").addEventListener("click", (e) => {
                e.preventDefault();
                newArticle.remove();
            });
        }
    });

    // Function to add a new GitHub repository input
    document.querySelector(".add-github-btn").addEventListener("click", (event) => {
        event.preventDefault();

        const githubContainer = document.querySelector(".githubContainer");
        const newRepo = document.createElement("div");
        newRepo.classList.add("github-repo", "p-4", "border", "border-gray-300", "rounded", "mb-4");
        newRepo.innerHTML = `
            <input type="text" class="github-link w-full p-2 border border-gray-300 rounded mb-2" 
                placeholder="GitHub repo - Link">
            <textarea class="github-description w-full p-2 border border-gray-300 rounded" 
                placeholder="Optional: Add details about the code"></textarea>
            <button class="remove-github-btn text-red-500 mt-2">❌ Remove Repo</button>
        `;

        githubContainer.appendChild(newRepo);

        // Add functionality to remove the GitHub repository
        newRepo.querySelector(".remove-github-btn").addEventListener("click", (e) => {
            e.preventDefault();
            newRepo.remove();
        });
    });

    // Function to save generated post to localStorage
    const savePostToHistory = (postContent) => {
        let postHistory = JSON.parse(localStorage.getItem("postHistory")) || [];
        postHistory.push(postContent);
        localStorage.setItem("postHistory", JSON.stringify(postHistory));
    };

    // Generate Post
    generateBtn.addEventListener("click", (event) => {
        event.preventDefault();

        let postContent = "";

        document.querySelectorAll(".topic").forEach((topic) => {
            const learned = topic.querySelector(".learned").value;
            const learnedDate = topic.querySelector(".learned-date").value;

            // Collecting GitHub repositories
            let githubRepos = [];
            topic.querySelectorAll(".githubContainer .github-repo").forEach((repo) => {
                const repoLink = repo.querySelector(".github-link").value.trim();
                const repoDescription = repo.querySelector(".github-description").value.trim();
                if (repoLink) {
                    githubRepos.push(`${repoLink}${repoDescription ? ` - ${repoDescription}` : ""}`);
                }
            });

            postContent += `<p>In the ${learnedDate}, I was learning about ${learned}. `;

            if (githubRepos.length) {
                postContent += `Here are the GitHub repositories I worked on: ${githubRepos.join(", ")}. `;
            }

            postContent += `</p>`;
        });

        // Next Learning Goal
        const nextTopic = document.getElementById("nextTopic").value.trim();
        if (nextTopic) {
            postContent += `<p>Next, I am going to learn ${nextTopic}. </p>`;
        }

        outputDiv.innerHTML = postContent.trim();

        // Save the generated post to history
        savePostToHistory(postContent.trim());
    });

    // Make output editable
    editBtn.addEventListener("click", (event) => {
        event.preventDefault();
        outputDiv.contentEditable = outputDiv.contentEditable === "true" ? "false" : "true";
        editBtn.textContent = outputDiv.contentEditable === "true" ? "Disable Editing" : "Make Editable";
    });

    // Copy to Clipboard
    copyBtn.addEventListener("click", (event) => {
        event.preventDefault();
        navigator.clipboard.writeText(outputDiv.textContent).then(() => {
            alert("Copied to Clipboard!");
        }).catch(err => console.error("Failed to copy:", err));
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("darkModeToggle");
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});

