using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using toDoListAPI.Entity;
using toDoListAPI.IServices;
using toDoListAPI.Services;

namespace toDoListAPI.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase {

        private readonly IServicesTasks services;
        private readonly IConfiguration _config;
        public readonly AppDbContext dbContext;
        public AuthController(IConfiguration config) {
            _config = config;
            dbContext = new AppDbContext();
            services = new ServicesTasks();
        }
        [HttpPost]
        private string CreateToken(string username) {
            List<Claim> claims = new() {
                //list of Claims - we only checking username - more claims can be added.
                new Claim("username", Convert.ToString(username)),

            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: cred
            );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
        [HttpPost("login")]
        public ActionResult<object> Authenticate([FromBody] User acc) {
            var loginResponse = new LoginResponse { };
            var login = services.Login(acc);
            if (login == 1) {
                string token = CreateToken(acc.username);
                loginResponse.Token = token;
                loginResponse.responseMsg = new HttpResponseMessage() {
                    StatusCode = HttpStatusCode.OK
                };
                return Ok(loginResponse);
            } else {
                return BadRequest();
            }
        }

    }
       

}



