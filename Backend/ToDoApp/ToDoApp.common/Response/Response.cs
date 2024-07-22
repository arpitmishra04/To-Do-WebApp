using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoApp.Common.Model.Response
{
    public class Response
    {
        public List<string> Errors { get; set; }
        public bool Success { get; set; }

        public Response()
        {
            Errors = new List<string>();
        }
    }
    public class Response<T> : Response
    {
        public T Data { get; set; }
      
    }
}
