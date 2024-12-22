# Questia 📘✨

Questia is a classroom management and assessment platform designed to empower teachers and students through AI-driven tools. Teachers can create classrooms, generate assignments with AI assistance, and provide instant feedback to students, while students can seamlessly access and review their assignments in a structured, interactive environment.

---

## Inspiration 🌟💡

The inspiration for Questia stems from the need for a streamlined, technology-driven solution to classroom management and student assessments. We wanted to make the process of creating, assigning, and grading assignments easier for teachers while also providing constructive feedback to students instantly. With the advancements in AI, we saw an opportunity to bridge the gap between traditional teaching methods and modern educational tools.

---

## How It Works 🛠️📋

### For Teachers:
- **Classroom Creation:** 🏫 Teachers can log into their dashboard and create a classroom, which generates a unique code.
- **Student Enrollment:** 🧑‍🎓 Students join the classroom using the unique code.
- **Assignment Creation:** ✏️ Teachers can create assignments (with a choice of level hardness, number of multiple-choice and subjective questions and the grade level of questions) with the help of AI assistance.
- **Assignment Editing:** ✏️ Teachers can then edit the assignment if they are not satisfied before assigning it to the students.
- **Assignment Assignment:** 📤 Assign assignments to specific classrooms with just a few clicks.
- **Review Answers:** 📝 Teachers can view students' answers and track their progress.

### For Students:
- **Join Classrooms:** 📚 Students log into their dashboard and join classrooms using the provided code.
- **Access Assignments:** 📑 Access assignments assigned to them in specific classrooms.
- **Instant Feedback:** 💡 Submit answers and receive constructive feedback powered by AI instantly, even for subjective questions.
- **Review:** 🔍 Revisit their answers, correct solutions, and feedback on a dedicated review page.

---

## How We Built It

- **Frontend:** 🌐 Next.js and Tailwind CSS for a responsive and interactive user interface.
- **Backend:** 🖥️ Flask framework for handling API requests and business logic.
- **Database:** 💾 NeonDB for managing user profiles, classrooms, assignments, and answers.
- **AI Integration:** 🤖 Gemini for generating questions, evaluating subjective answers, and providing feedback.
- **Version Control:** 🔄 GitHub for collaborative development and version management.

---

## Accomplishments That We Are Proud Of 🏆🎉

1. **Seamless Classroom Management:** 🌟 Creating a smooth and user-friendly interface for both teachers and students.
2. **AI-Assisted Assignment Generation:** ✍️ Integrating AI to assist teachers in creating diverse and dynamic assignments.
3. **AI-Driven Feedback for Subjective Answers:** 🔍 Automating the evaluation of subjective answers to save teachers time and effort.
4. **Instant Feedback System:** 🚀 Providing students with immediate and constructive feedback to foster learning.
5. **Efficient Database Management:** 📊 Using NeonDB to manage complex relationships between classrooms, assignments, and users.
6. **Collaboration:** 🤝 Successfully coordinating and implementing a full-stack application with modern tools and technologies.

---

## What's Next for Questia 🔮🚀

1. **Enhanced AI Feedback:** 🧠 Improve feedback mechanisms for subjective answers with more detailed and context-aware suggestions.
2. **Gamification:** 🎮 Add features like leaderboards and badges to encourage student participation and engagement.
3. **Parent Dashboard:** 🧑‍👩‍👦 Introduce a parent dashboard for monitoring student progress and performance.
4. **Localization:** 🌍 Expand language support to make Questia accessible to a global audience.
5. **Exam Environment:** 📑 Create a exam environment when the student attempts the assignment by not letting them open other tabs and having a timer.

---

## Technologies Used 💻🔧

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Flask
- **Database:** NeonDB
- **AI Integration:** Gemini
- **Version Control:** Git & GitHub

---

## Getting Started 🚀📥

### Prerequisites
- Next.js
- Python
- Gemini API
- NeonDB credentials

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/questia.git
   ```
2. Install dependencies for the frontend:
   ```bash
   cd questia_frontend
   npm install --legacy-peer-deps
   ```
3. Install dependencies for the backend:
   ```bash
   cd questia_backend
   pip install -r requirements.txt
   ```
4. Set up the database using NeonDB and configure environment variables in the frontend and the backend as well.

### Running the Application
1. Start the backend server:
   ```bash
   cd questia_backend
   flask run --host=0.0.0.0 --port=8000
   ```
2. Start the frontend server:
   ```bash
   cd questia_frontend
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:3000`.

---

## Contributing 🤝🌟

We welcome contributions to improve Questia! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## Acknowledgments  🙏🌟

- Thanks to our team for their dedication and hard work.
- Special thanks to the open-source community for providing the tools and frameworks used in this project.
- Inspired by the vision of making education more accessible and effective through technology.

