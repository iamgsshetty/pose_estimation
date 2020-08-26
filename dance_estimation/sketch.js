let video;
let posNet;
let pose;
let skeleton;
let pose2;
let skeleton2;
var a=0,b=0,c=0;
var rec_pose=[];
var rec_skeleton=[];
var angle1=[];
var angle2=[];
var rec_pose2=[];
var rec_skeleton2=[];

function setup() 
{
  createCanvas(1400, 700);
  video=createCapture(VIDEO);
  video.hide();
  poseNet=ml5.poseNet(video,modelLoaded);
  poseNet.on('pose',gotPoses);
}

function modelLoaded() 
{
  console.log('Model Loaded!');
}

function gotPoses(poses)
{
  //if(a==1)
  //console.log(poses);
  if(poses.length >0)
  {
    pose=poses[0].pose;
    skeleton=poses[0].skeleton;
  }
  if(poses.length >1)
  {
    pose2=poses[1].pose;
    skeleton2=poses[1].skeleton;
  }
}
function mousePressed()
{
  if(a==0)
  a=1;
  else if(a==1)
  a=2;
}

function record_angle1()
{
    angle1.push(atan((pose.leftEye.y-pose.rightEye.y)/(pose.leftEye.x-pose.rightEye.x)));
    angle1.push(atan((pose.leftAnkle.y-pose.rightAnkle.y)/(pose.leftAnkle.x-pose.rightAnkle.x)));
    angle1.push(atan((pose.leftElbow.y-pose.rightElbow.y)/(pose.leftElbow.x-pose.rightElbow.x)));
    angle1.push(atan((pose.leftHip.y-pose.rightHip.y)/(pose.leftHip.x-pose.rightHip.x)));
    angle1.push(atan((pose.leftKnee.y-pose.rightKnee.y)/(pose.leftKnee.x-pose.rightKnee.x)));
    angle1.push(atan((pose.leftShoulder.y-pose.rightShoulder.y)/(pose.leftShoulder.x-pose.rightShoulder.x)));
    angle1.push(atan((pose.leftWrist.y-pose.rightWrist.y)/(pose.leftWrist.x-pose.rightWrist.x)));
}
function record_angle2()
{
    angle2.push(atan((pose2.leftEye.y-pose2.rightEye.y)/(pose2.leftEye.x-pose2.rightEye.x)));
    angle2.push(atan((pose2.leftAnkle.y-pose2.rightAnkle.y)/(pose2.leftAnkle.x-pose2.rightAnkle.x)));
    angle2.push(atan((pose2.leftElbow.y-pose2.rightElbow.y)/(pose2.leftElbow.x-pose2.rightElbow.x)));
    angle2.push(atan((pose2.leftHip.y-pose2.rightHip.y)/(pose2.leftHip.x-pose2.rightHip.x)));
    angle2.push(atan((pose2.leftKnee.y-pose2.rightKnee.y)/(pose2.leftKnee.x-pose2.rightKnee.x)));
    angle2.push(atan((pose2.leftShoulder.y-pose2.rightShoulder.y)/(pose2.leftShoulder.x-pose2.rightShoulder.x)));
    angle2.push(atan((pose2.leftWrist.y-pose2.rightWrist.y)/(pose2.leftWrist.x-pose2.rightWrist.x)));
}
function draw() 
{
  background(220);
  image(video,0,0);
  if(pose)
  {
    c=1;
    for(let i=0;i<pose.keypoints.length;i++)
    {
      fill(0,255,0);
      ellipse(pose.keypoints[i].position.x,pose.keypoints[i].position.y,20);
      if(a==1)
      {
        rec_pose.push(pose.keypoints);
      }
    }
    for(let i=0;i<skeleton.length;i++)
    {
      strokeWeight(5);
      stroke(255);
      line(skeleton[i][0].position.x,skeleton[i][0].position.y,skeleton[i][1].position.x,skeleton[i][1].position.y);
      if(a==1)
      {
        rec_skeleton.push(skeleton);
        record_angle1();
      }
    }
    if(a==2)
    {
      console.log("POSITION");
      console.log(rec_pose);
      console.log("SKELETON");
      console.log(rec_skeleton);
      a=0;
    }
  }
  else
    c=0;
  if(pose2)
  {
    b=1;
    for(let i=0;i<pose2.keypoints.length;i++)
    {
      fill(0,255,0);
      ellipse(pose2.keypoints[i].position.x,pose2.keypoints[i].position.y,20);
      if(a==1)
      {
        rec_pose2.push(pose2.keypoints);
      }
    }
    for(let i=0;i<skeleton2.length;i++)
    {
      strokeWeight(5);
      stroke(255);
      line(skeleton2[i][0].position.x,skeleton2[i][0].position.y,skeleton2[i][1].position.x,skeleton2[i][1].position.y);
      if(a==1)
      {
        rec_skeleton2.push(skeleton2);
        record_angle2();
      }
    }
    if(a==2)
    {
      console.log("POSITION  2");
      console.log(rec_pose2);
      console.log("SKELETON  2");
      console.log(rec_skeleton2);
      a=0;
    }
  }
  else
    b=0;
  if(c==0 || pose.score<0.09)
  {
    fill(0);
    textSize(70);
    text("first person not found",30,600);
  }
  else if(b==0 || pose2.score<0.09)
  {
    fill(0);
    textSize(70);
    text("Second person not found",30,600);
  }
  else
  {
    for(let t=0;t<=10;t++)
    {
      if(record_angle1[t]>record_angle2-10 && record_angle1[t]<record_angle2+10)
      {
        fill(0);
        textSize(70);
        text("Write Movement",30,600);
      }
      else
      {
        fill(0);
        textSize(70);
        text("Wrong Movement",30,600);
        break;
      }
    }
  }
}