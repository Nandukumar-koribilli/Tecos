# Smart Kisan

## Project Overview
Smart Kisan is a web platform designed for farmers and landowners to connect and collaborate. Landowners can post land details, crop requirements, and payment offers, while farmers can register, view available land posts, predict crop yields, and browse a pesticide store.

## Features
- **Login/Signup Pages**: Separate authentication for farmers and landowners.
- **Landowner Dashboard**: Input land details, location, crop preferences, and payment offers.
- **Farmer Dashboard**: Submit personal details (name, age, gender, Aadhaar number, address, phone number).
- **Land Posts**: Farmers view landowner posts for available land opportunities.
- **Crop Yield Prediction**: Integrated tool for predicting crop yields.
- **Pesticide Store**: Browse available pesticides.
- **Navigation Bar**: Access to dashboard, land posts, crop yield prediction, and pesticide store.

## Tech Stack
- **Frontend**: React (with JSX, Tailwind CSS)
- **Backend**: Python (FastAPI/Flask for API development)
- **Database**: MongoDB (using provided connection string)
- **Additional Languages**: JavaScript (for React), HTML, CSS
- **Tools**: Node.js (for React), Pyodide (for Python in browser, if needed)

## Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MongoDB Atlas account
- Git

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd smart-kisan
   ```

2. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Backend Setup**:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload  # For FastAPI
   # OR
   python app.py  # For Flask
   ```

4. **Database Configuration**:
   - Update MongoDB connection string in backend configuration:
     ```
     mongodb+srv://nandukumar9980:kumar456@cluster0.ecnna5x.mongodb.net/student-form?retryWrites=true&w=majority
     ```
   - Ensure MongoDB Atlas is accessible and collections are set up (e.g., `farmers`, `landowners`, `lands`, `pesticides`).

5. **Environment Variables**:
   - Create a `.env` file in the backend directory:
     ```
     MONGODB_URI=mongodb+srv://nandukumar9980:kumar456@cluster0.ecnna5x.mongodb.net/student-form?retryWrites=true&w=majority
     ```

6. **Run the Application**:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:8000` (FastAPI) or `http://localhost:5000` (Flask)

## Project Structure
```
smart-kisan/
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/     # Reusable React components (Login, Signup, Dashboard)
│   │   ├── pages/          # Page components (Home, CropYield, PesticideStore)
│   │   ├── App.js          # Main React app
│   │   └── index.js        # Entry point
├── backend/                # Python backend
│   ├── api/                # API routes (auth, land, farmer, pesticides)
│   ├── models/             # MongoDB schemas
│   ├── main.py             # FastAPI/Flask app
│   └── requirements.txt    # Python dependencies
└── README.md               # Project documentation
```

## Usage
1. **Signup/Login**:
   - Farmers: Register with personal details (name, age, Aadhaar, etc.).
   - Landowners: Register with land and payment details.
2. **Dashboard**:
   - Farmers: View and edit profile, browse land posts.
   - Landowners: Post land details and manage offers.
3. **Crop Yield Prediction**: Use the integrated tool to predict yields.
4. **Pesticide Store**: Browse available pesticides.

## MongoDB Schema
- **Farmers**:
  ```json
  {
    "name": String,
    "age": Number,
    "gender": String,
    "aadhaar": String,
    "present_address": String,
    "permanent_address": String,
    "phone": String
  }
  ```
- **Landowners**:
  ```json
  {
    "name": String,
    "land_details": {
      "size": Number,
      "location": String,
      "crop_preferences": String,
      "payment": Number
    }
  }
  ```
- **Lands**:
  ```json
  {
    "landowner_id": ObjectId,
    "size": Number,
    "location": String,
    "crop_preferences": String,
    "payment": Number
  }
  ```
- **Pesticides**:
  ```json
  {
    "name": String,
    "description": String,
    "price": Number
  }
  ```

## Dependencies
- **Frontend**:
  - React (`react`, `react-dom`)
  - Tailwind CSS (`tailwindcss`)
  - Axios (`axios`) for API calls
- **Backend**:
  - FastAPI/Flask (`fastapi` or `flask`)
  - PyMongo (`pymongo`) for MongoDB
  - Uvicorn (`uvicorn`) for FastAPI server

## Future Enhancements
- Add real-time notifications for land post updates.
- Integrate payment gateway for transactions.
- Enhance crop yield prediction with machine learning models.

## Contributing
- Fork the repository.
- Create a feature branch (`git checkout -b feature-name`).
- Commit changes (`git commit -m 'Add feature'`).
- Push to the branch (`git push origin feature-name`).
- Create a pull request.

## License
MIT License
