const jobs=[
{id:1,title:"Frontend Developer",company:"Google",salary:"₹10 LPA",location:"Bangalore",role:"Developer"},
{id:2,title:"UI Designer",company:"Adobe",salary:"₹8 LPA",location:"Hyderabad",role:"Designer"},
{id:3,title:"Project Manager",company:"Infosys",salary:"₹12 LPA",location:"Pune",role:"Manager"},
{id:4,title:"Backend Developer",company:"Amazon",salary:"₹11 LPA",location:"Chennai",role:"Developer"}
];

let saved=[];

const jobList=document.getElementById("jobList");
const savedJobs=document.getElementById("savedJobs");
const search=document.getElementById("search");
const companyFilter=document.getElementById("companyFilter");
const roleFilter=document.getElementById("roleFilter");

function getLogo(company){
const logos={
"Google":"https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
"Adobe":"https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png",
"Infosys":"https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
"Amazon":"https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
};
return logos[company]||"https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
}

function renderJobs(data,container,isSaved=false){
container.innerHTML="";
data.forEach(job=>{
const card=document.createElement("div");
card.className="card";
card.innerHTML=`
<img src="${getLogo(job.company)}" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'">
<h3>${job.title}</h3>
<p><strong>${job.company}</strong></p>
<p>${job.salary}</p>
<p>${job.location}</p>
<button>${isSaved?"Remove":"Save"}</button>
`;
const btn=card.querySelector("button");
btn.onclick=()=>{
if(isSaved){
saved=saved.filter(j=>j.id!==job.id);
}else{
if(!saved.find(j=>j.id===job.id)) saved.push(job);
}
updateUI();
};
container.appendChild(card);
});
}

function updateUI(){
const searchText=search.value.toLowerCase();
const companyVal=companyFilter.value;
const roleVal=roleFilter.value;

const filtered=jobs.filter(job=>
job.title.toLowerCase().includes(searchText)&&
(companyVal==="all"||job.company===companyVal)&&
(roleVal==="all"||job.role===roleVal)
);

renderJobs(filtered,jobList);
renderJobs(saved,savedJobs,true);
}

function loadCompanies(){
const companies=[...new Set(jobs.map(j=>j.company))];
companies.forEach(c=>{
const opt=document.createElement("option");
opt.value=c;
opt.textContent=c;
companyFilter.appendChild(opt);
});
}

search.oninput=updateUI;
companyFilter.onchange=updateUI;
roleFilter.onchange=updateUI;

loadCompanies();
updateUI();