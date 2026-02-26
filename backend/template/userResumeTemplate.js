const userResumeTemplate = {
  professional_summary: "A brief professional summary of the candidate",

  skills: ["skill1", "skill2", "skill3"],

  personal_info: {
    full_name: "Full Name",
    profession: "Job Title / Profession",
    email: "email@example.com",
    phone: "+1234567890",
    location: "City, Country",
    linkedin: "https://linkedin.com/in/username",
    website: "https://example.com",
  },

  experience: [
    {
      company: "Company Name",
      position: "Job Title",
      start_date: "MM/YYYY",
      end_date: "MM/YYYY or Present",
      description: "Description of responsibilities and achievements",
      is_current: false,
    },
  ],

  project: [
    {
      name: "Project Name",
      type: "Project Type (e.g. Web App, Mobile App)",
      description: "Description of the project",
    },
  ],

  education: [
    {
      institution: "University / School Name",
      degree: "Degree (e.g. Bachelor of Science)",
      field: "Field of Study",
      graduation_date: "MM/YYYY",
      gpa: "GPA if available",
    },
  ],
}

export default userResumeTemplate;