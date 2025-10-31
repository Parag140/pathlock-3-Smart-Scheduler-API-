## SmartSchedulerApi/ # Backend .NET API
         
         ```
         ├── Controllers/
         │ └── ScheduleController.cs # API endpoint for scheduling
         ├── Services/
         │ └── TopologicalSort.cs # Core scheduling algorithm
         ├── Models.cs # Data models (TaskItem, ScheduleRequest/Response)
         └── Program.cs # Application configuration
         
         smartschedulerfrontend/ # Frontend React App
         ├── src/
         │ ├── App.tsx # Main application component
         │ ├── TaskInputForm.tsx # Dynamic task input form
         │ └── main.tsx # React entry point
         

## 🚀 Quick Start

### Prerequisites
- .NET 8 SDK
- Node.js 18+ and npm

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd SmartSchedulerApi
   dotnet run

   Access the API:

API: http://localhost:5298

Swagger UI: http://localhost:5298/swagger

## Frontend Setup
1. Open a new terminal and navigate to frontend:

      ```bash
    cd smartschedulerfrontend


2. Install dependencies and start:

    ```bash
    npm install
    vite

3. Access the application:

Frontend: http://localhost:5173




## API Endpoints
1. Scheduling
POST /api/v1/projects/{projectId}/schedule - Generate optimal task schedule

2. Request Body:
    ```bash
    {
      "tasks": [
        {
          "title": "Design Database",
          "estimatedHours": 8,
          "dueDate": "2024-01-15",
          "dependencies": []
        },
        {
          "title": "Build API",
          "estimatedHours": 16,
          "dueDate": "2024-01-20",
          "dependencies": ["Design Database"]
        }
      ]
    }


  3. response 

        ```bash

        {
    "recommendedOrder": ["Design Database", "Build API"]
    }


    Algorithm Features
## Topological Sorting
1. The system uses Kahn's algorithm for topological sorting with enhancements:

2. Dependency Resolution - Ensures tasks are scheduled after their dependencies

3. Cycle Detection - Identifies and reports circular dependencies

4. Multi-level Validation - Checks for unknown task references in dependencies

## Smart Prioritization
1. Tasks are prioritized using multiple factors:

2. Primary: Due Date - Earlier deadlines get higher priority

3. Secondary: Estimated Hours - Shorter tasks within same due date

4. Tertiary: Dependency Order - Natural topological order

## Error Handling
1. Cyclic Dependency Detection - Prevents infinite loops

2. Unknown Task References - Validates all dependency relationships

3. Empty Task Lists - Handles edge cases gracefully




---
## UI SCREENSHOTS
1. Home page 
<p align="center">
  <img src="https://github.com/user-attachments/assets/9173f34d-2ed7-408d-9017-3a80cc65967b" alt="Project Screenshot" width="600">
</p>
2. working of scheduler after adding tasks
<p align="center">
 <img width="710" height="1408" alt="image" src="https://github.com/user-attachments/assets/4f9e3422-ea55-4a01-83e5-c9ae5dace197" />

</p>

  3. localstorage data so we cant lost on reload 
<p align="center">
 <img width="2880" height="1634" alt="image" src="https://github.com/user-attachments/assets/328e65ac-be1e-4671-8bd9-ba08a50e2ee6" />

</p>
