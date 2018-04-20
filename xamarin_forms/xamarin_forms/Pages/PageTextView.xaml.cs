using System;
using System.Collections.Generic;

using Xamarin.Forms;

namespace xamarin_forms
{
    public partial class PageTextView : ContentPage
    {
        public string ButtonText { get; set; }
        public string PageText { get; set;  }
        public string TitleText { get; set; }
        public Action Callback;
        public PageTextView(string TitleTxt, string PageTxt)
        {
            InitializeComponent();
            PageText = PageTxt;
            TitleText = TitleTxt;
            ButtonText = "Ok";
            BindingContext = this;
        }
        public PageTextView(string TitleTxt, string PageTxt, string ButtonTxt, Action Callbck) {
            InitializeComponent();
            ButtonText = ButtonTxt;
            PageText = PageTxt;
            TitleText = TitleTxt;
            Callback = Callbck;
            BindingContext = this;
        }
        public void touchBottomButton(object sender, EventArgs e)
        {
            Callback();
        }
    }
}
