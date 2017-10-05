import numpy as np
from sklearn.cluster import MeanShift, estimate_bandwidth
from sklearn.datasets.samples_generator import make_blobs
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
from itertools import cycle

data_name = "/home/ubuntu/go/src/github.com/im7mortal/descart/python/data_sparse_200.csv"
X = np.loadtxt(data_name, delimiter=',')
print(X.shape)
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')




ax.scatter(X[:,3], X[:,2], X[:,0], c='g', marker='^')


ax.set_xlabel('X Label')
ax.set_ylabel('Y Label')
ax.set_zlabel('Z Label')

plt.show()