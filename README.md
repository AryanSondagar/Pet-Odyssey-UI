Angular Project with JSON Server
📌 Prerequisites

Make sure you have the following installed:

Node.js
 (v16 or above recommended)

Angular CLI

Git

📥 Clone the Repository
git clone <your-repo-url>
cd <your-project-folder>

📦 Install Dependencies
npm install

▶️ Run the Angular Project
ng serve


The app will be available at:
👉 http://localhost:4200/

🗄 Run JSON Server

This project uses JSON Server for a mock backend.

Go to the folder where db.json is located.

Run:

npx json-server --watch db.json --port 3000


or if installed globally:

json-server --watch db.json --port 3000


The mock API will run at:
👉 http://localhost:3000/

🔗 Project Structure
/src         -> Angular frontend code
/db.json     -> Mock database for JSON Server

🚀 Usage

Start Angular app → ng serve

Start JSON Server → json-server --watch db.json

Open browser at http://localhost:4200/
