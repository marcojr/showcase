using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace xamarin_forms
{
    public partial class PageWelcome : ContentPage
    {
        private Global global = Global.Instance();
        public PageWelcome()
        {
            InitializeComponent();
            BindGestures();
            LoadInitialData();
            NavigationPage.SetHasNavigationBar(this, false);
        }
        public void touchLogIn(object sender, EventArgs e)
        {
            SmallLogo();
            username.Focus();
        }
        private async void LoadInitialData() {
            Registration registration = new Registration();
            registration.setServer("dev");
            ResGetReady response = await registration.getReady();
            global.AppData = response.data;
            //Device.BeginInvokeOnMainThread(async () =>
            //{
            //    await DisplayAlert("Alertxx", global.AppData.data.texts.tos, "Ok");
            //});
        }
        public async void touchSignUp(object sender, EventArgs e) {
            await Navigation.PushAsync(new PageTextView("Terms", global.AppData.texts.tos, "I Agree", TosCallback));
        }
        public void BindGestures()
        {
            var cancel_tap = new TapGestureRecognizer();
            cancel_tap.Tapped += (s, e) =>
            {
                NormalLogo();
            };
            cancelLabel.GestureRecognizers.Add(cancel_tap);
        }
        public async void NormalLogo() {
            loginFields.IsVisible = false;
            loginActions.IsVisible = false;
            await Task.Factory.StartNew(() =>
            {
                logo.ScaleTo(1, 500);
                logo.TranslateTo(0, 0, 500);
            });
            await Task.Delay(500);
            welcomeButtons.IsVisible = true;
        }
        public async void SmallLogo()
        {
            welcomeButtons.IsVisible = false;
            await Task.Factory.StartNew(() =>
            {
                logo.ScaleTo(0.6, 500);
                logo.TranslateTo(0, -45, 500);
            });
            await Task.Delay(500);
            loginFields.IsVisible = true;
            loginActions.IsVisible = true;
        }
        public async void TosCallback()
        {
            await Navigation.PushAsync(new PageSignUp());
        }
    }

}
