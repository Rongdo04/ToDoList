
using toDoListAPI.Entity;
using toDoListAPI.Services;
using toDoListAPI.IServices;
using Microsoft.AspNetCore.Mvc;

namespace toDoListAPI.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class toDoListController : ControllerBase {
        private readonly IServicesTasks services;
        public readonly AppDbContext dbContext;
        
        public toDoListController() {
            dbContext = new AppDbContext();
            services = new ServicesTasks();
        }
        [HttpGet("Show")]
        public IActionResult HienThiCongViec() {
            var listTasks = dbContext.Tasks.ToList();
            return Ok(listTasks);
        }
        [HttpPost("Add")]
        public IActionResult ThemCongVien([FromBody]Tasks tasks) {
            var congViecTonTai = dbContext.Tasks.FirstOrDefault(x => x.TaskName == tasks.TaskName);
            if (congViecTonTai == null) {
                tasks.TaskName.Trim();
                tasks.DueDate = DateTime.Now;
                dbContext.Add(tasks);
                dbContext.SaveChanges();
                return Ok(tasks.TaskName);

            } else {
                return BadRequest("Cong Viec Da Ton Tai");
            }
        }
        [HttpPut("updateStatus")]
        public IActionResult UpdateStatus([FromQuery] int TasksID) {
            var congViecTonTai = dbContext.Tasks.FirstOrDefault(x => x.TasksID == TasksID);
            if (congViecTonTai == null) {
                return BadRequest("Cong Viec Chua Ton Tai");
            } else {
                congViecTonTai.DueDate = DateTime.Now;
                if(congViecTonTai.IsCompleted == true) {
                    congViecTonTai.IsCompleted = false;
                }
                else {
                    congViecTonTai.IsCompleted = true;

                }
                dbContext.SaveChanges();
                return Ok(congViecTonTai.IsCompleted);
            }
        }

        [HttpPut("Edit")]
        public IActionResult SuaCongVien([FromBody] Tasks tasks) {
            try {
                var congViecTonTai = dbContext.Tasks.FirstOrDefault(x => x.TasksID == tasks.TasksID);

                if (congViecTonTai == null) {
                    return BadRequest("Cong Viec Chua Ton Tai");
                } else {
                    // Cập nhật thông tin công việc
                    congViecTonTai.TaskName = tasks.TaskName;
                    congViecTonTai.DueDate = DateTime.Now;
                    // Nếu có các thuộc tính khác cần cập nhật, hãy thêm vào đây

                    // Lưu thay đổi
                    dbContext.SaveChanges();

                    return Ok(tasks);
                }
            } catch (Exception ex) {
                // Xử lý lỗi
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
        [HttpGet("DS")]
        public IActionResult Show([FromQuery] int pageNumber, [FromQuery] int pageSize, [FromQuery] string? key) {

            var res = services.ShowSP(pageNumber, pageSize,key);
            return Ok(res);
        }

        [HttpDelete("Delete")]
        public IActionResult XoaCongViec([FromQuery] int tasksID) {
            var congViecTonTai = dbContext.Tasks.FirstOrDefault(x => x.TasksID == tasksID);
            if (congViecTonTai == null) {
                return BadRequest("Cong Viec Chua Ton Tai");

            } else {
                dbContext.Remove(congViecTonTai);
                dbContext.SaveChanges();
                return Ok(tasksID);
            }
        }
        [HttpGet("Search")]
        public IActionResult Search(string? key) {
            if (string.IsNullOrEmpty(key)) {
                key = "";
            }
            var names = dbContext.Tasks.Where(x => x.TaskName.ToLower().Contains(key.ToLower())).ToList();
            return names.Count > 0 ? Ok(names) : NotFound("Không có");
        }
    }
   
        
    
}