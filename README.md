# DevOps CI/CD Pipeline Visualizer

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

A conceptual single-page application that visualizes a fully automated CI/CD pipeline. This project demonstrates a production-grade workflow from code commit to cloud deployment, wrapped in a high-end "Editorial" React interface.

## 🚀 The Architecture

The pipeline is orchestrated to deliver code from `main` branch to a live AWS EC2 instance with zero manual intervention.

### 1. Source (GitHub Actions)
- **Trigger**: Push to `main` branch.
- **Runner**: Ubuntu-latest.
- **Action**: Checkouts code and initiates the build process.

### 2. Build (Docker & Docker Hub)
- **Containerization**: Builds a lightweight Alpine-based Docker image.
- **Optimization**: Multi-stage build process to keep image size <50MB.
- **Registry**: Pushes the tagged image to Docker Hub.

### 3. Deploy (AWS EC2)
- **Connection**: SSH access via GitHub Secrets.
- **Execution**:
  - Pulls the latest image from Docker Hub.
  - Gracefully stops the existing container.
  - Spins up the new container on port 80.

## 🛠 Tech Stack

**Frontend:**
- **React + Vite**: Blazing fast build tool and library.
- **Tailwind CSS**: Utility-first styling for the bespoke layout.
- **Design System**: Custom "Editorial Tech" aesthetic with sticky scrolling and massive typography.

**DevOps:**
- **GitHub Actions**: CI/CD Orchestration.
- **Docker**: Container runtime.
- **AWS EC2**: Production host (Ubuntu Linux).

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/syedahmadmujtaba/devops-ci-cd-pipeline.git
   cd devops-ci-cd-pipeline
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎨 Design Philosophy
This project rejects standard dashboard templates. It features:
- **Split-Screen Layout**: Sticky timeline visualization.
- **Interactive Logs**: A simulated terminal that plays back *actual* deployment logs.
- **Typography-Driven**: Using Playfair Display and Inter for high contrast.

## 📝 License
This project is licensed under the MIT License.
