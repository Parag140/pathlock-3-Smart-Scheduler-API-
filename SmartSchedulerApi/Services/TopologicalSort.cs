using System;
using System.Collections.Generic;
using System.Linq;

namespace SmartSchedulerApi.Services
{
    public class TopologicalSort
    {
        public static List<string>? SortTasks(List<TaskItem> tasks, out List<string> errors)
        {
            errors = new List<string>();
            var graph = new Dictionary<string, List<string>>();
            var inDegree = new Dictionary<string, int>();
            var taskMap = tasks.ToDictionary(t => t.Title);

            foreach (var task in tasks)
            {
                graph[task.Title] = new List<string>();
                inDegree[task.Title] = 0;
            }

            foreach (var task in tasks)
            {
                foreach (var dependency in task.Dependencies)
                {
                    if (!taskMap.ContainsKey(dependency))
                    {
                        errors.Add($"Task '{task.Title}' depends on unknown task '{dependency}'.");
                        return null;
                    }
                    graph[dependency].Add(task.Title);
                    inDegree[task.Title]++;
                }
            }

            var queue = new Queue<string>();
            foreach (var taskTitle in tasks.Select(t => t.Title))
            {
                if (inDegree[taskTitle] == 0)
                {
                    queue.Enqueue(taskTitle);
                }
            }

            var result = new List<string>();
            while (queue.Any())
            {
                // Prioritize tasks with earlier due dates among independent tasks
                var currentBatch = new List<string>();
                while(queue.Any())
                {
                    currentBatch.Add(queue.Dequeue());
                }

                currentBatch = currentBatch
                    .OrderBy(title => taskMap[title].DueDate)
                    .ThenBy(title => taskMap[title].EstimatedHours) // Secondary sort by estimated hours
                    .ToList();

                foreach(var taskTitle in currentBatch)
                {
                    result.Add(taskTitle);

                    foreach (var neighbor in graph[taskTitle])
                    {
                        inDegree[neighbor]--;
                        if (inDegree[neighbor] == 0)
                        {
                            queue.Enqueue(neighbor);
                        }
                    }
                }
            }

            if (result.Count != tasks.Count)
            {
                errors.Add("Cyclic dependency detected.");
                return null;
            }

            return result;
        }
    }
}
