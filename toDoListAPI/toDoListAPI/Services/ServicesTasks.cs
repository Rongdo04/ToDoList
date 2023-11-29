using toDoListAPI.Entity;
using toDoListAPI.IServices;



namespace toDoListAPI.Services {
    public class ServicesTasks: IServicesTasks {
        public readonly AppDbContext dbContext;
        public ServicesTasks() {
            dbContext = new AppDbContext();
        }
        PageResult<Tasks> IServicesTasks.ShowSP(int pageNumber, int pageSize,string? key) {
            if(string.IsNullOrEmpty(key)) {
                key = "";
            }
            var names = dbContext.Tasks.Where(x => x.TaskName.ToLower().Contains(key.ToLower())).ToList();
            var query = dbContext.Tasks.AsQueryable();
            query = query.Skip((pageNumber - 1) * pageSize).Take(pageSize);
            int totalItems = dbContext.Tasks.Count();
            
            var pageResult = new PageResult<Tasks>(query.ToList(), totalItems, pageNumber, pageSize);
            var pageSearchResult = new PageResult<Tasks>(names, totalItems, pageNumber, pageSize);

            return string.IsNullOrEmpty(key) ? pageResult : pageSearchResult;
        }
        public int Login(User acc) {
            if (string.IsNullOrEmpty(acc.username) || string.IsNullOrEmpty(acc.password)) {
                return 0;
            }

            var user = dbContext.Users.FirstOrDefault(x => x.username == acc.username);

            if (user == null) {
                return 0;
            }
            try {
                if (!BCrypt.Net.BCrypt.Verify(acc.password, user.password)) {
                    return 0;
                } else {
                    throw new Exception("");
                }
            } catch (Exception ex) {
                Console.WriteLine(ex.Message);
            }
            if(user.username == acc.username && user.password == acc.password) {
                return 1;
            }
            return 0;
        }
        
    }
}
