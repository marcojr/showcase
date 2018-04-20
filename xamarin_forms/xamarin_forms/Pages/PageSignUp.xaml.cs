using System;
using System.Collections.Generic;

using Xamarin.Forms;

namespace xamarin_forms
{
    public partial class PageSignUp : ContentPage
    {
        public PageSignUp()
        {
            NavigationPage.SetHasBackButton(this, false);
            ToolbarItems.Add(new ToolbarItem("Close", "icon_close.png", async () => {
                System.Diagnostics.Debug.WriteLine("Pop");
                await Navigation.PopToRootAsync();
            }));
            InitializeComponent();
        }
    }
}
