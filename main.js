Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
    });
    
    camera = document.getElementById("camera");
    Webcam.attach("#camera");
    
    function take_snapshot()
    {
        Webcam.snap(function(data_uri)
        {
            document.getElementById("result").innerHTML = '<img id = "captured_image" src = "' + data_uri + '"/>';
    
        })
    }
    
    console.log("ml5 version", ml5.version);
    
    classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/2anHcIeRQ/model.json",modelLoaded);

    
    function modelLoaded()
    {
        console.log("tHeE MOdEl iS Laoded");
    
    }
    
    function speak()
    {
        var synth = window.speechSynthesis;
        speak_data_1 = "The prediction is " + prediction;
        utter_this = new SpeechSynthesisUtterance(speak_data_1);
        synth.speak(utter_this);
    }

    function check()
{
     img = document.getElementById("captured_image");
     classifier.classify(img, gotResults);
}

function gotResults(error, results)
{
if (error)
{
    console.error(error);
}

else
{
    console.log(results);
    document.getElementById("result_name").innerHTML = results[0].label;
    prediction = results[0].label;

    console.log(prediction);
    speak();

    if (results[0].label == "Peace")
    {
        document.getElementById("emoji_update").innerHTML = "&#9996;";
    }

    if (results[0].label == "Good Job")
    {
        document.getElementById("emoji_update").innerHTML = "&#128077;";
    }

    if (results[0].label == "Bad Job")
    {
        document.getElementById("emoji_update").innerHTML = "&#128078;";
    }


}
}