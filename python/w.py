'''
=================
3D wireframe plot
=================

A very basic demonstration of a wireframe plot.
'''
import numpy as np
from sklearn.cluster import MeanShift, estimate_bandwidth
from sklearn.datasets.samples_generator import make_blobs
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
from itertools import cycle


data_name = "/home/ubuntu/go/src/github.com/im7mortal/descart/python/data.csv"
X = np.loadtxt(data_name, delimiter=',')
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

# Grab some test data.
X, Y, Z = axes3d.get_test_data(0.05)
print(X.shape)
print(Z.shape)
print(Y.shape)
# Plot a basic wireframe.
ax.plot_wireframe(X, Y, Z, rstride=10, cstride=10)

plt.show()
