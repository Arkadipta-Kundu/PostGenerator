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
            <input type="text" class="github w-full p-2 border border-gray-300 rounded" placeholder="GitHub repo - Link">

            <h6 class="font-semibold text-lg mt-4">📝 My Article (if any)</h6>
            <div class="articleContainer">
                <div class="flex gap-4 my-2">
                    <label><input type="radio" class="article-type" name="article-type-new" value="Hashnode"> Hashnode</label>
                    <label><input type="radio" class="article-type" name="article-type-new" value="Dev.to"> Dev.to</label>
                    <label><input type="radio" class="article-type" name="article-type-new" value="LinkedIn"> LinkedIn</label>
                </div>
                <input type="text" class="article-link w-full p-2 border border-gray-300 rounded" placeholder="Article Link">
            </div>

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

        // Remove topic functionality
        newTopic.querySelector(".remove-topic").addEventListener("click", (e) => {
            e.preventDefault();
            newTopic.remove();
            saveFormData();
        });

        saveFormData();
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
            const githubLink = topic.querySelector(".github").value || "None";
            const articleLink = topic.querySelector(".article-link").value;
            const articleType = topic.querySelector(".article-type:checked")?.value || "";

            // Collecting resources
            let resources = [];
            topic.querySelectorAll(".resourceContainer .resource-type").forEach((resType, i) => {
                const resLink = topic.querySelectorAll(".resource-link")[i].value;
                if (resLink.trim() !== "") {
                    resources.push(`${resType.value}: ${resLink}`);
                }
            });

            postContent += `<p>In the ${learnedDate}, I was lerning about ${learned}. `;
            postContent += `the resources I used for this topic is : ${resources.length ? resources.join(", ") : "None"}. `;
            postContent += `all the codes related to this topic that i wrote , here is the github link: ${githubLink}. `;

            if (articleType && articleLink) {
                postContent += `I also wrote detailed article about this on ${articleType}: ${articleLink}. </p>`;
            } else {
                postContent += `</p>`;
            }
        });

        // Next Learning Goal
        const nextTopic = document.getElementById("nextTopic").value.trim();
        if (nextTopic) {
            postContent += `<p>Next, I am going to learn ${nextTopic}. </p>`;
        }

        // Post Type
        const postType = document.querySelector('input[name="post-type"]:checked')?.value;
        if (postType) {
            const postEndings = {
                "LinkedIn": "Please turn this into an engaging LinkedIn post that highlights my learning journey in a structured, readable format. It should be:Concise yet informative , Professional but friendly,Optimized for engagement(use emojis, short paragraphs) Make sure the post flows naturally, engaging the audience while showcasing my progress",
                "Hashnode": "Write a Hashnode article.(should be from a student's/learner's pov not a master) and follow my general writing style to match with other articles",
                "Dev.to": "Write a Dev.to article.(should be from a student's/learner's pov not a master) and follow my general writing style to match with other articles",
                "Twitter": "Write a Twitter post, but keep it within 280 characters. this is just a daily update to the community what i am doing "
            };

            if (postEndings[postType]) {
                postContent += `<p>${postEndings[postType]}</p>`;
            }
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

