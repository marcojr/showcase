using Xamarin.Forms;
namespace xamarin_forms
{
    public partial class App : Application
    {
        Global global = Global.Instance();
        public App()
        {
            InitializeComponent();
            global.test = "123";
            MainPage = new PageWelcome();
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
