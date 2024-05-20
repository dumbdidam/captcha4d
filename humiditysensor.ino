/*
  Read Temperature and Humidity
  DHT11 Library
  Author: Bonezegei (Jofel Batutay)
  Date : November 2023

  Tested using ESP32-WROOM32
*/

#include <Bonezegei_DHT11.h>

//param = DHT11 signal pin
Bonezegei_DHT11 dht(10);

#include <CapacitiveSensor.h>





// create an instance of the library
// pin 4 sends electrical energy
// pin 2 senses senses a change
CapacitiveSensor capSensor = CapacitiveSensor(4, 2);


// threshold for turning the lamp on
int threshold = 1100;
// pin the LED is connected to
const int ledPin = 12;

void setupTouch() {
  pinMode(ledPin, OUTPUT);
}

void setup() {
  Serial.begin(115200);
  dht.begin();


  setupTouch();
  
  Serial.begin(115200);
}

void loopTouch() {
  long sensorValue = capSensor.capacitiveSensor(30);


// print out the sensor value
Serial.println(sensorValue);


// if the value is greater than the threshold
if (sensorValue > threshold) {
// turn the LED on
digitalWrite(ledPin, HIGH);
}
// if it's lower than the threshold
else {
// turn the LED off
digitalWrite(ledPin, LOW);
}


delay(10);

}

void loop() {

  if (dht.getData()) {                         // get All data from DHT11
    float tempDeg = dht.getTemperature();      // return temperature in celsius
    float tempFar = dht.getTemperature(false);  // return temperature in fahrenheit if true celsius of false
    int hum = dht.getHumidity();               // return humidity
    String str  = "Temperature: ";
           str += tempDeg;
           str += "°C  ";
           //str += tempFar;
           str += "Humidity:";
           str += hum;
    Serial.println(str.c_str());
    //Serial.printf("Temperature: %0.1lf°C  %0.1lf°F Humidity:%d \n", tempDeg, tempFar, hum);
  }
  delay(2000);  //delay atleast 2 seconds for DHT11 to read tha data

  loopTouch();

  int sensorValue = analogRead(A0);
  // print out the value you read:
  Serial.println(sensorValue);
  delay(1);  // delay in between reads for stability
}
