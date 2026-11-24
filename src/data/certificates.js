// ============================================================
// FILE:     src/data/certificates.js
// PURPOSE:  All eight certificates as an array of objects.
//
// ADDING A CERTIFICATE IMAGE:
//   1. Save the picture in  public/assets/certificates/
//   2. Name it exactly like the id below, e.g.  mern-stack.jpg
//   The "image" path is already filled in. If the file does not exist yet,
//   the pop-up shows a clearly-labelled placeholder instead.
// ============================================================

const folder = "/assets/certificates/";

export const certificates = [
  {
    id: "mern-stack",
    title: "Certificate Program in MERN Stack",
    issuer: "FutureSkills Prime (MeitY–NASSCOM)",
    achievement: "Gold",
    score: "91%",
    date: "01 September 2026",
    image: folder + "mern-stack.jpg",
  },
  {
    id: "react-js",
    title: "Certificate Program in React JS",
    issuer: "FutureSkills Prime (MeitY–NASSCOM)",
    achievement: "Gold",
    score: "86%",
    date: "01 September 2026",
    image: folder + "react-js.jpg",
  },
  {
    id: "oracle-oci-ai",
    title: "Oracle Certified Foundations Associate: OCI 2025 AI Foundations Associate",
    issuer: "Oracle University",
    date: "18 February 2026",
    validUntil: "18 February 2028",
    image: folder + "oracle-oci-ai.jpg",
  },
  {
    id: "oracle-ai-database",
    title: "Oracle AI Database Certified Foundations Associate",
    issuer: "Oracle University",
    date: "01 September 2026",
    image: folder + "oracle-ai-database.jpg",
  },
  {
    id: "front-end-development",
    title: "Front End Development",
    issuer: "Tamil Nadu Skill Development Corporation",
    program: "Naan Mudhalvan Scheme",
    conductedBy: "Oracle",
    date: "27 June 2026",
    image: folder + "front-end-development.jpg",
  },
  {
    id: "yuva-ai",
    title: "YUVA AI For All",
    issuer: "TCS iON",
    offeredBy: "IndiaAI",
    date: "23 June 2026",
    image: folder + "yuva-ai.jpg",
  },
  {
    id: "fullstack-masterclass",
    title: "30 Days MasterClass in Full Stack Development",
    issuer: "NoviTech R&D Private Limited",
    duration: "18 August – 25 September 2026",
    image: folder + "fullstack-masterclass.jpg",
  },
  {
    id: "uiux-masterclass",
    title: "30 Days MasterClass in UI/UX Design",
    issuer: "NoviTech R&D Private Limited",
    duration: "05 August – 11 September 2026",
    image: folder + "uiux-masterclass.jpg",
  },
];
