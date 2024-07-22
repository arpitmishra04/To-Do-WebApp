using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.DAL.Entities;
using ToDoApp.DAL.Interfaces;

namespace ToDoApp.DAL
{
    public class UserDataAccess : IUserDataAccess
    {
        private readonly ToDoAppDbContext _context;

        public UserDataAccess(ToDoAppDbContext context)
        {
            _context = context;
        }

        public async Task<User> AddUserAsync(User user)
        {
            
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
           
        }   

        public async Task<User?> GetUserAsync(string username)
        {
            
                return await _context.Users.SingleOrDefaultAsync(u => u.UserName == username);
           
        }

        public async Task<bool> CheckUserAsync(string username)
        {
                return await _context.Users.AnyAsync(u => u.UserName == username);
           
        }
    }
}
