namespace SmartSchedulerApi
{
    public class TaskItem
    {
        public required string Title { get; set; }
        public int EstimatedHours { get; set; }
        public DateTime DueDate { get; set; }
        public List<string> Dependencies { get; set; } = new List<string>();
    }

    public class ScheduleRequest
    {
        public List<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }

    public class ScheduleResponse
    {
        public List<string> RecommendedOrder { get; set; } = new List<string>();
    }
}
