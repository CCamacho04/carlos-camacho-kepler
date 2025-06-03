//Get current data and year
const today = new Date();
const thisYear = today.getFullYear();

//Create a footer
const footer = document.createElement("footer");
document.body.appendChild(footer);

//Create copyright notice
const copyright = document.createElement("p");
copyright.innerHTML = `&copy; Carlos Camacho ${thisYear}`;
footer.appendChild(copyright);

//Array of skills to display in Skills section
const skills = ["Python", "C++", "Java", "JavaScript", "Google Workspace", "Microsoft Suite"];

//Create a list in the skills section
skillsSection = document.getElementById("Skills");
const skillsList = document.createElement("ul");
skillsSection.appendChild(skillsList);

//Loop through the array of skills and add each skill as a list item
for (let i = 0; i < skills.length; i++)
{
    const skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}

const messageForm = document.forms["leave_message"];
const messageSection = document.getElementById("messages");
const messageList = messageSection.querySelector("ul");

//Hide messages
messageSection.style.display = "none";

messageForm.addEventListener("submit", function(event)
{
    event.preventDefault();

    //Get user inputs
    const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;

    console.log(usersName, usersEmail, usersMessage);

    //Create new message list item
    const newMessage = document.createElement("li");

    //Create a link with user's email
    const nameLink = document.createElement("a");
    nameLink.href = `mailto:${usersEmail}`;
    nameLink.innerText = usersName;

    const messageSpan = document.createElement("span");
    messageSpan.innerText = ` wrote: ${usersMessage}`;

    newMessage.appendChild(nameLink);
    newMessage.appendChild(messageSpan);

    //Create a Remove button
    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.type = "button";

    //Remove message when the Remove button is clicked
    removeButton.addEventListener("click", function()
    {
        const entry = removeButton.parentNode;
        entry.remove();

        if (messageList.children.length === 0)
        {
            messageSection.style.display = "none";
        }
    });

    //Create Edit button
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.type = "button";

    //Allow user to edit message when the Edit button is clicked
    editButton.addEventListener("click", function()
    {
        const newText = prompt("Edit your message:", messageSpan.innerText.replace( "wrote: ", ""));

        if (newText !== null)
        {
            messageSpan.innerText = ` wrote: ${newText}`;
        }
    });

    newMessage.appendChild(editButton);
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    messageSection.style.display = "block";

    messageForm.reset();
});

//Fetch public repositories fomr GitHub API
fetch("https://api.github.com/users/CCamacho04/repos")
    .then(response => {
        if (!response.ok)
        {
            throw new Error(`GitHub API Error! Status: ${response.status}`);
        }

        return response.json();
    })
    .then(repositories => {
        console.log("GitHub Repositories:", repositories);

        const projectSection = document.getElementById("Projects");
        const projectList = projectSection.querySelector("ul");

        //Loop through each repository and add it to the project list
        for (let i = 0; i < repositories.length; i++)
        {
            const project = document.createElement("li");
            const link = document.createElement("a");
            link.href = repositories[i].html_url;
            link.innerText = repositories[i].name;
            link.target = "_blank";
            
            project.appendChild(link);
            projectList.appendChild(project);
        }
    })
    .catch(error => {
        //Error message if fetch fails
        console.error("Error fetching repositories:", error);
        const projectSection = document.getElementById("Projects");
        const projectList = projectSection.querySelector("ul");
        const errorMessage = document.createElement("li");
        errorMessage.innerText = "Could not fetch GitHub repositories.";
        projectList.appendChild(errorMessage);
    })
