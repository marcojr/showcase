using System;
namespace xamarin_forms
{
    sealed class Global
    {
        public Data_getReady AppData { get; set; }
        public string test { get; set; }
        private static Global _instance = null;  
        private Global() { }
        static internal Global Instance() {  
            //This is known as lazy initialization and  
            //if you noticed, this is not thread safe  
            if (_instance == null) {  
                _instance = new Global();  
            }  
            return _instance;  
        } 
    }
}
