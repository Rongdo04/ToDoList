using toDoListAPI.Entity;
namespace toDoListAPI.IServices {
     interface IServicesTasks {
        public PageResult<Tasks> ShowSP(int pageNumber = 1, int pageSize = 10, string? key = "");
        public int Login(User acc);
    }
}
