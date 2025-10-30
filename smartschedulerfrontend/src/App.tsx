import React, { useState } from "react";
import TaskInputForm from "./TaskInputForm";
import "./App.css";

interface TaskItem {
  title: string;
  estimatedHours: number;
  dueDate: string;
  dependencies: string[];
}

interface ScheduleResponse {
  recommendedOrder: string[];
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [recommendedOrder, setRecommendedOrder] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScheduleTasks = async (tasks: TaskItem[]) => {
    setLoading(true);
    setRecommendedOrder(null);
    setError(null);

    try {
      const projectId = "1";
      const response = await fetch(`http://localhost:5298/api/v1/projects/${projectId}/schedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.join(", ") || "Failed to schedule tasks");
      }

      const data: ScheduleResponse = await response.json();
      setRecommendedOrder(data.recommendedOrder);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6">
          Smart Scheduler ⚙️
        </h1>

        <TaskInputForm onScheduleTasks={handleScheduleTasks} />

        {loading && (
          <div className="text-center mt-6">
            <p className="text-cyan-300 font-semibold animate-pulse">Scheduling tasks...</p>
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-cyan-400 mx-auto mt-3"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-400 text-red-300 px-4 py-3 rounded-xl relative mt-4 backdrop-blur-sm shadow-md">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

        {recommendedOrder && recommendedOrder.length > 0 && (
          <div className="mt-6 p-6 bg-gradient-to-r from-green-500/20 to-emerald-600/10 border border-green-400/50 text-green-200 rounded-xl shadow-md backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-3 text-green-300">Recommended Task Order 🚀</h2>
            <ol className="list-decimal list-inside space-y-2">
              {recommendedOrder.map((taskTitle, index) => (
                <li
                  key={index}
                  className="py-2 px-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  {taskTitle}
                </li>
              ))}
            </ol>
          </div>
        )}

        {recommendedOrder && recommendedOrder.length === 0 && !loading && !error && (
          <div className="mt-6 p-6 bg-yellow-500/20 border border-yellow-400/50 text-yellow-200 rounded-xl shadow-md text-center backdrop-blur-sm">
            <p>No tasks were recommended. Please check your input ⚠️</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
