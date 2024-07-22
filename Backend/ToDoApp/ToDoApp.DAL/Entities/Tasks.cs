using System;
using System.Collections.Generic;

namespace ToDoApp.DAL.Entities;

public partial class Tasks
{
    public int TaskId { get; set; }

    public string TaskName { get; set; } = null!;

    public string TaskDescription { get; set; } = null!;

    public bool? IsCompleted { get; set; }

    public int UserId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public bool? IsDeleted { get; set; }

    public virtual User User { get; set; } = null!;
}
