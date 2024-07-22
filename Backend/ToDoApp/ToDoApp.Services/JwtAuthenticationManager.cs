using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.BLL.Interfaces;
using ToDoApp.Common.Model.Dto;

namespace ToDoApp.BLL
{
    public class JwtAuthenticationManager:IJwtAuthenticationManager
    {
        private readonly string _key;
        private readonly string _issuer;
        private readonly string _audience;
        private readonly IConfiguration _configuration;
        public JwtAuthenticationManager(IConfiguration configuration)
        {
            _key = configuration["Jwt:Key"]!;
            _issuer = configuration["Jwt:Issuer"]!;
            _audience = configuration["Jwt:Audience"]!;
            _configuration = configuration;
        }

        public string Authenticate(DtoUser user)
        {
            // Validate the user credentials here

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.UTF8.GetBytes(_key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()!)
                }),
                Expires = DateTime.UtcNow.AddMinutes(_configuration.GetValue<double>("Jwt:ExpiryInMinutes")),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _issuer,
                Audience = _audience
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
