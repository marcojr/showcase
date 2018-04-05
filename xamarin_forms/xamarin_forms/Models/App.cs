using System;
using System.Collections.Generic;
namespace xamarin_forms
{
    public class Country
    {
        public string iso { get; set; }
        public string name { get; set; }
        public int areaCode { get; set; }
    }
    public class PrivacyOptions
    {
        public string key { get; set; }
        public string desc { get; set; }
        public int? value { get; set; }
        public List<int> availableOptions { get; set; }
        public bool allowOnRegistration { get; set; }
        public int defaultValue { get; set; }
    }
    public class Texts
    {
        public string tos { get; set; }
        public string faq { get; set; }
        public string tgr { get; set; }
    }
    public class Venue
    {
        public string key { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public bool inUse { get; set; }
    }
}
