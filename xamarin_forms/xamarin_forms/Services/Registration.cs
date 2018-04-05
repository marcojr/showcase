using System;
using System.Net.Http;
using Newtonsoft.Json;
using System.Threading.Tasks;
namespace xamarin_forms
{
    public class Registration : Backend
    {
        public Registration()
        {
        }
        public async Task<ResGetReady> getReady() {
            HttpClient client = new HttpClient();
            string resString= await client.GetStringAsync(base.server + base.ep_reg_getReady);
            return JsonConvert.DeserializeObject<ResGetReady>(resString);
        }
    }
}
