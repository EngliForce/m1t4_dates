# ⚡ EngliForce: Apostrophe Cyber-Lab

**EngliForce: Apostrophe Cyber-Lab** is een interactieve full-stack webapplicatie ontworpen voor leerlingen om de Engelse datum-notatie te beheersen. Met een uniek neon-futuristisch "Cyber-Lab" thema en een real-time scorebord, is deze app perfect voor gebruik in de klas op een digibord of individueel op mobiele devices.

![Cyber-Lab Theme](https://picsum.photos/seed/cyberpunk/800/400?blur=2)

## 🚀 Kenmerken

-   **Cyber-Lab Esthetiek:** Een meeslepende interface met neon-accenten, CRT-scanlines en interactieve gloed-effecten.
-   **Dual-Style Training:** Oefen zowel de **Britse** (*Monday, the first of January*) als de **Amerikaanse** (*Monday, January the first*) gesproken datum-notatie.
-   **Real-time Scorebord:** Dankzij WebSockets worden scores direct bijgewerkt op alle verbonden schermen. Ideaal voor klassikale competities!
-   **Nederlandse Interface:** Volledig Nederlandstalige instructies en feedback, met Engelse focus op de antwoorden.
-   **Responsief Design:** Werkt perfect op desktops, tablets en smartphones.

## 🛠️ Tech Stack

-   **Frontend:** React 18+, Vite, Tailwind CSS
-   **Animaties:** Motion (framer-motion)
-   **Icons:** Lucide React
-   **Backend:** Node.js met Express
-   **Real-time:** WebSockets (ws)
-   **Typografie:** Orbitron & Lexend (via Google Fonts)

## 📦 Installatie & Setup

Volg deze stappen om het project lokaal te draaien:

1.  **Clone de repository:**
    ```bash
    git clone https://github.com/GEBRUIKERSNAAM/engliforce-cyber-lab.git
    cd engliforce-cyber-lab
    ```

2.  **Installeer de afhankelijkheden:**
    ```bash
    npm install
    ```

3.  **Start de development server:**
    ```bash
    npm run dev
    ```

4.  **Open de applicatie:**
    Ga naar `http://localhost:3000` in je browser.

## 🎮 Hoe te spelen

1.  **Identificatie:** Voer je naam in op het startscherm om de sessie te initialiseren.
2.  **Kies je Modus:** Selecteer `BRITISH_MODE` of `AMERICAN_MODE` afhankelijk van de opdracht.
3.  **Data-invoer:** Vertaal de getoonde Nederlandse datum naar de volledige Engelse uitspraak. Let op: hoofdletters en komma's zijn essentieel voor systeem-stabiliteit!
4.  **Scorebord:** Bekijk de `LIVE_DATA_FEED` om je positie in de ranglijst te zien.

## 📄 Licentie

Dit project is gelicenseerd onder de MIT-licentie. Zie het `LICENSE` bestand voor details.

---
*Gemaakt voor het onderwijs // EngliForce Systems 2026*
