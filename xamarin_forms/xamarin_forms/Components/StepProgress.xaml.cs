using System;
using System.Collections.Generic;
using Xamarin.Forms;

namespace xamarin_forms.Components
{
    public partial class StepProgress : ContentView
    {
        public int Steps { get; set; }
        public int Step { get; set; }
        public StepProgress()
        {
            InitializeComponent();

        }
    }
}
