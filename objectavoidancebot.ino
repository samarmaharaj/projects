#include <Servo.h>          //Servo motor library. This is standard library
#include <NewPing.h>        //Ultrasonic sensor function library. You must install this library

//our L298N control pins
const int LeftMotorForward = 6;
const int LeftMotorBackward = 7;
const int RightMotorForward = 5;
const int RightMotorBackward = 4;
const int enA=11;
const int enB=3;
const int speed=100;


//sensor pins
#define trig_pin A1 //analog input 1
#define echo_pin A2 //analog input 2

#define maximum_distance 200
boolean goesForward = false;
int distance = 100;

NewPing sonar(trig_pin, echo_pin, maximum_distance); //sensor function
Servo servo_motor; //our servo name


void setup(){

  pinMode(RightMotorForward, OUTPUT);
  pinMode(LeftMotorForward, OUTPUT);
  pinMode(LeftMotorBackward, OUTPUT);
  pinMode(RightMotorBackward, OUTPUT);
  pinMode(enA,OUTPUT);
  pinMode(enB,OUTPUT);
  analogWrite(enA,0);
  analogWrite(enB,0);
  
  servo_motor.attach(10); //our servo pin

  servo_motor.write(115);
  delay(1500);
  distance = readPing();
  delay(80);
  distance = readPing();
  delay(80);
  distance = readPing();
  delay(80);
  distance = readPing();
  delay(80);
  Serial.begin(9600);
}

void loop(){

  int distanceRight = 0;
  int distanceLeft = 0;
  delay(50);

  if (distance <= 20){
    moveStop();
    delay(200);
    moveBackward();
    delay(300);
    moveStop();
    delay(200);
    distanceRight = lookRight();
    delay(200);
    distanceLeft = lookLeft();
    delay(200);

    if (distance >= distanceLeft){
      turnRight();
      moveStop();
    }
    else{
      turnLeft();
      moveStop();
    }
  }
  else{
    moveForward(); 
  }
    distance = readPing();
}

int lookRight(){  
  servo_motor.write(50);
  delay(300);
  int distance = readPing();
  delay(80);
  servo_motor.write(115);
  return distance;
}

int lookLeft(){
  servo_motor.write(170);
  delay(300);
  int distance = readPing();
  delay(80);
  servo_motor.write(115);
  return distance;
  delay(80);
}

int readPing(){
  delay(70);
  int cm = sonar.ping_cm();
  if (cm==0){
    cm=250;
  }
  return cm;
}

void moveStop(){
    analogWrite(enA,0);
 analogWrite(enB,0);
  digitalWrite(RightMotorForward, LOW);
  digitalWrite(LeftMotorForward, LOW);
  digitalWrite(RightMotorBackward, LOW);
  digitalWrite(LeftMotorBackward, LOW);

 Serial.println("stop");
}

void moveForward(){

  if(!goesForward){

    goesForward=true;
 analogWrite(enA,speed);
 analogWrite(enB,speed);
    digitalWrite(LeftMotorForward, HIGH);
    digitalWrite(RightMotorForward, HIGH);

    digitalWrite(LeftMotorBackward, LOW);
    digitalWrite(RightMotorBackward, LOW); 
     Serial.println("forward");
  }
}

void moveBackward(){

  goesForward=false;
    analogWrite(enA,speed);
 analogWrite(enB,speed);
  digitalWrite(LeftMotorBackward, HIGH);
  digitalWrite(RightMotorBackward, HIGH);

  digitalWrite(LeftMotorForward, LOW);
  digitalWrite(RightMotorForward, LOW);
   Serial.println("backward");
  
}

void turnRight(){
    analogWrite(enA,speed);
 analogWrite(enB,0);
  digitalWrite(LeftMotorForward, HIGH);
  digitalWrite(RightMotorBackward, HIGH);

  digitalWrite(LeftMotorBackward, LOW);
  digitalWrite(RightMotorForward, LOW);
   Serial.println("right");
  
  delay(600);
       analogWrite(enA,speed);
 analogWrite(enB,speed);
  digitalWrite(LeftMotorForward, HIGH);
  digitalWrite(RightMotorForward, HIGH);
 
  digitalWrite(LeftMotorBackward, LOW);
  digitalWrite(RightMotorBackward, LOW);
 
  
  
}

void turnLeft(){
     analogWrite(enA,0);
 analogWrite(enB,speed);
  digitalWrite(LeftMotorBackward, HIGH);
  digitalWrite(RightMotorForward, HIGH);
  
  digitalWrite(LeftMotorForward, LOW);
  digitalWrite(RightMotorBackward, LOW);
   Serial.println("left");

  delay(600);
  analogWrite(enA,speed);
 analogWrite(enB,speed);
  digitalWrite(LeftMotorForward, HIGH);
  digitalWrite(RightMotorForward, HIGH);

  digitalWrite(LeftMotorBackward, LOW);
  digitalWrite(RightMotorBackward, LOW);
}