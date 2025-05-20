const today = new Date();
const thisYear = today.getFullYear();

const footer = document.createElement("footer");
document.body.appendChild(footer);

const copyright = document.createElement("p");
copyright.innerHTML = `&copy; Carlos Camacho ${thisYear}`;
footer.appendChild(copyright);

const skills = ["Python", "C++", "Java", "JavaScript", "Google Workspace", "Microsoft Suite"];

skillsSection = document.getElementById("Skills");
const skillsList = document.createElement("ul");
skillsSection.appendChild(skillsList);

for (let i = 0; i < skills.length; i++)
{
    const skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}

const messageForm = document.forms["leave_message"];
const messageSection = document.getElementById("messages");
const messageList = messageSection.querySelector("ul");

messageSection.style.display = "none";

messageForm.addEventListener("submit", function(event)
{
    event.preventDefault();

    const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;

    console.log(usersName, usersEmail, usersMessage);

    const newMessage = document.createElement("li");

    const nameLink = document.createElement("a");
    nameLink.href = `mailto:${usersEmail}`;
    nameLink.innerText = usersName;

    const messageSpan = document.createElement("span");
    messageSpan.innerText = ` wrote: ${usersMessage}`;

    newMessage.appendChild(nameLink);
    newMessage.appendChild(messageSpan);

    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.type = "button";

    removeButton.addEventListener("click", function()
    {
        const entry = removeButton.parentNode;
        entry.remove();

        if (messageList.children.length === 0)
        {
            messageSection.style.display = "none";
        }
    });

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.type = "button";

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