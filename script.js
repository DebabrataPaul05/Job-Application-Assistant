const analyzeBtn = document.getElementById("analyzeBtn");
const resultSection = document.getElementById("resultSection");
const matchScoreEl = document.getElementById("matchScore");
const matchedSkillsEl = document.getElementById("matchedSkills");
const missingSkillsEl = document.getElementById("missingSkills");
const suggestionsEl = document.getElementById("suggestions");

const skillSet = [
  "javascript", "python", "html", "css", "react",
  "node", "sql", "api", "git", "communication",
  "problem solving", "teamwork", "data analysis"
];

analyzeBtn.addEventListener("click", () => {
  const jobText = document.getElementById("jobDescription").value.toLowerCase();
  const resumeText = document.getElementById("resumeContent").value.toLowerCase();

  if (!jobText || !resumeText) {
    alert("Please provide both job description and application content.");
    return;
  }

  const jobSkills = skillSet.filter(skill => jobText.includes(skill));
  const resumeSkills = skillSet.filter(skill => resumeText.includes(skill));

  const matched = jobSkills.filter(skill => resumeSkills.includes(skill));
  const missing = jobSkills.filter(skill => !resumeSkills.includes(skill));

  const score = jobSkills.length === 0
    ? 0
    : Math.round((matched.length / jobSkills.length) * 100);

  matchScoreEl.textContent = score + "%";
  renderList(matchedSkillsEl, matched);
  renderList(missingSkillsEl, missing);
  renderSuggestions(missing);

  resultSection.classList.remove("hidden");
});

function renderList(element, items) {
  element.innerHTML = "";
  if (items.length === 0) {
    const li = document.createElement("li");
    li.textContent = "None";
    element.appendChild(li);
    return;
  }
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    element.appendChild(li);
  });
}

function renderSuggestions(missing) {
  suggestionsEl.innerHTML = "";
  if (missing.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Your application aligns well with the job requirements.";
    suggestionsEl.appendChild(li);
    return;
  }
  missing.forEach(skill => {
    const li = document.createElement("li");
    li.textContent = `Consider highlighting your experience with ${skill}.`;
    suggestionsEl.appendChild(li);
  });
}