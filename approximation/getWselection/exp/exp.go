package main

import (
	"fmt"
	"encoding/json"
	"io/ioutil"
)

func main() {
	fr := [][][]float64{
		[][]float64{
			[]float64{0.0932234432, 55.},
			[]float64{0.1324234234, 41.},
			[]float64{0.19322335, 31.},
			[]float64{0.2943223490, 28.},
			[]float64{0.3143223490, 12.},
			[]float64{0.479389, 0.}},
		[][]float64{
			[]float64{0.0032234432, 57.},
			[]float64{0.0924234234, 45.},
			[]float64{0.1224234234, 38.},
			[]float64{0.25322335,24.},
			[]float64{0.3543223490, 23.},
			[]float64{0.3743223490, 13.},
			[]float64{0.499389, 2.},
			[]float64{0.559389, 1.},
		},
	}
	out := [][][2]float64{}
	var i_ int = 1000000
	for _,e := range fr {
		if i_ > len(e) {
			i_ = len(e)
		}
	}

	first := 0.
	last := 0.5

	n := (last - first) / float64(i_)
	for i, o := range fr{
		out = append(out, [][2]float64{})
		currentV := first

		for j := 0; j < i_; j++ {
			out[i] = append(out[i], [2]float64{0., 0.})
			if j == 0 {
				out[i][j][0] = first
				out[i][j][1] = fr[i][j][1]
				continue
			}
			if j == i_ - 1 {
				out[i][j][0] = last
				out[i][j][1] = fr[i][len(fr[i]) - 1][1]
				continue
			}
			currentV += n
			out[i][j][0] = currentV
			tempArr := []float64{}
			for _, o2 := range o{
				if o2[0] > o[j - 1][0] && o2[0] < currentV + n {
					tempArr = append(tempArr, o2[1])
				}
			}
			if len(tempArr) == 0 {
				out[i][j][1] = o[j + 1][0]
			} else {
				out[i][j][1] = average(tempArr)
			}
		}
	}
	fmt.Printf("%v", out)
	byteArray, _ := json.Marshal(out)
	ioutil.WriteFile("dataW.json", byteArray, 0644)
}

func average(o []float64)  (t float64) {
	summ := 0.
	for _, i := range o{
		summ+=i
	}
	t = summ / float64(len(o))
	return
}