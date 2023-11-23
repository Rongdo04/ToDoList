using System.ComponentModel.DataAnnotations;

namespace toDoListAPI.Entity {
    public class Tasks {
        public int TasksID { get; set; }
        [Required]
        public string TaskName { get; set; }
        public string? Description { get; set; }
        public DateTime? DueDate { get; set; }
        public bool IsCompleted { get; set; }
    }
}
