using Xamarin.Forms;
namespace xamarin_forms
{
    public partial class App : Application
    {
        Global global = Global.Instance();
        public App()
        {
            InitializeComponent();
            /*MainPage = new NavigationPage(new PageWelcome()) { 
                BarBackgroundColor = Color.FromHex("#68d6f9") ,
                BarTextColor = Color.White 
            };*/
            MainPage = new NavigationPage(new PageSignUp());
        }

        protected override void OnStart()
        {


        }

        protected override void OnSleep()
        {
            // Handle when your app sleeps
        }

        protected override void OnResume()
        {
            // Handle when your app resumes
        }
    }
}
