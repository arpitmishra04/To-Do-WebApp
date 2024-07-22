using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoApp.Common.Model.Dto
{
    public class DtoTask
    {
        public int? TaskId { get; set; }
        public required string TaskName { get; set; } = null!;

        public required string TaskDescription { get; set; } = null!;
        public bool? IsCompleted { get; set; }

        public int? UserId { get; set; }

        public DateTime? CreatedAt { get; set; } = DateTime.Now;

        public DateTime? ModifiedAt { get; set; }

        public bool? IsDeleted { get; set; }
    }
}
