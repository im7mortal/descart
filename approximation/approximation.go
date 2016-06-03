package main

import (
	"encoding/json"
	"math"
	"fmt"
	"strconv"
	"io/ioutil"
)



type dataSet [][2]float64

type data struct  {
	W    float64 `json:"W"`
	Data []graph `json:"data"`
	lArr      [][2]float64
	secondIter power
}

/**
a*ln(x) + b
 */
type logarithm struct {
	a float64
	b  float64
}

type power struct {
	base float64
	pow  float64
}

type graph struct {
	L         float64 `json:"l"`
	Data      [][2]float64 `json:"data"`
	firstIter power
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main()  {
	fmt.Println(strconv.FormatFloat(math.Log(100), 'f', 10, 64))
	bytesArr, err := ioutil.ReadFile("data/data.json")
	check(err)
	dataArr := []data{}
	err = json.Unmarshal(bytesArr, &dataArr)
	check(err)

	mapW_base := make(map[float64][][2]float64)
	mapW_pow := make(map[float64][][2]float64)

	for _, object := range dataArr{
		for _, object_ := range object.Data{
			object_.firstIter = PowerAppr(object_.Data)
			object.lArr = append(object.lArr, [2]float64{object_.L, object_.firstIter.base})
			mapW_base[object_.L] = append(mapW_base[object_.L], [2]float64{object.W, -object_.firstIter.pow}) // TODO умножаем на минус
			mapW_pow[object_.L] = append(mapW_pow[object_.L], [2]float64{object.W, object_.firstIter.base})
		}
		object.secondIter = PowerAppr(object.lArr)
	}

	for _, obj := range mapW_base{
		_ = PowerAppr(obj)

		//fmt.Println(name)
		//fmt.Println(strconv.FormatFloat(a.base, 'f', 10, 64))
		//fmt.Println(strconv.FormatFloat(a.pow, 'f', 10, 64))
	}

	for name, obj := range mapW_pow{
		if name == 200 {
			//fmt.Printf("%v\n", obj)
		}
		_ = LogarithmAppr(obj)
		//fmt.Println(name)
		//fmt.Println(strconv.FormatFloat(a.a, 'f', 10, 64))
		//fmt.Println(strconv.FormatFloat(a.b, 'f', 10, 64))
	}



	return
}


/**
a is coefficient of x
b is power of x
 */

func PowerAppr(arr [][2]float64) (e power){
	var S1, S2, S3, S4 float64
	for _, r := range arr{
		x := r[0]
		y := r[1]
		if x < 0 || y < 0 {
			panic("знак минус")
		}

		s1 := math.Log10(x)
		S1 += s1
		S2 += s1 * s1
		s2 := math.Log10(y)
		S3 += s2
		S4 += s1 * s2
	}
	n := float64(len(arr))
	e.base = math.Pow(float64(10), (S3*S2 - S4*S1)/(n * S2 - S1 * S1))
	e.pow = (n * S4 - S1*S3)/(n * S2 - S1 * S1)
	return
}


/**
a*ln(x) + b

a = (nƩln(Х)Y - Ʃln(Х) * ƩY) / (n * Ʃ(ln(Х))^2 - Ʃln(Х)*Ʃln(Х));
b = (ƩY - a *Ʃln(Х)) / n

 */

func LogarithmAppr(arr [][2]float64) (e logarithm){
	var S1, S2, S3, S4 float64
	for _, r := range arr{
		x := r[0]
		y := r[1]

		if x < 0 || y < 0 {
			panic("знак минус")
		}
		s1 := math.Log(x)
		S1 += s1	//  Ʃln(Х)
		S2 += s1 * s1	//  Ʃ(ln(Х))^2
		S3 += y		//  ƩY
		S4 += s1 * y	//  Ʃln(Х)Y
	}
	n := float64(len(arr))
	e.a = (n * S4 - S1 * S3)/ (n * S2 - S1 * S1)
	e.b = (S3 - e.a * S1) / n
	return
}

/*
Логарифмическая аппроксимация
a = (nƩln(Х)Y - Ʃln(Х) * ƩY) / (n * Ʃ(ln(Х))^2 - Ʃln(Х)*Ʃln(Х));
b = (ƩY - a *Ʃln(Х)) / n

Линейная аппроксимация
a = (nƩXY - ƩX * ƩY) / (n * ƩX^2 - ƩX*ƩX);
b = (ƩY - a *ƩX) / n;

Экспоненциальная аппроксимация
a = (nƩexp(Х)Y - Ʃexp(Х) * ƩY) / (n * Ʃ(exp(Х))^2 - Ʃexp(Х)*Ʃexp(Х));
b = (ƩY - a *Ʃexp(Х)) / n.
*/
