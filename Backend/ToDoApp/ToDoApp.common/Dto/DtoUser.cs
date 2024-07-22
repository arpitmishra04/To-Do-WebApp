using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoApp.Common.Model.Dto
{
    public class DtoUser
    {
        public int? UserId { get; set; }=null;
        public  string UserName { get; set; } 

        public  string Password { get; set; }

        public bool? IsDeleted { get; set; }=false;
    }
}
