using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.DAL.Entities;

namespace ToDoApp.Contracts.contract
{
    public interface IUserDataAccess
    {
         Task<bool> UserExistsAsync(string username);

         Task<User> AddUserAsync(User user);

         Task<User> GetUserAsync(string username);
    }
}
