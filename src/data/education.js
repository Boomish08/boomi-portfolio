// ============================================================
// FILE:     src/data/education.js
// PURPOSE:  Education cards. To add or change education details,
//           edit THIS file only — no component code needs to change.
//
//   main  = the big degree card
//   cards = the smaller cards (internship, school ...)
//   Each small card may have:  title, school, note (optional extra line)
// ============================================================

export const mainEducation = {
  badge: "Currently Studying",
  degree: "B.Sc. Computer Technology",
  school: "KPR College of Arts, Science and Research",
  period: "Third Year · 2024 – 2027",
  place: "Tamil Nadu, India",
};

export const otherEducation = [
  {
    title: "Internship",
    school: "DAGSLORE Technology Solutions",
    note: "Online internship under the Naan Mudhalvan scheme in Oracle Database — hands-on experience with database design, SQL querying and data management.",
  },
  {
    title: "Higher Secondary (12th)",
    school: "Venkateswara Vidhyalaya Matriculation Higher Secondary School",
    note: "Passed in 2024 | 87%",
  },
  {
    title: "Secondary School (10th)",
    school: "Venkateswara Vidhyalaya Matriculation Higher Secondary School",
    note: "Passed in 2022 | 59%",
  },
];
