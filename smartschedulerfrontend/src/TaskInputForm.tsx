import React, { useState, useEffect } from 'react';

interface TaskItem {
    title: string;
    estimatedHours: number;
    dueDate: string;
    dependencies: string[];
}

interface TaskInputFormProps {
    onScheduleTasks: (tasks: TaskItem[]) => void;
}

const TaskInputForm: React.FC<TaskInputFormProps> = ({ onScheduleTasks }) => {
    const [tasks, setTasks] = useState<TaskItem[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [
            { title: '', estimatedHours: 0, dueDate: '', dependencies: [] }
        ];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleTaskChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newTasks = [...tasks];
        if (event.target.name === "dependencies") {
            newTasks[index][event.target.name] = event.target.value.split(',').map(dep => dep.trim()).filter(dep => dep !== '');
        } else if (event.target.name === "estimatedHours") {
            newTasks[index][event.target.name] = parseInt(event.target.value) || 0;
        } else {
            const key = event.target.name as 'title' | 'dueDate';
            newTasks[index][key] = event.target.value;
        }
        setTasks(newTasks);
    };

    const addTask = () => {
        setTasks([...tasks, { title: '', estimatedHours: 0, dueDate: '', dependencies: [] }]);
    };

    const removeTask = (index: number) => {
        if (tasks.length > 1) {
            const newTasks = tasks.filter((_, i) => i !== index);
            setTasks(newTasks);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Validate all tasks have titles
        const validTasks = tasks.filter(task => task.title.trim() !== '');
        if (validTasks.length === 0) {
            alert('Please add at least one task with a title');
            return;
        }
        onScheduleTasks(validTasks);
    };

    const getTaskCountColor = (index: number) => {
        const colors = ['from-purple-500 to-pink-500', 'from-cyan-500 to-blue-500', 'from-green-500 to-emerald-500', 'from-orange-500 to-red-500', 'from-yellow-500 to-amber-500'];
        return colors[index % colors.length];
    };

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm border-2 border-cyan-400/30 rounded-2xl p-6 shadow-xl">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                <h2 className="text-2xl font-bold text-white font-mono">TASK SCHEDULER</h2>
                <div className="flex-1"></div>
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-mono border border-cyan-400/30">
                    {tasks.length} TASK{tasks.length !== 1 ? 'S' : ''}
                </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {tasks.map((task, index) => (
                    <div key={index} className="p-6 bg-gray-700/30 backdrop-blur-sm border-2 border-gray-600/50 rounded-xl hover:border-cyan-400/30 transition-all duration-300 group">
                        {/* Task Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getTaskCountColor(index)} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                                    {index + 1}
                                </div>
                                <h3 className="text-lg font-bold text-white font-mono">TASK #{index + 1}</h3>
                            </div>
                            {tasks.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeTask(index)}
                                    className="p-2 bg-red-500/20 text-red-400 border border-red-400/30 rounded-lg hover:bg-red-500/30 transition-all duration-200 transform hover:scale-110"
                                    title="Remove task"
                                >
                                    🗑️
                                </button>
                            )}
                        </div>

                        {/* Task Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-cyan-300 text-sm font-mono uppercase tracking-wide">
                                    📝 TASK TITLE
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={task.title}
                                    onChange={(e) => handleTaskChange(index, e)}
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 font-mono"
                                    placeholder="Enter task name..."
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-cyan-300 text-sm font-mono uppercase tracking-wide">
                                    ⏱️ ESTIMATED HOURS
                                </label>
                                <input
                                    type="number"
                                    name="estimatedHours"
                                    value={task.estimatedHours}
                                    onChange={(e) => handleTaskChange(index, e)}
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 font-mono"
                                    min="0"
                                    step="0.5"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-cyan-300 text-sm font-mono uppercase tracking-wide">
                                    📅 DUE DATE
                                </label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={task.dueDate}
                                    onChange={(e) => handleTaskChange(index, e)}
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 font-mono"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-cyan-300 text-sm font-mono uppercase tracking-wide">
                                    🔗 DEPENDENCIES
                                </label>
                                <input
                                    type="text"
                                    name="dependencies"
                                    value={task.dependencies.join(', ')}
                                    onChange={(e) => handleTaskChange(index, e)}
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 font-mono"
                                    placeholder="task1, task2, ..."
                                />
                                <p className="text-gray-400 text-xs font-mono">
                                    Separate with commas
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-4 border-t border-gray-600/50">
                    <button
                        type="button"
                        onClick={addTask}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 shadow-lg"
                    >
                        <span className="text-lg">+</span>
                        ADD TASK
                    </button>

                    <button
                        type="submit"
                        className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 shadow-lg"
                    >
                        <span className="text-lg">🚀</span>
                        GENERATE SCHEDULE
                    </button>
                </div>

                {/* Info Text */}
                <div className="text-center pt-4">
                    <p className="text-gray-400 text-sm font-mono">
                        {tasks.length === 1 ? 'Add more tasks to create dependencies' : 'Tasks will be scheduled based on dependencies and due dates'}
                    </p>
                </div>
            </form>
        </div>
    );
};

export default TaskInputForm;