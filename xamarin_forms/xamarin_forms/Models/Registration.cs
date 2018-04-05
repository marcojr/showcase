using System;
using System.Collections.Generic;
namespace xamarin_forms
{
    public class Data_getReady
    {
        public List<Country> countries { get; set; }
        public Texts texts { get; set; }
        public List<Venue> venues { get; set; }
        public List<PrivacyOptions> privacyOptions { get; set; }
    }
    public class ResGetReady
    {
        public bool successfully { get; set; }
        public Data_getReady data { get; set; }
    }
}
