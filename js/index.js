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