

# 🛡️ SheCure

**SheCure** is a safety-first mobile and web-based application designed to empower and protect women and vulnerable individuals by providing instant support during emergencies, smart tracking, alert systems, and community engagement. Built with a mission to make personal safety accessible and intelligent, SheCure integrates real-time location tracking, emergency SMS, and a community support network into one seamless platform.

---

## 🚀 Features

* 📍 **Real-Time Location Tracking**
  Allows users to share their live location with trusted contacts during distress.

* 🆘 **One-Tap Emergency Alert**
  Sends SOS messages and location to pre-set emergency contacts via SMS and other channels.

* 👥 **Community Engagement**
  Connects users to nearby volunteers and safety networks for quick help.

* 🧠 **AI-Based Threat Detection (Planned)**
  Integrates AI/ML models to detect dangerous areas using public data sources.

* 🔒 **Secure User Authentication**
  Firebase Authentication ensures data security and privacy.

* 🌐 **Responsive Web App + Mobile App**
  Accessible on various devices, ensuring maximum reach and usability.

---

## 🧰 Tech Stack

| Layer           | Technologies Used                         |
| --------------- | ----------------------------------------- |
| Frontend        | HTML, CSS, JavaScript, Bootstrap          |
| Backend         | Firebase Realtime Database, Firebase Auth |
| Communication   | Twilio API (for SMS alerts)               |
| Map Services    | Google Maps API                           |
| Hosting         | Firebase Hosting                          |
| Version Control | Git + GitHub                              |

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Zian-Surani/SheCure.git
cd SheCure
```

### 2. Set Up Firebase

* Create a Firebase project [here](https://console.firebase.google.com/).
* Enable Authentication (Email/Password).
* Set up Realtime Database & Hosting.
* Replace the Firebase config in `index.html` with your project’s config.

### 3. Install Dependencies

(No build tools required — it's a static web project, but ensure Firebase CLI is installed)

```bash
npm install -g firebase-tools
firebase login
firebase init
```

### 4. Run the Project

```bash
firebase serve
```

Open `http://localhost:5000` in your browser.

---

## 📍 Future Enhancements

* Add **voice-based activation** for emergencies.
* Enable **AI-based threat zone detection** from local crime reports.
* Build a **mobile app version** using Flutter or React Native.
* Integrate **blockchain-based evidence locking**.
* Support for **multi-language UI** for wider accessibility.

---

## 🙋 Contributing

We welcome contributions!

* Fork the repo
* Create a new branch: `git checkout -b feature-name`
* Commit your changes
* Push and create a PR

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

**Zian Rajeshkumar Surani**
[LinkedIn](https://www.linkedin.com/in/zian-s-610243252) | [ziansurani1@gmail.com](mailto:ziansurani1@gmail.com)


