using System;
namespace xamarin_forms
{
    public class Backend
    {
        private string prod = "http://192.168.1.47:4600";
        private string dev = "http://192.168.1.47:4600";
        private string serverInUse;
        public string server {
            get {
                return serverInUse;
            }
        }
        public string ep_reg_getReady = "/v1/registration/getReady";
        public Backend()
        {
        }
        public void setServer(string selectedServer) {

            if (selectedServer == "prod")
            {
                serverInUse = prod;
            }
            if (selectedServer == "dev")
            {
                serverInUse = dev;
            }
            if (selectedServer != "prod" && selectedServer != "dev")
            {
                throw new InvalidOperationException();
            }
        }
    }
}
