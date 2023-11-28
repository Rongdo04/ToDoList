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
    }
}
