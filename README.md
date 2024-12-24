# 📘✨ Questia 

Questia is a classroom management and assessment platform designed to empower teachers and students through AI-driven tools. Teachers can create classrooms, generate assignments with AI assistance, and provide instant feedback to students, while students can seamlessly access and review their assignments in a structured, interactive environment.

---

## Demo 🎥

Watch the demo of Questia in action [here](https://youtu.be/wK7YNuKMqyk) or visit the website [here](https://www.questia.live).

---

## 🌟💡 Inspiration 

The inspiration for Questia stems from the need for a streamlined, technology-driven solution to classroom management and student assessments. We wanted to make the process of creating, assigning, and grading assignments easier for teachers while also providing constructive feedback to students instantly. With the advancements in AI, we saw an opportunity to bridge the gap between traditional teaching methods and modern educational tools.

---

## 🛠️📋 How It Works

### For Teachers:
- 🏫 **Classroom Creation:** Teachers can log into their dashboard and create a classroom, which generates a unique code.
 <img width="1710" alt="Screenshot 2024-12-23 at 7 37 06 PM" src="https://github.com/user-attachments/assets/d7d1f569-2a30-419d-8001-5ec6d0c99d93" />
 
- ✏️ **Assignment Creation:** Teachers can create assignments (with a choice of level hardness, number of multiple-choice and subjective questions and the grade level of questions) with the help of AI assistance.<img width="1710" alt="Screenshot 2024-12-23 at 7 37 25 PM" src="https://github.com/user-attachments/assets/af018075-dd3e-43e9-bd8b-0063484b58e5" />

- ✏️ **Assignment Editing:** Teachers can then edit the assignment if they are not satisfied before assigning it to the students.<img width="1710" alt="Screenshot 2024-12-23 at 7 37 36 PM" src="https://github.com/user-attachments/assets/890c36ee-898a-4924-9983-afc375de29c6" />

- 📤 **Assignment Assignment:** Assign assignments to specific classrooms with just a few clicks.
- 📝 **Review Answers:** Teachers can view students' answers and track their progress.

### For Students:
- 📚 **Join Classrooms:** Students log into their dashboard and join classrooms using the provided code.<img width="1710" alt="Screenshot 2024-12-23 at 7 37 52 PM" src="https://github.com/user-attachments/assets/f360c5b4-d676-48eb-9c1b-debf8a59e599" />

- 📑 **Access Assignments:** Access assignments assigned to them in specific classrooms.<img width="1710" alt="Screenshot 2024-12-23 at 7 38 41 PM" src="https://github.com/user-attachments/assets/bc31fce4-f8fc-492d-a6d0-b0f41ffc9c46" />

- 💡 **Instant Feedback:** Submit answers and receive constructive feedback powered by AI instantly, even for subjective questions.
- 🔍 **Review:** Revisit their answers, correct solutions, and feedback on a dedicated review page.<img width="1710" alt="Screenshot 2024-12-23 at 7 38 57 PM" src="https://github.com/user-attachments/assets/a7b06371-f953-417d-9677-27fd43cd471b" />


---

## How We Built It

- 🖥️ **Frontend:** Next.js and Tailwind CSS for a responsive and interactive user interface.
- 🌐 **Backend:** Flask framework for handling API requests and business logic.
- 💾 **Database:** NeonDB for managing user profiles, classrooms, assignments, and answers.
- 🧠 **AI Integration:** Gemini for generating questions, evaluating subjective answers, and providing feedback.
- 🔄 **Version Control:** GitHub for collaborative development and version management.

---

## 🏆🎉 Accomplishments That We Are Proud Of

1. 🌟 **Seamless Classroom Management:** Creating a smooth and user-friendly interface for both teachers and students.
2. ✍️ **AI-Assisted Assignment Generation:** Integrating AI to assist teachers in creating diverse and dynamic assignments.
3. 🔍 **AI-Driven Feedback for Subjective Answers:** Automating the evaluation of subjective answers to save teachers time and effort.
4. 🚀 **Instant Feedback System:** Providing students with immediate and constructive feedback to foster learning.
5. 📊 **Efficient Database Management:** Using NeonDB to manage complex relationships between classrooms, assignments, and users.
6. 🤝 **Collaboration:** Successfully coordinating and implementing a full-stack application with modern tools and technologies.

---

## 🔮🚀 What's Next for Questia

1. 🧠 **Enhanced AI Feedback:** Improve feedback mechanisms for subjective answers with more detailed and context-aware suggestions.
2. 🎮 **Gamification:** Add features like leaderboards and badges to encourage student participation and engagement.
3. 🧑‍👩‍👦 **Parent Dashboard:** Introduce a parent dashboard for monitoring student progress and performance.
4. 🌍 **Localization:** Expand language support to make Questia accessible to a global audience.
5. 📑 **Exam Environment:** Create a exam environment when the student attempts the assignment by not letting them open other tabs and having a timer.

---

## Getting Started 🚀📥

Website is running on [www.questia.live](https://www.questia.live) but since the backend hosting is on a free tier the feedback aspect doesnt work. To access all aspects of the website follow the steps:

### Prerequisites

- Node.js
- Python
- NeonDB credentials

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/questia.git
   ```
2. Navigate to the project directory:
   ```bash
   cd questia
   ```
3. Install dependencies for the frontend:
   ```bash
   cd questia_frontend
   npm install --leagacy-peer-deps
   ```
4. Install dependencies for the backend:
   ```bash
   cd questia_backend
   pip install -r requirements.txt
   ```
5. Set up the database using NeonDB and configure environment variables (GEMINI_API_KEY, DATABASE_URI, JWT_KEY)
6. Configure enivronment variables in the frontend (NEXT_PUBLIC_BACKEND_URL, JWT_SECRET_KEY)

### Running the Application 🖥️

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

## 🙏🌟 Acknowledgments

- Thanks to our team for their dedication and hard work.
- Special thanks to the open-source community for providing the tools and frameworks used in this project.
- Inspired by the vision of making education more accessible and effective through technology.

