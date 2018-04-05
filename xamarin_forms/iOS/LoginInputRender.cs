using Xamarin.Forms.Platform.iOS;
using Xamarin.Forms;
using LoginInput;
using xamarin_forms.iOS;
[assembly: ExportRenderer(typeof(LoginInputbox), typeof(LoginInputRender))]
namespace xamarin_forms.iOS
{
    public class LoginInputRender : EntryRenderer
    {
        protected override void OnElementChanged(ElementChangedEventArgs<Entry> e)
        {
            base.OnElementChanged(e);

            if (Control != null)
            {
                Control.BorderStyle = UIKit.UITextBorderStyle.None;
            }
        }
    }
}
