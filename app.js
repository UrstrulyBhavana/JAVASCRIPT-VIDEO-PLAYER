const PlayButton = document.getElementById("play")

const MyVideo = document.querySelector("video")

let isVideoPlaying = false

function playVideo()
{
    //Playing the video
    isVideoPlaying = true
    PlayButton.classList.replace("fa-play", "fa-pause")
    MyVideo.play()
}

function pauseVideo()
{
    //Pausing the video
    isVideoPlaying = false
    PlayButton.classList.replace("fa-pause", "fa-play")
    MyVideo.pause()
}


function controlVideo()
{
    //Logic to play the video as well as pause the video
    if(isVideoPlaying)
    {
        pauseVideo()
    }
    else
    {
        playVideo()   
    }

}

const MyProgressBar = document.getElementById("progress-bar")

const Duration = document.getElementById("duration")
const CurrentTime = document.getElementById("current-time")


PlayButton.addEventListener("click", controlVideo)

MyVideo.addEventListener("timeupdate", function(event)
{
    let MyCurrentTime = MyVideo.currentTime
    let MyDuration = MyVideo.duration
    // console.log(MyCurrentTime, MyDuration)
    let progressPercentage = (MyCurrentTime / MyDuration) * 100 //Give the total percentage of the video that is already played
    // console.log(progressPercentage)
    MyProgressBar.style.width = `${progressPercentage}%`


    //Logic for duration(80.14) --> Minutes(1), Seconds(20)

    //Logic for duration(65) --> Minutes(1), Seconds(05)
        

    const durationInMinutes = Math.floor(MyDuration / 60)//1.34234
    // console.log(durationInMinutes)// -----> 1

    let durationInSeconds = Math.floor(MyDuration % 60)
    // console.log(durationInSeconds)// --> 05

    if(durationInSeconds <= 9)
    {
        durationInSeconds = `0${durationInSeconds}` //05,06,09,10
    }

    Duration.innerText = `${durationInMinutes}:${durationInSeconds}`

    //////////////////////////////////////////////////////////////

    const currentTimeInMinutes = Math.floor(MyCurrentTime / 60)
    // console.log(currentTimeInMinutes)// -----> 1

    let currentTimeInSeconds = Math.floor(MyCurrentTime % 60)
    // console.log(currentTimeInSeconds)// --> 05

    if(currentTimeInSeconds <= 9)
    {
        currentTimeInSeconds = `0${currentTimeInSeconds}` //05,06,09,10
    }

    CurrentTime.innerText  = `${currentTimeInMinutes}:${currentTimeInSeconds}/`

})

const ProgressRange = document.getElementById("progress-range")
ProgressRange.addEventListener("click", function(event)
{
    //Logic to move the orange color bar to that location

    // totalWidth of the black color bar --> 500px, 100px
    // totalWidth = 1282px

    // console.log(event)
    const totalWidth = event.srcElement.offsetWidth //offsetWidth is inbuilt property to track total time of black bar
    // console.log(totalWidth)

    const totalWidthFromStart = event.offsetX   //offsetX is inbuilt property to track time in x-axis from start to clicked place of black bar
    // console.log(totalWidthFromStart)

    const clickPercentage = (totalWidthFromStart / totalWidth) * 100
    // console.log(clickPercentage)//65

    MyProgressBar.style.width = `${clickPercentage}%`


    console.log(totalWidthFromStart / totalWidth)
    MyVideo.currentTime = (totalWidthFromStart / totalWidth) * MyVideo.duration

})


const VolumeRange = document.getElementById("volume-range")
const VolumeBar = document.getElementById("volume-bar")

VolumeRange.addEventListener("click", function(event)
{
    const totalWidth = event.srcElement.offsetWidth
    const totalWidthFromStart = event.offsetX
    let volumeBarPercentage = (totalWidthFromStart / totalWidth) * 100
    VolumeBar.style.width = `${volumeBarPercentage}%`

   let volumeInfo = totalWidthFromStart / totalWidth//0 to 1
    
    if(volumeInfo < 0.5)    //below half volume will be less else full volume max-1 min-0
    {
        MyVideo.volume = 0.2
    }
    else
    {
        MyVideo.volume = 1
    }

})

// 0 --> no sound
// 1 --> max sound

const Volume = document.getElementById("volume")

let isMuted = false

function mute()
{
    isMuted = true
    //Logic to make video sound = 0, replace volume button with mute, volumebar --> 0
    MyVideo.volume = 0
    Volume.classList.replace("fa-volume-up", "fa-volume-mute")
    VolumeBar.style.width = `${0}%`
}

function unmute()
{
    isMuted = false
    //Logic to make the sound work, replace mute button with volume button
    const totalWidth = event.srcElement.offsetWidth
    const totalWidthFromStart = event.offsetX
    let volumeBarPercentage = (totalWidthFromStart / totalWidth) * 100
    VolumeBar.style.width = `${volumeBarPercentage}%`

    let volumeInfo = totalWidthFromStart / totalWidth//0 to 1  
    if(volumeInfo < 0.5)
    {
        MyVideo.volume = 0.2
    }
    else
    {
        MyVideo.volume = 1
    }

    Volume.classList.replace("fa-volume-mute", "fa-volume-up")
}


Volume.addEventListener("click", function()
{
    if(isMuted)
    {
        unmute()
    }
    else
    {
        mute()
    }
})

const Speed = document.getElementById("speed")     // to control dropdown speed of playing video 0.5,0.75...2x

Speed.addEventListener("change", function()    //playbackRate in built variable takes selected value from Speed.value and accordingly plays video with that speed
{
     MyVideo.playbackRate = Speed.value     //Speed.value holds the values which we gave in html select--> options 0.5,0.75....2
})




const FullScreen = document.getElementById("fullscreen")
const PlayerContainer = document.getElementById("player-container")


let fullScreen = false


function displayFullScreen(container)
{
    if(container.requestFullscreen)
    {
        container.requestFullscreen()   
    }
    
}

function closeFullScreen(container)
{
    //Logic to close the video which is already in fullscreenmode to normal mode
    if(container.exitFullscreen)
    {
        container.exitFullscreen()   
    }
}

FullScreen.addEventListener("click", function()
{
    //Logic to expand the full screen
    if(!fullScreen)
    {
        displayFullScreen(PlayerContainer)
    }
    else
    {
        closeFullScreen(PlayerContainer)
    }

})