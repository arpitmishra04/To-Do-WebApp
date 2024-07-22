using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Common.Model.Dto;
using ToDoApp.DAL.Entities;

namespace ToDoApp.BLL.Interfaces
{
    public interface IUserService
    {
        Task AddUserAsync(DtoUser user);
        Task<DtoUser?> GetUserAsync(string username);
        Task<bool> CheckUserAsync(string username);
    }
}
