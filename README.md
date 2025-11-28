# Architect's Nexus // Cyberpunk Portfolio

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-6-purple)

> "Decentralized Systems Architect building the backbone of the New Web."

**Architect's Nexus** is a high-fidelity, immersive portfolio website designed with a "Void Style" cyberpunk aesthetic. It features a fully interactive Neural HUD, a kinetic "Tech Matrix" visualization, and an integrated AI Chatbot powered by Google Gemini.

## 🚀 Features

-   **Neural Interface HUD**: A global overlay with real-time system time, mouse tracking, and a functional music player ("Media Widget").
-   **Nexus AI Chatbot**: An intelligent assistant powered by the **Google Gemini API**, capable of answering questions about the portfolio and technical skills.
-   **Kinetic Tech Matrix**: A dynamic, orbiting visualization of technical skills using Framer Motion.
-   **Holographic UI**: Glassmorphism effects, neon glows, and scanline animations.
-   **Supply Depot**: A mock e-commerce section for developer assets with ETH price conversion.
-   **Secure Downloads**: Direct "Hard Copy" download for the CV.

## 🛠️ Tech Stack

-   **Frontend**: React 19, TypeScript, Vite
-   **Styling**: Tailwind CSS, Vanilla CSS (custom animations)
-   **Animation**: Framer Motion
-   **AI Integration**: Google Generative AI SDK (`@google/generative-ai`)
-   **Icons**: Lucide React

## 📦 Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/architects-nexus.git
    cd architects-nexus
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env.local` file in the root directory and add your Gemini API key:
    ```env
    VITE_GEMINI_API_KEY=your_gemini_api_key_here
    ```
    > **Note**: You can get an API key from [Google AI Studio](https://aistudio.google.com/).

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Build for production**
    ```bash
    npm run build
    ```

## 🎵 Customization

-   **Music**: Replace `public/background-music.mp3` with your own audio file.
-   **CV**: Replace `public/Lakshit_Soni_CV.txt` with your resume.

## 📄 License

This project is licensed under the MIT License.

---
*Designed & Built by Lakshit Soni*
