using Xamarin.Forms.Platform.Android;
using Xamarin.Forms;
using LoginInput;
using xamarin_forms.Droid;
using Android.Content;
[assembly: ExportRenderer(typeof(LoginInputbox), typeof(LoginInputRender))]
namespace xamarin_forms.Droid {
    public class LoginInputRender : EntryRenderer {
        public LoginInputRender(Context context) : base(context)
        {
        }
        protected override void OnElementChanged(ElementChangedEventArgs<Entry> e)
        {
            base.OnElementChanged(e);

            if (Control != null)
            {
                Control.SetBackgroundColor(Android.Graphics.Color.Transparent);
                //Control.SetBackgroundColor(global::Android.Graphics.Color.LightGreen);
                //Control.Set
                //Control.BorderStyle = UIKit.UITextBorderStyle.None;
            }
        }
    }
}
