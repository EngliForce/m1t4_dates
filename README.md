# ⚡ EngliForce: Date Cyber-Lab

**EngliForce: Date Cyber-Lab** is an interactive full-stack web application designed for students to master English date notation. With a unique neon-futuristic "Cyber-Lab" theme and a real-time leaderboard, this app is perfect for classroom use on an interactive whiteboard or individually on mobile devices.

![Cyber-Lab Theme](https://picsum.photos/seed/cyberpunk/800/400?blur=2)

## 🚀 Features

-   **Cyber-Lab Aesthetic:** An immersive interface with neon accents, CRT scanlines, and interactive glow effects.
-   **Dual-Style Training:** Practice both **British** (*Monday, the first of January*) and **American** (*Monday, January the first*) spoken date notation.
-   **10-Question Test:** Every session consists of 10 random dates to test your skills.
-   **Speed Scoring:** The faster you answer, the more points you get! Correct answers always earn points.
-   **Real-time Leaderboard:** Thanks to WebSockets, scores are updated instantly on all connected screens. Great for classroom competitions!
-   **A2 Level English:** Simple instructions and feedback designed for English learners.
-   **Responsive Design:** Works perfectly on desktops, tablets, and smartphones.

## 🛠️ Tech Stack

-   **Frontend:** React 18+, Vite, Tailwind CSS
-   **Animations:** Motion (framer-motion)
-   **Icons:** Lucide React
-   **Backend:** Node.js with Express
-   **Real-time:** WebSockets (ws)
-   **Typography:** Orbitron & Lexend (via Google Fonts)

## 📦 Installation & Setup

Follow these steps to run the project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/engliforce-date-cyber-lab.git
    cd engliforce-date-cyber-lab
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the application:**
    Ga naar `http://localhost:3000` in je browser.

## 🎮 How to Play

1.  **Identification:** Enter your name on the start screen to begin.
2.  **Start Test:** Click "Start Test" to begin your 10-question session.
3.  **Choose Your Style:** Select `BRITISH_STYLE` or `AMERICAN_STYLE` based on the task.
4.  **Data Entry:** Translate the Dutch date shown into the full English spoken version. Note: capitalization and commas are essential!
5.  **Be Fast:** Answer quickly to get a speed bonus.
6.  **Leaderboard:** Check the `LIVE_DATA_FEED` to see your rank.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---
*Created for education // EngliForce Systems 2026*
