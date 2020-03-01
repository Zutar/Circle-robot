#include <AFMotor.h> // Подключаем библиотеку для работы с шилдом 
#include <NewPing.h>


#define BUZZER 9
#define TRIG_PIN 10
#define ECHO_PIN 11
#define MAX_DISTANCE 200  // Константа для определения максимального расстояния, которое мы будем считать корректным.


AF_DCMotor motor3(3); // Подключаем моторы к клеммникам M3
AF_DCMotor motor4(4); // Подключаем моторы к клеммникам M4


NewPing sonar(TRIG_PIN, ECHO_PIN, MAX_DISTANCE);


bool automode = false;


void setEngine(char c){
  switch(c){
    case 'f':
      motor3.run(FORWARD);
      motor3.setSpeed(255);
      motor4.run(FORWARD);
      motor4.setSpeed(255);
      break;
    case 'b':
      motor3.run(BACKWARD);
      motor3.setSpeed(255);
      motor4.run(BACKWARD);
      motor4.setSpeed(255);
      break;
    case 'l':
      motor3.run(FORWARD);
      motor3.setSpeed(250);
      motor4.run(FORWARD);
      motor4.setSpeed(50);
      break;
    case 'r':
      motor3.run(FORWARD);
      motor3.setSpeed(50);
      motor4.run(FORWARD);
      motor4.setSpeed(250);
      break;
    case 's':
      motor3.run(RELEASE);
      motor4.run(RELEASE);
      break;
  }  
}


void demo(){
  setEngine('f');
  delay(3000);
  setEngine('l');
  delay(1000);
  setEngine('b');
  delay(1500);
  setEngine('r');
  delay(1000);
  setEngine('b');
  delay(2000);
  setEngine('l');
  delay(2000);
  setEngine('f');
  delay(1000);
  tone(BUZZER, 1000, 1000);  // Noise
}


void setup() {
  Serial.begin(9600);
  Serial.println("Starting...");
  Serial.println("Fibot is ready");
  tone(BUZZER, 1000, 1000);  // Noise
}

void loop() {
while(Serial.available() > 0){
  char data = Serial.read();
  
  switch(data){
    case 'a':
      automode = !automode;
      if(!automode) setEngine('s');
      break;
    case 'f':
      setEngine('f');
      break;
    case 'b':
      setEngine('b');
      break;
    case 'l':
      setEngine('l');
      break;
    case 'r':
      setEngine('r');
      break;
    case 's':
      setEngine('s');
      break;
    case 'd':
      demo();
  }
  if(automode){
      // AUTOMODE
  }
}







motor3.run(FORWARD);  // Задаем движение вперед
motor3.setSpeed(255); // Задаем скорость движения

motor4.run(FORWARD);  // Задаем движение вперед
motor4.setSpeed(255); // Задаем скорость движения

delay(5000);
}
