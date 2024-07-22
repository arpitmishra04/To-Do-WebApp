using System;
using System.Collections.Generic;

namespace ToDoApp.DAL.Entities;

public partial class User
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string Password { get; set; } = null!;

    public bool? IsDeleted { get; set; }

    public virtual ICollection<Tasks> Tasks { get; set; } = new List<Tasks>();
}
