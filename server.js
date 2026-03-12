const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname)));

const diseases = [

{
name:"Flu",
symptoms:["fever","cold","cough","fatigue","sore throat"],
medicine:"Paracetamol, Rest",
doctor:"General Physician",
severity:"🟡 Moderate",
info:"Flu is a viral infection affecting the respiratory system.",
precautions:"Drink warm fluids, rest well, avoid cold weather."
},

{
name:"Common Cold",
symptoms:["cold","cough","sore throat"],
medicine:"Antihistamine",
doctor:"ENT Specialist",
severity:"🟢 Mild",
info:"Common cold causes sneezing and throat irritation.",
precautions:"Drink warm fluids and take rest."
},

{
name:"Bronchitis",
symptoms:["cough","chest pain","fatigue"],
medicine:"Cough Syrup",
doctor:"Pulmonologist",
severity:"🟡 Moderate",
info:"Bronchitis causes inflammation in the airways.",
precautions:"Avoid smoke and dust."
},

{
name:"Migraine",
symptoms:["headache","nausea"],
medicine:"Pain Relievers",
doctor:"Neurologist",
severity:"🟡 Moderate",
info:"Migraine causes severe headaches with light sensitivity.",
precautions:"Avoid stress and get enough sleep."
},

{
name:"Food Poisoning",
symptoms:["vomiting","nausea","stomach pain"],
medicine:"ORS, Antiemetic",
doctor:"Gastroenterologist",
severity:"🟡 Moderate",
info:"Food poisoning happens from contaminated food.",
precautions:"Drink ORS and eat light food."
},

{
name:"Asthma",
symptoms:["breathlessness","cough","chest pain"],
medicine:"Inhaler",
doctor:"Pulmonologist",
severity:"🔴 Serious",
info:"Asthma causes breathing difficulty due to airway inflammation.",
precautions:"Avoid allergens and dust."
},

{
name:"Skin Allergy",
symptoms:["skin rash","itching"],
medicine:"Antihistamine Cream",
doctor:"Dermatologist",
severity:"🟢 Mild",
info:"Skin allergy causes itching and rashes.",
precautions:"Avoid allergens and keep skin clean."
},

{
name:"Conjunctivitis",
symptoms:["eye redness","watering eyes"],
medicine:"Eye Drops",
doctor:"Ophthalmologist",
severity:"🟢 Mild",
info:"Conjunctivitis causes redness and watering of eyes.",
precautions:"Avoid touching eyes and wash hands."
}

];

app.get("/check-symptoms",(req,res)=>{

const userSymptoms=(req.query.symptoms || "").split(",");

let bestMatch=null;
let bestScore=0;

diseases.forEach(d=>{

let matchCount=0;

d.symptoms.forEach(s=>{
if(userSymptoms.includes(s)) matchCount++;
});

let score=matchCount/d.symptoms.length;

if(score>bestScore){
bestScore=score;
bestMatch=d;
}

});

if(!bestMatch){

return res.json({
symptoms:userSymptoms.join(", "),
possible_disease:"Unknown",
suggested_medicine:"Consult a doctor",
doctor_recommendation:"General Physician",
severity:"🟡 Moderate",
info:"No exact disease match found.",
precautions:"Visit a doctor for proper diagnosis."
});

}

res.json({

symptoms:userSymptoms.join(", "),
possible_disease:bestMatch.name,
suggested_medicine:bestMatch.medicine,
doctor_recommendation:bestMatch.doctor,
severity:bestMatch.severity,
info:bestMatch.info,
precautions:bestMatch.precautions

});

});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{ console.log(`Server running on port ${PORT}`); });