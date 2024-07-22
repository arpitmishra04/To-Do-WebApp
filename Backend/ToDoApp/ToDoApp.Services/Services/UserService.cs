using Microsoft.EntityFrameworkCore;
using Nelibur.ObjectMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.BLL.Interfaces;
using ToDoApp.Common.Model.Dto;
using ToDoApp.DAL.Entities;
using ToDoApp.DAL.Interfaces;

namespace ToDoApp.BLL.Services
{
    public class UserService : IUserService
    {
     
        private readonly IUnitOfWork _unitOfWork;

        public UserService( IUnitOfWork unitOfWork)
        {
           
            _unitOfWork = unitOfWork;
            build();
        }

        void build()
        {
            TinyMapper.Bind<DtoUser, User>(config =>
            {
                config.Ignore(src => src.UserId);
            });
            TinyMapper.Bind<User, DtoUser>(config =>
            {
                config.Bind(src => src.UserName, dest => dest.UserName);
                config.Bind(src => src.Password, dest => dest.Password);
                config.Bind(src => src.UserId, dest => dest.UserId);
            });
        }

        public async Task AddUserAsync(DtoUser user)
        {
            if (string.IsNullOrEmpty(user.UserName))
            {
                throw new ArgumentException("Username cannot be null or empty.");
            }

            string salt = BCrypt.Net.BCrypt.GenerateSalt();
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password, salt);
            User users = new User();
            TinyMapper.Map(user, users);

           
                await _unitOfWork.UserDataAccess.AddUserAsync(users);
                await _unitOfWork.CommitAsync();
            


        }

        public async Task<DtoUser> GetUserAsync(string username)
        {

            if (string.IsNullOrEmpty(username))
            {
                throw new ArgumentException("Username cannot be null or empty.");
            }

            TinyMapper.Bind<User, DtoUser>();

            DtoUser user_dto = null!;

           
                User user = await _unitOfWork.UserDataAccess.GetUserAsync(username);
                if (user != null)
                {
                    user_dto = TinyMapper.Map<DtoUser>(user);
                }
            

            return user_dto!;


        }

        public async Task<bool> CheckUserAsync(string username)
        {


            if (string.IsNullOrEmpty(username))
            {
                throw new ArgumentException("Username cannot be null or empty.");
            }
            
                return await _unitOfWork.UserDataAccess.CheckUserAsync(username);
            

        }
    }
}
