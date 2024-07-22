using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Common.Model.Dto;

namespace ToDoApp.BLL.Interfaces
{
    public interface IJwtAuthenticationManager
    {
        string Authenticate(DtoUser user);
    }
}
